import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const WhiteLogo = () => {
  return (
    <View style={styles.imageStyle}>
      <Image
        source={require('../assets/react-logo-white.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 100,
  },
});
