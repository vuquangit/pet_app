import React, {FC} from 'react';
import {Button, Text, View} from 'react-native';

interface PropsType {
  navigation: any;
}

export const Home3: FC<PropsType> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Go back" onPress={() => navigation.goBack()} />

      <Text>Home 3</Text>
    </View>
  );
};
