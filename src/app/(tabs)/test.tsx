import React from 'react'
import JokeDisplay from '@/components/JokeDisplay'
import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { onlineManager } from '@tanstack/react-query'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { useGetJokeQuery } from '@/data/test/useGetJokeQuery'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Text } from '~/components/ui/text'
import { View } from 'react-native'

export default function TabOneScreen() {
    const { isLoading, jokeError, joke, refetch } = useGetJokeQuery('Any')
    useRefreshByUser(refetch)
    useRefreshOnFocus(refetch)

    if (isLoading) return <LoadingIndicator />
    if (jokeError) return <ErrorMessage error={jokeError}>Error</ErrorMessage>
    if (!joke) return <Text>Not Found</Text>

    return (
        <View className="flex-1 items-center justify-center">
            <Text className={`text-lg font-semibold mb-4 ${onlineManager.isOnline() ? 'text-green-500' : 'text-red-500'}`}>
                {onlineManager.isOnline() ? 'Online' : 'Offline'}
            </Text>
            <JokeDisplay joke={joke} />
        </View>
    )
}
