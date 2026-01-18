import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Emisora } from 'model/Types';
import { Avatar, Card, Chip } from 'react-native-paper';

type Props = {
  emisora: Emisora;
  setEmisora: () => void;
};

export default function EmisoraCard({ emisora, setEmisora }: Props) {
  return (
    <Pressable onPress={setEmisora} className="m-2 ">
      <Card>
        <Card.Title
          title={emisora.name}
          subtitle={emisora.country + ' (' + emisora.language + ')'}
          left={() => (
            <Avatar.Image
              source={emisora.favicon ? { uri: emisora.favicon } : require('../assets/icono.jpg')}
              size={48}
            />
          )}
          style={{ marginBottom: 5 }}
        />
        <Card.Content className="flex-row flex-wrap gap-2">
          {emisora.tags.map((tag) => (
            <Chip key={tag.toString()}>{tag}</Chip>
          ))}
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
