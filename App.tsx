import 'react-native-gesture-handler';
import React, {FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import {setupStore} from './src/store';
import {Navigation} from './src/components/Navigation';
import VersionCheckContainer from './src/containers/VersionCheckContainer';
import {AuthContainer} from './src/containers/AuthContainer';

const App: FC = () => {
  const store = setupStore();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AuthContainer>
        <Provider store={store}>
          <VersionCheckContainer>
            <Navigation />
          </VersionCheckContainer>
        </Provider>
      </AuthContainer>
    </SafeAreaProvider>
  );
};

export default App;
