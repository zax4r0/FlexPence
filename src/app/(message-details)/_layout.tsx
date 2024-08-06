import { Text } from '@/components/ui/text'
import { Stack, useGlobalSearchParams } from 'expo-router'

export default function ProfileLayout() {
    const { slug } = useGlobalSearchParams()

    return (
        <Stack>
            <Stack.Screen name="[slug]" options={{ title: slug as string, headerTitleAlign: 'center' }} />
        </Stack>
    )
}
