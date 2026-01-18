import { Alert, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Emisora } from 'model/Types';
import { Image } from 'expo-image';
import { IconButton, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useRef } from 'react';

type Props = {
  emisora: Emisora;
  setEmisora: () => void;
};

export default function Reproductor({ emisora, setEmisora }: Props) {
  const tema = useTheme();
  const radio = useRef<Audio.Sound>(new Audio.Sound());
  const [reproduciendo, setReproduciendo] = useState<boolean>(false);
  const [volumen, setVolumen] = useState<number>(1.0);

  async function reproducir() {
    try {
      const status = await radio.current.getStatusAsync();
      if (status.isLoaded) {
        await radio.current.playAsync();
      } else {
        await radio.current.loadAsync({ uri: emisora.url }, { shouldPlay: true });
      }
      setReproduciendo(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudo reproducir la emisora');
    }
  }

  async function detener() {
    try {
      await radio.current.pauseAsync();
      setReproduciendo(false);
    } catch (error) {
      console.log('Error al pausar:', error);
    }
  }

  function playPulsado() {
    if (reproduciendo) {
      detener();
    } else {
      reproducir();
    }
  }

  useEffect(() => {
    radio.current.setVolumeAsync(volumen);
  }, [volumen]);
  return (
    <View className="w-full flex-1">
      <Pressable
        className="flex-1"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        onPress={() => [detener(), setEmisora()]}>
        <View className="absolute bottom-0 w-full rounded-t-lg p-4" style={{ backgroundColor: tema.colors.elevation.level1 }}>
          <Image
            source={emisora.favicon ? { uri: emisora.favicon } : require('../assets/icono.jpg')}
            style={{ width: '100%', aspectRatio: 1 }}
          />
          <View className="flex-column items-center justify-center py-4">
            <Text style={{ color: tema.colors.onSurface, fontSize: 18, fontWeight: 'bold' }}>{emisora.name}</Text>
            <View className="mb-2 flex-row items-center justify-center space-x-2">
              <Image
                source={{
                  uri: `https://flagsapi.com/${emisora.countrycode.toUpperCase()}/flat/32.png`,
                }}
                style={{ width: 32, height: 32 }}
              />
              <Text style={{ color: tema.colors.onSurfaceVariant }}>{emisora.country}</Text>
            </View>
            <IconButton
              icon={reproduciendo ? 'pause-circle' : 'play-circle'}
              mode="contained"
              onPress={playPulsado}
              size={48}
            />
          </View>
          <View className="flex-row items-center justify-center pt-4">
            <IconButton icon="volume-low" size={22} />
            <Slider minimumValue={0} maximumValue={1} step={0.01} style={{ width: '60%' }} value={volumen} onValueChange={setVolumen}/>
            <IconButton icon="volume-high" size={22} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
