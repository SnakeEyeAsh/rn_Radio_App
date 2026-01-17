import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Emisora } from 'model/Types'
import { Card, Chip } from 'react-native-paper'

type Props = {
    emisora:Emisora,
    setEmisora: ()=> void
}

export default function EmisoraCard({ emisora, setEmisora }: Props) {
  return (
    <Pressable onPress={setEmisora}>
      <Card >
        <Card.Title title={emisora.name} subtitle={emisora.country+" "+emisora.language} />
        <Card.Content>
            {
                emisora.tags.map((tag)=>
                <Chip>{tag}</Chip>)
            }
        </Card.Content>

      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({})