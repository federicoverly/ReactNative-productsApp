import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Background = () => {
  return <View style={styles.backgroundStyle} />;
};

const styles = StyleSheet.create({
  backgroundStyle: {
    position: 'absolute',
    backgroundColor: '#5856d6',
    width: 1000,
    height: 1200,
    top: -250,
    transform: [
      {
        rotate: '-70deg',
      },
    ],
  },
});
