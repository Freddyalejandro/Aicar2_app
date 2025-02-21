
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View} from 'react-native';
import{Main} from "./components/Main"

//web 690627966515-87mk2igmfm7e1mcispujso6deu5heo6c.apps.googleusercontent.com
//androit 690627966515-8uhmtbdcccf1qnoh7apl0efg8ti9084s.apps.googleusercontent.com
// ios 690627966515-t4h4ot26gisd3cb0jaq2l2v8va3cmfpm.apps.googleusercontent.com



export default function App() {
  return (

      <View>
        <StatusBar style='auto' /> 
        {/* <Logo/>  */}
        <Main/>
      </View>
  );
}


