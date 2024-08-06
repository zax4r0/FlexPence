import { useGlobalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView } from 'react-native'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { SMSMessage } from '@@/modules/native-sms'
import { useSms } from '@/hooks/useSms'
import { ErrorMessage } from '@/components/ErrorMessage'
import { LoadingIndicator } from '@/components/LoadingIndicator'

const MessageDetail = ({ msg }: { msg: SMSMessage }) => (
    <Card className={`mb-4 ${msg.read ? 'border-blue-400' : 'bg-[inherit]'} shadow-md`}>
        <CardHeader>
            <CardDescription>{new Date(msg.date).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
            <Text>{msg.message}</Text>
        </CardContent>
        <CardFooter>
            {/* <Text>{msg.read}</Text> */}
            {/* <Text>{msg.type}</Text> */}
            {/* <Text>{msg.service}</Text> */}
            {/* <Text>{msg.thread}</Text> */}
        </CardFooter>
    </Card>
)

export default function Route() {
    const { slug } = useGlobalSearchParams()

    const { smsList, error, isLoading } = useSms()

    if (error) {
        return <ErrorMessage error={error} />
    }

    if (isLoading) {
        return <LoadingIndicator />
    }

    const messages = smsList?.find((msg) => msg.sender === slug)?.messages

    return (
        <ScrollView>
            <>{messages?.map((msg, index) => <MessageDetail key={index} msg={msg} />)}</>
        </ScrollView>
    )
}
