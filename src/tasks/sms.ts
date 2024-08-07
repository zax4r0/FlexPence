import { readSMSAsync, type MessageResponse } from '@@/modules/native-sms'
import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import { HttpClient } from '@/lib/http-client'
import log from '@/lib/logger'

export async function fetchSmsMessages(): Promise<MessageResponse[]> {
    log.info('Fetching SMS messages from native module...')
    try {
        const smsMessages = await readSMSAsync()
        return smsMessages
    } catch (error) {
        log.error('An error occurred while fetching stored SMS:', error)
        throw new Error('An error occurred while fetching stored SMS')
    }
}

const BACKGROUND_FETCH_TASK = 'background-fetch'
const apiClient = new HttpClient('http://192.168.1.103:5000/api')

// Define the task with API call
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now()

    log.info(`Got background fetch call at date: ${new Date(now).toISOString()}`)

    const smsMessages = await fetchSmsMessages()

    try {
        const { status } = await apiClient.post('/data', { data: smsMessages })
        log.info('Backend Server response:', status)

        return BackgroundFetch.BackgroundFetchResult.NewData
    } catch (error) {
        log.error('API call failed:', error)
        return BackgroundFetch.BackgroundFetchResult.Failed
    }
})

// Register the background fetch task
export async function registerBackgroundFetchAsync(minimumInterval: number = 0.15) {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval,
        stopOnTerminate: false, // Android only
        startOnBoot: true // Android only
    })
}

// Unregister the background fetch task
export async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
}

export async function isSmsBackgroundTaskRegisteredAsync() {
    return await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK)
}
