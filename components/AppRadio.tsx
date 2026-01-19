import { Alert, FlatList, Modal, StyleSheet, View } from 'react-native';
import React, { use, useCallback, useEffect, useState } from 'react';
import { Emisora, Emisoras } from 'model/Types';
import { ActivityIndicator, Icon, MD3Theme, Searchbar, Switch, Text } from 'react-native-paper';
import { consultarEmisoras } from 'helpers/RadioAPI';
import EmisoraCard from './EmisoraCard';
import Reproductor from './Reproductor';
import { temaClaro } from 'themes/TemaClaro';
import { TemaOscuro } from 'themes/TemaOscuro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import R from 'types-ramda';

type AppRadioProps = {
  tema: MD3Theme;
  setTema: (tema: MD3Theme) => void;
};

export default function AppRadio({ tema, setTema }: AppRadioProps) {

  const [offset, setOffset] = useState<number>(0);
  const [cargando, setCargando] = useState<boolean>(false);
  const [emisoras, setEmisoras] = useState<Emisoras>([]);
  const [accionBuscar, setAccionBuscar] = useState<string>('');
  const [emisoraSeleccionada, setEmisoraSeleccionada] = useState<Emisora | null>(null);

  const [temaOscuroActivo, setTemaOscuroActivo] = useState<boolean>(false);

  const renderItem = useCallback(({ item }:{item:Emisora}) => <EmisoraCard emisora={item} setEmisora={()=>setEmisoraSeleccionada(item)}/>, [emisoras]);

  async function guardarTema(){
    const tema = temaOscuroActivo ? 'oscuro' : 'claro';
    await AsyncStorage.setItem('tema', tema);
  }

  function buscarEmisoras(){
    setEmisoras([]);
    setOffset(0);
    accionConsultarEmisoras(accionBuscar);

  }

  useEffect(() => {
    if(tema === TemaOscuro){
      setTemaOscuroActivo(true);
    };
  }, [setTema]);

  function accionConsultarEmisoras(accionBuscar: string) {
    consultarEmisoras(accionBuscar,offset,10)
      .then((data) => {
        const nuevaLista = R.concat(data, emisoras);
        setEmisoras(nuevaLista);
        setCargando(false);
        
        setOffset(offset + 10);
      })
      .catch((error) => {
        Alert.alert('Error', 'No se pudieron consultar las emisoras');
      });
  }

  useEffect(() => {
    temaOscuroActivo ? setTema(TemaOscuro) : setTema(temaClaro);
  }, [temaOscuroActivo]);

  return (
    <View className="justify-top flex-1 items-center px-4 pt-20" style={{ backgroundColor: tema.colors.background }}>
      <Text variant="titleLarge">Radios del Mundo</Text>
      <Searchbar
        value={accionBuscar}
        onChangeText={setAccionBuscar}
        icon={'magnify'}
        onIconPress={() => buscarEmisoras()}
      />

      <FlatList
        style={{ marginTop: 16 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        data={emisoras}
        keyExtractor={(emisora) => emisora.stationuuid}
        renderItem={renderItem}
        onEndReached={()=>accionConsultarEmisoras(accionBuscar)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={cargando ? ActivityIndicator : null}
        initialNumToRender={10}
        maxToRenderPerBatch={10}

      />

      {emisoraSeleccionada && (
        <Modal animationType="slide" visible={emisoraSeleccionada !== null} transparent={true}>
          <Reproductor
            emisora={emisoraSeleccionada}
            setEmisora={() => setEmisoraSeleccionada(null)}
          />
        </Modal>
      )}
      <View className="flex-row w-full justify-end items-center px-2 pb-4 self-end">
        <Icon size={20} source={"weather-sunny"} color={tema.colors.onSurface} />
        <Switch value={temaOscuroActivo} onValueChange={() => setTemaOscuroActivo(!temaOscuroActivo)} />
        <Icon size={20} source={"weather-night"} color={tema.colors.onSurface} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
