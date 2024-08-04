import React from 'react'
import { View } from 'react-native'
import { Joke } from '@/types'
import { Text } from '~/components/ui/text'

const JokeDisplay = ({ joke }: { joke: Joke }) => {
  if (joke.error) {
    return <Text className="text-red-500 text-lg">Error: {joke.message}</Text>
  }

  return (
    <View className="bg-white rounded-lg shadow-lg p-5 w-80 items-center">
      <Text className="text-blue-500 text-lg font-bold mb-2">
        Category: {joke.category} Type: {joke.type}
      </Text>
      {joke.type === 'twopart' ? (
        <>
          <Text className="text-lg mb-5">{joke.setup}</Text>
          <Text className="text-lg italic text-gray-700">{joke.delivery}</Text>
        </>
      ) : (
        <Text className="text-lg mb-5">{joke.joke}</Text>
      )}
    </View>
  )
}

export default JokeDisplay
