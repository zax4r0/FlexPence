import React from 'react'
import { View, ScrollView, Text as RNText, StyleSheet, Pressable } from 'react-native'
import { useSms } from '@/hooks/useSms'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { SMSMessage } from '@@/modules/native-sms'
import { Link, router } from 'expo-router'

const MessageDetail = ({ msg }: { msg: SMSMessage }) => (
    <Card className={`mb-4 ${msg.read ? 'bg-blue-200' : 'bg-[inherit]'} shadow-md`}>
        <CardHeader>
            <CardTitle>{msg.sender}</CardTitle>
            <CardDescription>{msg.date}</CardDescription>
        </CardHeader>
        <CardContent>
            <Text>{msg.message}</Text>
        </CardContent>
        <CardFooter>
            <Text>{msg.read ? 'Read' : 'Unread'}</Text>
            <Text>{msg.type}</Text>
            <Text>{msg.service}</Text>
            <Text>{msg.thread}</Text>
        </CardFooter>
    </Card>
)

export default function BalanceScreen() {
    const { smsList, error, isLoading } = useSms()

    return (
        <View className="flex-1 p-4">
            {isLoading ? (
                <LoadingIndicator />
            ) : error ? (
                <ErrorMessage error={error} />
            ) : (
                <ScrollView>
                    {smsList?.map((msg, index) => (
                        <Card key={index} className="mb-4">
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: '/(message-details)/[slug]',
                                        params: { slug: msg.sender }
                                    })
                                }
                            >
                                <CardHeader>
                                    <CardTitle>{msg.sender}</CardTitle>
                                </CardHeader>
                                <CardContent></CardContent>
                            </Pressable>
                        </Card>
                    ))}
                    <RNText className="text-center text-gray-500">{smsList?.length} Messages</RNText>
                </ScrollView>
            )}
        </View>
    )
}
