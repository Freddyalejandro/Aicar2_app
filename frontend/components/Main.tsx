
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, ActivityIndicator, Button} from 'react-native';
const logo  = require('../assets/Aicar-lg.png');
import * as Google from 'expo-auth-session/providers/google';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';



WebBrowser.maybeCompleteAuthSession();

export function Main() {
  
const [accessToken, setAccessToken] = React.useState(null);
const [user,  setUser]= React.useState(null);
const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  clientId:'690627966515-87mk2igmfm7e1mcispujso6deu5heo6c.apps.googleusercontent.com',
  iosClientId: '690627966515-t4h4ot26gisd3cb0jaq2l2v8va3cmfpm.apps.googleusercontent.com',
  androidClientId:'690627966515-8uhmtbdcccf1qnoh7apl0efg8ti9084s.apps.googleusercontent.com',
  redirectUri:'https://auth.expo.io/@freddyalejito/AIcar_app2',
});

React.useEffect(() => {
  if (response?.type === "success") {
    const token = response.authentication.accessToken;
    setAccessToken(token);
    fetchUserInfo(token);
  }
}, [response]);

async function fetchUserInfo(token) {
  let res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const userInfo = await res.json();
  setUser(userInfo);
}


  const ShowUserInfo = () =>{
    if(user){
      return(
    
        <View style={styles.container}>
          <Text style= {styles.title}>welcome</Text>
          <Image source={{uri: user.picture}} style={styles.logo}></Image>
          <Text style= {styles.title}>{user.name}</Text>
        </View>
      )
    }
   }
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/datos'); // Cambia el puerto si es necesario
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <View style={styles.container}>
        <Image
            source={logo}
            style={styles.image}
        />
        {user && <ShowUserInfo/>}
        <Text style={styles.title}>Welcome Back</Text>
        <TouchableOpacity style={styles.button}>
            <Link href="/signin" style={styles.buttonText}>SIGN IN</Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Link href="/new_u" style={styles.buttonText}>SIGN UP</Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}
        disabled ={!request}
        onPress={()=>{
          promptAsync();
        }}>
            <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>


      {/* ejempo conexion  */}
        <Text>Datos del Backend:</Text>
      {data.map(item => (
        <Text key={item.id}>{item.first_name}</Text> // Ajusta según tu estructura de datos
      ))}
      <Button title="Recargar datos" onPress={fetchData} />
      {/* ejempo conexion  */}
      

    </View>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 48,
    marginBottom: 20,
    color: '#008080',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
  googleButton: {
    marginTop: 20,
  },
  googleText: {
    color: '#008080',
    fontSize: 16,
  },
  image: {
    width: 200,    // Ajusta el tamaño de la imagen
    height: 250,   // Ajusta el tamaño de la imagen
    resizeMode: 'contain', // Ajusta cómo se escala la imagen
  },
});
