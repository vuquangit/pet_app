import React, {FC, useMemo, useState} from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import {useSignIn} from '../../hooks/useSignIn';
import {isEmail, isValidPassword} from '../../utils';
import Config from 'react-native-config';

export const SignInScreen: FC = () => {
  const {isLoading, onSubmit, error} = useSignIn();

  const [email, setEmail] = useState<string>(Config?.FAKE_EMAIL || ''); // init test
  const [password, setPassword] = useState<string>(Config?.FAKE_PASSWORD || ''); // init test
  const [isPasswordSecure, setIsPasswordSecure] = useState<boolean>(true);

  const isValidInputs = useMemo<boolean>(
    () => isEmail(email) && isValidPassword(password),
    [email, password],
  );

  const handlePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text>{error?.data?.email ?? ''}</Text>

      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isPasswordSecure}
        />
        <TouchableOpacity style={styles.eye} onPress={handlePasswordVisibility}>
          <FontAwesomeIcon
            icon={isPasswordSecure ? faEye : faEyeSlash}
            size={20}
            color="#aaaaaa"
          />
        </TouchableOpacity>
      </View>

      <Text>{error?.data?.password ?? ''}</Text>

      <Button
        title="Sign in"
        disabled={!isValidInputs || isLoading}
        onPress={() => onSubmit({email, password})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#aaaaaa',
    backgroundColor: '#fff',
  },
  passwordWrapper: {
    // display: 'flex',
  },
  eye: {
    position: 'absolute',
    right: 20,
    top: '35%',
  },
});
