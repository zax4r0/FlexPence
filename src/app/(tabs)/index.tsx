import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { P } from '@/components/ui/typography'
import { useEffect, useState } from 'react'
import { FlatList, StatusBar, View, Image } from 'react-native'
import { Text } from '~/components/ui/text'

type Bank = {
    name: string
    balance: number
    image?: string
    description?: string
}

export default function HomeScreen() {
    const [banks, setBanks] = useState<Bank[]>([
        {
            name: 'HDFC',
            balance: 10000,
            description: 'HDFC',
            image: 'https://github.com/mrzachnugent.png'
        },
        {
            name: 'BOB',
            balance: 5500,
            image: 'https://1000logos.net/wp-content/uploads/2021/06/Bank-of-Baroda-icon.png',
            description: 'BOB'
        },
        { name: 'Test', balance: 100, description: 'Test' }
    ])
    const [totalBalance, setTotalBalance] = useState(0)

    useEffect(() => {
        const total = banks.reduce((total, bank) => total + bank.balance, 0)
        setTotalBalance(total)
    }, [banks])

    return (
        <View className="flex-1 p-2 gap-3 justify-between">
            <StatusBar />
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Total Balance: ₹{totalBalance.toLocaleString()}</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
            </Card>
            <FlatList
                data={banks}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Card className="w-full flex !px-0">
                        <CardContent className="w-full py-3">
                            <View className="flex flex-row items-center justify-between">
                                <View className="flex flex-row items-center gap-4">
                                    <Avatar alt="Zach Nugent's Avatar" className="w-14 h-14 border-border shadow-lg">
                                        <AvatarImage source={{ uri: item?.image || 'https://github.com/mrzachnugent.png' }} />
                                    </Avatar>
                                    <View className="flex flex-col">
                                        <P className="text-sm font-medium leading-none ">{item.name}</P>
                                        <P className="text-sm text-center">{item.description}</P>
                                    </View>
                                </View>
                                <Text className="text-lg font-semibold">₹ {item.balance.toLocaleString('en-IN')}</Text>
                            </View>
                        </CardContent>
                    </Card>
                )}
            />
        </View>
    )
}
