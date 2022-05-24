import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {loginStyles} from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {signIn, errorMessage, removeError} = useContext(AuthContext);

  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    } else {
      Alert.alert('Login unsuccessful', errorMessage, [
        {
          text: 'Ok',
          onPress: () => {
            removeError();
          },
        },
      ]);
    }
  }, [errorMessage]);

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();

    signIn({correo: email, password: password});
  };
  return (
    <>
      {/* Background */}
      <Background />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Keyboard avoid view */}
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'email')}
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder="*******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            secureTextEntry={true}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'password')}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={onLogin}
          />

          {/* Login Button */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={loginStyles.button}
              onPress={onLogin}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Create a new account */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginStyles.buttonText}>Create a new account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
