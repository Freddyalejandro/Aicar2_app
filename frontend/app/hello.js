import React from 'react';
import { View, Text, StyleSheet,Image, ImageBackground } from 'react-native';
const logo  = require('../assets/Aicar-lg.png')
import { Link } from 'expo-router';

export default function WelcomePage() {
  return (
          <View style={styles.container}>
            <Image
              source={logo}
              style={styles.image}
            />
            <Text style={styles.logo}>Aicar.</Text>
            <Text style={styles.title}>Hello Freddy!</Text>
              
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(187, 164, 165, 0.5)', // Color de fondo semi-transparente
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    width: 200,    // Ajusta el tamaño de la imagen
    height: 250,   // Ajusta el tamaño de la imagen
    resizeMode: 'contain', // Ajusta cómo se escala la imagen
  },
  logo: {
    fontSize: 48,
    marginBottom: 20,
    color: '#008080',
  },
  title: {
    fontSize: 24,
  },
});

