import { useEffect, useState } from 'react'
import { PermissionsAndroid, Linking, Alert, BackHandler } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import usePermissions from './usePermissions'
import { readSMSAsync, type MessageResponse } from '@@/modules/native-sms'
import log from '@/lib/logger'

// Function to fetch SMS messages
const fetchSmsMessages = async (): Promise<MessageResponse[]> => {
    try {
        const smsMessages = await readSMSAsync()
        return smsMessages
    } catch (error) {
        throw new Error('An error occurred while fetching stored SMS')
    }
}

// Custom hook to manage SMS fetching with permissions
export const useSms = () => {
    const permissions = [PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, PermissionsAndroid.PERMISSIONS.READ_SMS]
    const { requestPermissions, isGranted } = usePermissions()
    const [permissionsGranted, setPermissionsGranted] = useState(false)

    const {
        data: smsList,
        error,
        isLoading,
        refetch
    } = useQuery<MessageResponse[], Error>({
        queryKey: ['sms'],
        queryFn: fetchSmsMessages,
        enabled: permissionsGranted
    })

    useEffect(() => {
        const initializeSmsFetch = async () => {
            try {
                const granted = await isGranted(permissions)
                if (granted) {
                    setPermissionsGranted(true)
                } else {
                    const permissionsRequested = await requestPermissions({ permissions })
                    if (permissionsRequested) {
                        setPermissionsGranted(true)
                    } else {
                        Alert.alert('Failed to request SMS permissions', 'Please enable SMS permissions in your settings', [
                            { text: 'Open Settings', onPress: () => Linking.openSettings() },
                            { text: 'Exit', onPress: () => BackHandler.exitApp() }
                        ])
                    }
                }
            } catch (error) {
                log.error('An error occurred while checking permissions:', error)
                Alert.alert('Error', 'An error occurred while checking permissions')
            }
        }

        initializeSmsFetch()
    }, [])

    return { smsList, error, isLoading, refetch }
}
