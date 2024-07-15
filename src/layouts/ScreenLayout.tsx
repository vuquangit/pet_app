import React, {FC} from 'react';
import {RefreshControlProps, StyleSheet, View} from 'react-native';
import {SafeAreaView} from './SafeAreaView';
import {ScrollView} from './ScrollView';

type PropsType = {
  children: React.ReactNode;
  bgColor?: string;
  isSafeAreaView?: boolean;
  isScrollView?: boolean;
  onRefresh?: React.ReactElement<RefreshControlProps>;
};

export const ScreenLayout: FC<PropsType> = ({
  children,
  isSafeAreaView = true,
  isScrollView = true,
  onRefresh,
  // ...props
}) => {
  return (
    <View style={styles.view}>
      <SafeAreaView isSafeAreaView={isSafeAreaView}>
        <ScrollView isScrollView={isScrollView} refreshControl={onRefresh}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
  },
});
