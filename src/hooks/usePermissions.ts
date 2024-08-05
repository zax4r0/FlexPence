import { PermissionsAndroid, Permission, Alert, BackHandler, Linking } from 'react-native'

const allPermissions: Permission[] = [
    PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
    PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
    PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    PermissionsAndroid.PERMISSIONS.WRITE_CALL_LOG,
    PermissionsAndroid.PERMISSIONS.ADD_VOICEMAIL,
    PermissionsAndroid.PERMISSIONS.USE_SIP,
    PermissionsAndroid.PERMISSIONS.PROCESS_OUTGOING_CALLS,
    PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    PermissionsAndroid.PERMISSIONS.RECEIVE_WAP_PUSH,
    PermissionsAndroid.PERMISSIONS.RECEIVE_MMS,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO // Android 13 and above
]

const usePermissions = () => {
    const isGranted = async (permissions: Permission[]): Promise<boolean> => {
        if (permissions.length === 0) {
            return true // If there are no permissions to check, consider them granted
        }

        try {
            const statuses = await checkPermissions(permissions)
            // Check if all permissions are granted
            const allGranted = permissions.every((permission) => statuses.includes(permission))

            return allGranted
        } catch (error) {
            console.error('Error checking permissions:', error)
            return false // Return false if there's an error checking permissions
        }
    }

    const requestPermissions = async ({
        permissions,
        optionalPermissions = [],
        callback
    }: {
        permissions: Permission[]
        optionalPermissions?: Permission[]
        callback?: () => void | Promise<void>
    }): Promise<boolean> => {
        try {
            // Combine mandatory and optional permissions for the request
            const allRequestedPermissions = [...permissions, ...optionalPermissions]
            const statuses = await PermissionsAndroid.requestMultiple(allRequestedPermissions)

            const granted = Object.entries(statuses).reduce((acc, [key, value]) => {
                if (value === PermissionsAndroid.RESULTS.GRANTED) {
                    acc.push(key as Permission)
                }
                return acc
            }, [] as Permission[])

            // Check if all mandatory permissions are granted
            const allMandatoryGranted = permissions.every((permission) => granted.includes(permission))

            if (allMandatoryGranted) {
                console.log('All mandatory permissions are granted.')

                // Optionally handle granted permissions
                if (optionalPermissions.length > 0) {
                    console.log(
                        'Optional permissions granted:',
                        granted.filter((permission) => optionalPermissions.includes(permission))
                    )
                }

                await callback?.()
                return true
            } else {
                // Handle denied permissions scenario
                console.warn('Some mandatory permissions are not granted.')
                Alert.alert(
                    'Permissions Required',
                    'The app may not function correctly without the required permissions. Please grant them from settings.',
                    [
                        { text: 'Open Settings', onPress: () => Linking.openSettings() },
                        { text: 'Exit', onPress: () => BackHandler.exitApp() }
                    ]
                )
            }
        } catch (error) {
            console.error('Error requesting permissions:', error)
            Alert.alert(
                'Something went wrong',
                'Could not request permissions. Please try again.',
                [{ text: 'Continue', onPress: () => BackHandler.exitApp(), style: 'cancel' }],
                { cancelable: false }
            )
        }
        return false
    }

    const checkPermissions = async (permissions: Permission[] = allPermissions): Promise<Permission[]> => {
        try {
            const pArray: Permission[] = []
            await Promise.all(
                permissions.map(async (permission) => {
                    const status = await PermissionsAndroid.check(permission)
                    if (status) {
                        pArray.push(permission)
                    }
                })
            )
            return pArray
        } catch (error) {
            console.error('Error checking permissions:', error)
        }
        return []
    }

    return {
        requestPermissions,
        isGranted
    }
}

export default usePermissions
