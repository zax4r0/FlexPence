import { useState, useEffect } from 'react'
import { Permission, PermissionsAndroid, Platform } from 'react-native'

const usePermissions = (permissions: Permission[]) => {
  const [grantedPermissions, setGrantedPermissions] = useState<Record<string, boolean>>({})
  const [deniedPermissions, setDeniedPermissions] = useState<string[]>([])

  useEffect(() => {
    const checkPermissions = async () => {
      if (Platform.OS === 'android') {
        const results = await Promise.all(
          permissions.map(async (permission) => {
            const result = await PermissionsAndroid.check(permission)
            return { permission, result }
          })
        )

        const permissionsStatus = results.reduce(
          (acc, { permission, result }) => {
            acc[permission] = result
            return acc
          },
          {} as Record<string, boolean>
        )

        setGrantedPermissions(permissionsStatus)
      }
    }

    checkPermissions()
  }, [permissions])

  const requestPermissions = async (): Promise<{
    grantedPermissions: Record<string, boolean>
    deniedPermissions: string[]
  }> => {
    if (Platform.OS !== 'android') {
      return { grantedPermissions: {}, deniedPermissions: [] }
    }

    const results = await Promise.all(
      permissions.map(async (permission) => {
        const result = await PermissionsAndroid.request(permission)
        if (result === PermissionsAndroid.RESULTS.DENIED) {
          setDeniedPermissions([...deniedPermissions, permission])
        }
        return { permission, result: result === PermissionsAndroid.RESULTS.GRANTED }
      })
    )

    const permissionsStatus = results.reduce(
      (acc, { permission, result }) => {
        acc[permission] = result
        return acc
      },
      {} as Record<string, boolean>
    )

    setGrantedPermissions(permissionsStatus)
    return { grantedPermissions, deniedPermissions }
  }

  return { grantedPermissions, requestPermissions, deniedPermissions }
}

export default usePermissions
