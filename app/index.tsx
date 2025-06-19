import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Bem-vindo à sua Chave do Corte</Text>
      <Button title="Ir para Login" onPress={() => router.push('/(auth)/login')} />
    </View>
  )
}
