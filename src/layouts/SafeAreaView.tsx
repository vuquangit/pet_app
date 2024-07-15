import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView as RNSafeAreaView} from 'react-native-safe-area-context';

type PropsType = {
  children: React.ReactNode;
  isSafeAreaView?: boolean;
};

export const SafeAreaView: FC<PropsType> = ({
  children,
  isSafeAreaView = true,
}) => {
  return (
    <View style={styles.view}>
      {isSafeAreaView ? <RNSafeAreaView>{children}</RNSafeAreaView> : children}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
  },
});
