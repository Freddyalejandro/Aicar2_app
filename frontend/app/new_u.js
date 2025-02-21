import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,Platform } from 'react-native';
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8082/api/signin' : 'http://localhost:8082/api/signin';

const SignUp = () => {
  // Estados para almacenar los valores de los campos de entrada
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío de datos
  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Crear el objeto con los datos del usuario
    const newUser = {
      firstName,
      lastName,
      email,
      password
    };

    try {
      // Enviar los datos al backend
      const response = await fetch(API_URL, { // Verifica que el puerto es correcto
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      // Comprobar la respuesta del servidor
      const data = await response.json();
      if (data.success) {
        alert("User created successfully!");
      } else {
        alert("Error creating user: " + data.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SignUp;
