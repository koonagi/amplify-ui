import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import {
  Authenticator,
  useAuthenticator,
  ModuleProvider,
} from '@aws-amplify/ui-react-native';
import { initRNClipboardModule } from '@aws-amplify/ui-react-native/dist/contexts/helpers';
import RNClipboard from '@react-native-clipboard/clipboard';
import { Amplify } from 'aws-amplify';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const Clipboard = initRNClipboardModule(RNClipboard);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

function App() {
  return (
    <ModuleProvider
      modules={{
        Clipboard,
      }}
    >
      <Authenticator.Provider>
        <Authenticator>
          <View style={style.container}>
            <SignOutButton />
          </View>
        </Authenticator>
      </Authenticator.Provider>
    </ModuleProvider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
