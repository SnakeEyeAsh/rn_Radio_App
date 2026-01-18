import { Alert, FlatList, Modal, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Emisora, Emisoras } from 'model/Types';
import { Searchbar, Text } from 'react-native-paper';
import { consultarEmisoras } from 'helpers/RadioAPI';
import EmisoraCard from './EmisoraCard';
import Reproductor from './Reproductor';

export default function AppRadio() {
  const [emisoras, setEmisoras] = useState<Emisoras>([]);
  const [accionBuscar, setAccionBuscar] = useState<string>('');
  const [emisoraSeleccionada, setEmisoraSeleccionada] = useState<Emisora | null>(null);

  function accionConsultarEmisoras(accionBuscar: string) {
    consultarEmisoras(accionBuscar)
      .then((data) => {
        setEmisoras(data);
      })
      .catch((error) => {
        Alert.alert('Error', 'No se pudieron consultar las emisoras');
      });
  }

  return (
    <View className="justify-top flex-1 items-center px-4 pt-20">
      <Text variant="titleLarge">Radios del Mundo</Text>
      <Searchbar
        value={accionBuscar}
        onChangeText={setAccionBuscar}
        icon={'magnify'}
        onIconPress={() => accionConsultarEmisoras(accionBuscar)}
      />

      <FlatList
        style={{ marginTop: 16 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        data={emisoras}
        keyExtractor={(emisora) => emisora.stationuuid}
        renderItem={({ item }) => (
          <EmisoraCard emisora={item} setEmisora={() => setEmisoraSeleccionada(item)} />
        )}
      />

      {emisoraSeleccionada && (
        <Modal animationType="slide" visible={emisoraSeleccionada !== null} transparent={true}>
          <Reproductor
            emisora={emisoraSeleccionada}
            setEmisora={() => setEmisoraSeleccionada(null)}
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
