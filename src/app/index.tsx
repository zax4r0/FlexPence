import { useEffect, useState } from 'react'
import { View, Text, BackHandler, Linking, Alert as NativeAlert } from 'react-native'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import usePermissions from '@/hooks/usePermissions'
import { AlertTriangle } from '@/lib/icons/AlertTriangle'
import { router } from 'expo-router'
import { PermissionsAndroid } from 'react-native'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { isSmsBackgroundTaskRegisteredAsync, registerBackgroundFetchAsync } from '@/tasks/sms'
import log from '@/lib/logger'

export default function App() {
    const permissions = [PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, PermissionsAndroid.PERMISSIONS.READ_SMS]

    const { requestPermissions, isGranted } = usePermissions()
    const [permissionsGranted, setPermissionsGranted] = useState<boolean | null>(null)

    useEffect(() => {
        const checkPermissions = async () => {
            const granted = await isGranted(permissions)
            setPermissionsGranted(granted)
            if (granted) {
                router.replace('/(tabs)')
            }
        }

        checkPermissions()
    }, [])

    const handleRequestPermissions = async () => {
        const isRegistered = await isSmsBackgroundTaskRegisteredAsync()
        const granted = await requestPermissions({
            permissions,
            callback: async () => {
                log.info('Permissions granted! Redirecting...')
                setPermissionsGranted(true)
                if (!isRegistered) {
                    await registerBackgroundFetchAsync()
                }
                router.replace('/(tabs)')
            }
        })

        if (!granted) {
            NativeAlert.alert('Failed to request SMS permissions', 'Please enable SMS permissions in your settings', [
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
                { text: 'Exit', onPress: () => BackHandler.exitApp() }
            ])
        }
    }

    if (permissionsGranted === null) {
        // Optionally render a loading indicator while checking permissions
        return (
            <View className="flex-1 justify-center items-center">
                <LoadingIndicator />
            </View>
        )
    }

    if (permissionsGranted) {
        // You can optionally render a splash screen or some other UI here while redirecting
        return <LoadingIndicator />
    }

    return (
        <View className="flex-1 justify-center p-6 items-center gap-6">
            <Alert icon={AlertTriangle} variant="destructive" className="max-w-xl">
                <AlertTitle>Sms Permission</AlertTitle>
                <AlertDescription>This app requires SMS permission. Please grant it.</AlertDescription>
            </Alert>

            <Button onPress={handleRequestPermissions}>
                <Text>Grant Permission</Text>
            </Button>
        </View>
    )
}
