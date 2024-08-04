import React from 'react'
import { Tabs } from 'expo-router'
import { Pressable, View } from 'react-native'
import { onlineManager } from '@tanstack/react-query'
import { Activity, Code, Home } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { router } from 'expo-router'

const USER_IMAGE = 'https://avatars.githubusercontent.com/u/76214239?v=4'

const UserImageComponent = () => {
  return (
    <Pressable
      onPress={() => {
        router.push('/(profile)')
      }}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => {
        return (
          <View className={cn('flex-1 aspect-square pt-0.5 justify-center items-start web:px-5', pressed && 'opacity-70')}>
            <Avatar
              alt="Zach Nugent's Avatar"
              className={`text-lg font-semibold  w-10 h-10 border-border shadow-lg ${onlineManager.isOnline() ? 'border-[2px] border-green-500' : 'border border-red-500'}`}
            >
              <AvatarImage source={{ uri: USER_IMAGE || 'https://github.com/mrzachnugent.png' }} />
            </Avatar>
          </View>
        )
      }}
    </Pressable>
  )
}

const Screens = [
  {
    id: 1,
    name: 'index',
    icon: Home,
    tabBarLabel: 'Home',
    headerTitle: 'Home'
  },
  {
    id: 2,
    name: 'balence',
    icon: Activity,
    tabBarLabel: 'Balance',
    headerTitle: 'Balance'
  },
  {
    id: 3,
    name: 'test',
    icon: Code,
    tabBarLabel: 'Test',
    headerTitle: 'Test'
  }
]

const TabLayout = () => (
  <Tabs initialRouteName="index">
    {Screens.map((Screen) => (
      <Tabs.Screen
        key={Screen.id}
        name={Screen.name}
        options={{
          tabBarLabel: Screen.tabBarLabel,
          headerTitle: Screen.headerTitle,
          tabBarIcon: ({ color, size }) => <Screen.icon color={color} size={size} />,
          headerRight: () => <UserImageComponent />
        }}
      />
    ))}
  </Tabs>
)

export default TabLayout
