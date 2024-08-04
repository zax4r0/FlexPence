import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export function ErrorMessage(error: any) {
  return (
    <View style={styles.fill}>
      <Text>{JSON.stringify(error)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
