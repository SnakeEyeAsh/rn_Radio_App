import './global.css';
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import AppRadio from 'components/AppRadio';
import { temaClaro } from 'themes/TemaClaro';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TemaOscuro } from 'themes/TemaOscuro';

export default function App() {
  const [tema, setTema] = useState<MD3Theme | undefined>(temaClaro);

  async function cargarTemaInicial(){
    const temaGuardado = await AsyncStorage.getItem('tema');
    if(temaGuardado===null){
      setTema(temaClaro);
    }else if(temaGuardado==='claro'){
      setTema(temaClaro);
    }else if(temaGuardado==='oscuro'){
      setTema(TemaOscuro);
    }
  }

  function mostrarContenido() {
    if (tema !== undefined) {
      return (
        <View style={{ flex: 1, backgroundColor: tema.colors.background }}>
          <PaperProvider theme={tema}>
            <AppRadio tema={tema} setTema={setTema} />
          </PaperProvider>
        </View>
      );
    } else {
      return <View style={{ flex: 1, backgroundColor: 'white' }}></View>;
    }
  }

  useEffect(() => {
    cargarTemaInicial();
  }, []);

  return mostrarContenido();
}
