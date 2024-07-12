import React, {FC} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

export const Setting1: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Setting 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
});
