import React, {FC} from 'react';
import {Button, StatusBar, StyleSheet, View} from 'react-native';

import {ScreenLayout} from '../../layouts/ScreenLayout';
import {useSignOut} from '../../hooks/useSignOut';

interface PropsType {
  navigation: any;
}

export const Setting: FC<PropsType> = ({navigation}) => {
  const {isLoading, isSuccess /*, mutateAsync: signOut */, signOut} =
    useSignOut();

  const handleSigOut = async () => {
    try {
      await signOut();
      navigation.navigate('AuthStack', {screen: 'SignIn'});
    } catch {}
  };

  return (
    <ScreenLayout isSafeAreaView={true} isScrollView>
      <View style={styles.container}>
        <Button
          title="Go to Setting 1"
          onPress={() => navigation.navigate('setting1')}
        />
        <Button
          title="Logout"
          onPress={handleSigOut}
          disabled={isLoading || isSuccess}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fafafa',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    textAlign: 'left',
  },
  title: {
    fontSize: 32,
  },
});
