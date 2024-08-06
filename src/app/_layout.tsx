import '../../global.css'
import { QueryClient, QueryClientProvider, focusManager, onlineManager } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Theme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { AppStateStatus, Platform, ToastAndroid } from 'react-native'
import { NAV_THEME } from '~/lib/constants'
import { useColorScheme } from '~/lib/useColorScheme'
import { useFonts } from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntIcon from '@expo/vector-icons/AntDesign'
import Ionicon from '@expo/vector-icons/Ionicons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useAppState } from '@/hooks/useAppState'
import { useOnlineManager } from '@/hooks/useOnlineManager'
import { PortalHost } from '@rn-primitives/portal'

const LIGHT_THEME: Theme = {
    dark: false,
    colors: NAV_THEME.light
}
const DARK_THEME: Theme = {
    dark: true,
    colors: NAV_THEME.dark
}

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: 'index'
}

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: 2 } }
    })

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
    if (typeof window === 'undefined') {
        // Server: always make a new query client
        return createQueryClient()
    }
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient())
}

function onAppStateChange(status: AppStateStatus) {
    // React Query already supports in web browser refetch on window focus by default
    if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active')
    }
}

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    useOnlineManager()
    useAppState(onAppStateChange)
    const queryClient = getQueryClient()

    const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false)
    const [loaded] = useFonts({
        SpaceMono: require('../../assets/fonts/GeistMono-Regular.ttf'),
        Ionicons: require('../../assets/fonts/Ionicons.ttf'),
        ...AntIcon.font,
        ...FontAwesome.font,
        ...Ionicon.font
    })

    useEffect(() => {
        const loadTheme = async () => {
            const theme = await AsyncStorage.getItem('theme')

            if (Platform.OS === 'web') {
                document.documentElement.classList.add('bg-background')
            }

            if (!theme) {
                await AsyncStorage.setItem('theme', colorScheme)
            } else {
                const colorTheme = theme === 'dark' ? 'dark' : 'light'
                if (colorTheme !== colorScheme) {
                    setColorScheme(colorTheme)
                }
            }

            setIsColorSchemeLoaded(true)
        }

        loadTheme().finally(() => {
            SplashScreen.hideAsync()
        })
    }, [])

    useEffect(() => {
        if (!onlineManager.isOnline()) {
            ToastAndroid.show('Look you are offline!', ToastAndroid.SHORT)
        }
    }, [onlineManager.isOnline])

    if (!isColorSchemeLoaded || !loaded) {
        return null
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
                <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
                        <Stack.Screen name="(message-details)" options={{ headerShown: false }} />
                    </Stack>
                    <PortalHost />
                </GestureHandlerRootView>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
