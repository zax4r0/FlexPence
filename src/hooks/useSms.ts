import { useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Linking, Alert, BackHandler } from 'react-native'
import usePermissions from './usePermissions'
import { readSMSAsync, type SMSMessage } from '@@/modules/native-sms'

export const useSms = () => {
    const permissions = [PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, PermissionsAndroid.PERMISSIONS.READ_SMS]

    const { requestPermissions, isGranted } = usePermissions()
    const [smsList, setSmsList] = useState<SMSMessage[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchStoredSms = useCallback(async () => {
        try {
            setLoading(true)
            const res = await readSMSAsync()
            setSmsList(res)
        } catch (error) {
            setError('An error occurred while fetching stored SMS')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const initializeSmsFetch = async () => {
            try {
                const permissionsGranted = await isGranted(permissions)
                if (permissionsGranted) {
                    fetchStoredSms()
                } else {
                    const granted = await requestPermissions({ permissions, callback: fetchStoredSms })
                    if (!granted) {
                        Alert.alert('Failed to request SMS permissions', 'Please enable SMS permissions in your settings', [
                            { text: 'Open Settings', onPress: () => Linking.openSettings() },
                            { text: 'Exit', onPress: () => BackHandler.exitApp() }
                        ])
                    }
                }
            } catch (error) {
                setError('An error occurred while checking permissions')
            }
        }

        initializeSmsFetch()
    }, [])

    return { smsList, error, loading }
}
