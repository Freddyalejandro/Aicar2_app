import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
const logo  = require('../assets/Aicar-lg.png')
import { Link } from 'expo-router';
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8082/api/signin' : 'http://localhost:8082/api/signin';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const text = await response.text(); // Obtiene respuesta en texto (por si no es JSON)
        throw new Error(`Error: ${response.status} - ${text}`);
      }
  
      const data = await response.json();
      console.log('Login successful:', data.token);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          source={logo}
          style={styles.image}
        />
        <View style={styles.formContainer}>
          <Text style={styles.title}>HELLO SIGN IN!</Text>
          
          {/* Campos de entrada para el email y la contraseña */}
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            value={email}
            onChangeText={setEmail} // Al escribir en el campo, se actualiza el estado
          />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            secureTextEntry
            value={password}
            onChangeText={setPassword} // Al escribir en el campo, se actualiza el estado
          />

          {/* Muestra un error si existe */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>

          <Link href="/">
          <Text>Back</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  image: {
    width: 150, // Ajusta el tamaño de la imagen
    height: 150, // Ajusta el tamaño de la imagen
    resizeMode: 'contain',
    marginRight: 20, // Espacio entre la imagen y el formulario
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#008080',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#008080',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
