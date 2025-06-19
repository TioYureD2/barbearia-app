import { useState } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../lib/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { router } from 'expo-router'

export default function () {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.')
      return
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.')
      return
    }

    setCarregando(true)

    try {
      const credenciais = await createUserWithEmailAndPassword(auth, email, senha)

      await updateProfile(credenciais.user, { displayName: nome })

      await setDoc(doc(db, 'usuarios', credenciais.user.uid), {
        nome,
        email,
        criadoEm: new Date(),
      })

      Alert.alert('Sucesso', 'Conta criada com sucesso!')
      router.replace('/')
    } catch (error: any) {
      console.error(error)
      Alert.alert('Erro', error.message || 'Erro ao criar conta.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crie sua conta</Text>
      <TextInput style={styles.input} placeholder="Nome completo" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />
      <Button title={carregando ? 'Criando...' : 'Criar conta'} onPress={handleRegister} disabled={carregando} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
})
