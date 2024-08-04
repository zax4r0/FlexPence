import { useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid } from 'react-native'
import usePermissions from './usePermissions'
import { readSMS, type SMSMessage } from '@@/modules/native-sms'

export const useSms = () => {
  const permissions = [PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, PermissionsAndroid.PERMISSIONS.READ_SMS]

  const { grantedPermissions, requestPermissions } = usePermissions(permissions)
  const [smsList, setSmsList] = useState<SMSMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStoredSms = useCallback(() => {
    try {
      setLoading(true)
      const storedSms: SMSMessage[] = readSMS()
      setSmsList(storedSms)
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching stored SMS')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    requestPermissions()
  }, [requestPermissions])

  useEffect(() => {
    if (grantedPermissions[PermissionsAndroid.PERMISSIONS.READ_SMS]) {
      fetchStoredSms()
    }
  }, [grantedPermissions, fetchStoredSms])

  const refreshSmsList = useCallback(() => {
    fetchStoredSms()
  }, [fetchStoredSms])

  return { smsList, error, loading, refreshSmsList }
}
