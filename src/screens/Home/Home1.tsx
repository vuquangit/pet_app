import React, {FC} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScreenLayout} from '../../layouts/ScreenLayout';

interface PropsType {
  navigation: any;
}

export const Home1: FC<PropsType> = ({navigation}) => {
  return (
    <ScreenLayout isSafeAreaView={true} isScrollView>
      <View style={styles.container}>
        <Button
          title="Go to Home 2"
          onPress={() => navigation.navigate('home2')}
        />
        <Text>Home 1</Text>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
