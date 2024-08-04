import React from 'react'
import { Text } from '@/components/ui/text'
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useSms } from '@/hooks/useSms'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function BalanceScreen() {
  const { smsList, error, loading } = useSms()

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <ScrollView>
          {smsList.map((msg, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text>
                <Text style={styles.labelTitle}>Sender:</Text> {msg.sender}
              </Text>
              <Text>
                <Text style={styles.labelTitle}>Date:</Text> {new Date(msg.date).toLocaleString()}
              </Text>
              <Text>
                <Text style={styles.labelTitle}>Message:</Text> {msg.message}
              </Text>
              <Text>
                <Text style={styles.labelTitle}>Read:</Text> {msg.read ? 'Yes' : 'No'}
              </Text>
              <Text>
                <Text style={styles.labelTitle}>Type:</Text> {msg.type}
              </Text>
              <Text>
                <Text style={styles.labelTitle}>Thread:</Text> {msg.thread}
              </Text>
              <Text>
                <Text style={styles.labelTitle}>Service:</Text> {msg.service}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  messageContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8
  },
  label: {
    marginBottom: 4,
    fontSize: 14
  },
  labelTitle: {
    fontWeight: 'bold'
  }
})
