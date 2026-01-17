import "./global.css"
import { View, Text } from 'react-native'
import React from 'react'
import { PaperProvider } from 'react-native-paper'
import AppRadio from 'components/AppRadio'
import { temaClaro } from 'themes/TemaClaro'

export default function App() {
  return (
    <PaperProvider theme={temaClaro}>
      <AppRadio/>
    </PaperProvider>
  )
}