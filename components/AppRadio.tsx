import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Emisora, Emisoras } from 'model/Types';
import { Searchbar, Text } from 'react-native-paper';
import { consultarEmisoras } from 'helpers/RadioAPI';
import EmisoraCard from './EmisoraCard';

export default function AppRadio() {

  const [emisoras, setEmisoras] = useState<Emisoras|undefined>(undefined);
  const [accionBuscar, setAccionBuscar] = useState<string>("");

  const [listaEmisora,setListaEmisora] = useState<Emisoras>([]);

  function accionConsultarEmisoras(accionBuscar: string){
    consultarEmisoras(accionBuscar).then((data)=>{
      console.log(data);
    }).catch((error)=>{
    Alert.alert("Error","No se pudieron consultar las emisoras");
    });
  }

  
  return (
    <View className='flex-1 justify-center items-center px-4'>
      <Text variant='titleLarge'>Radios del Mundo</Text>
      <Searchbar 
      value={accionBuscar}
      onChangeText={setAccionBuscar}
      icon={"magnify"}
      onIconPress={()=>accionConsultarEmisoras(accionBuscar)}
      />
      {
        emisoras && emisoras.map((emisora)=>
          <View>
          <EmisoraCard emisora={emisora} setEmisora={()=>setEmisoras}/>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({})