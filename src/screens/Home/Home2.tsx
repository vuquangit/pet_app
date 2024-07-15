import React, {FC} from 'react';
import {Button, Text, View} from 'react-native';

interface PropsType {
  navigation: any;
}

export const Home2: FC<PropsType> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Go to Home 3"
        onPress={() => navigation.navigate('home3')}
      />

      <Text>Home 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};
