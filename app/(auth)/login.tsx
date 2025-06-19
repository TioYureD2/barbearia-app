import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Tela de Login</Text>
      <Button title="Ir para Cadastro" onPress={() => router.push('/register')} />
    </View>
  )
}
