import { Slot } from "expo-router";
import {StyleSheet, View, ImageBackground} from "react-native";
import { Carga } from "../components/Carga";

export default function Layout(){
  const backimag = require('../assets/rm378-08f.jpg')
    return(
      
      <Carga>
        <ImageBackground
        source={backimag} // Imagen de fondo
        style={styles.backgroundImage}
        >
        <View style={styles.container}>
          <Slot/>
        </View>
        </ImageBackground>
      </Carga>
    );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(187, 164, 165, 0.5)', // Color de fondo semi-transparente
  },
});