import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [id_tipo, setIdTipo] = useState('');

  const handleCadastro = async () => {
    if (!email || !senha || !telefone || !id_tipo) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.171:9090/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          senha,
          telefone: Number(telefone),
          tipo: { id: Number(id_tipo) },
        }),
      });


      if (response.ok) {
        const usuario = await response.json();
        Alert.alert('Cadastro realizado com sucesso!');
        navigation.navigate('Login');
        await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      } else {
        const erroTexto = await response.text();
        console.log('Resposta não OK:', erroTexto);
        Alert.alert('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro de conexão com o servidor');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoBox}>
          <Image
            source={require('./img/logosoema.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Cadastro</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#b0b0b0"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          placeholderTextColor="#b0b0b0"
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          keyboardType="numeric"
          placeholderTextColor="#b0b0b0"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text style={styles.label}>Tipo de Usuário (1 = Portador, 2 = Cuidador)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite 1 ou 2"
          keyboardType="numeric"
          placeholderTextColor="#b0b0b0"
          value={id_tipo}
          onChangeText={setIdTipo}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleCadastro}
        >
          <Text style={styles.primaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>Voltar para Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40, // espaço extra no fim
  },
  logo: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoBox: {
    width: '100%',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e1e1e',
  },
  label: {
    color: '#1e1e1e',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#1e50ff',
    paddingVertical: 12,
    width: windowWidth * 0.8,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    borderColor: '#1e50ff',
    borderWidth: 1,
    paddingVertical: 12,
    width: windowWidth * 0.8,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  secondaryButtonText: {
    color: '#1e50ff',
    fontWeight: '600',
  },
});
