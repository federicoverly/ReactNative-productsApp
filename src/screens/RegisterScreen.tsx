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
import {WhiteLogo} from '../components/WhiteLogo';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {loginStyles} from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {singUp, errorMessage, removeError} = useContext(AuthContext);
  const {email, password, name, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    Keyboard.dismiss();
    singUp({nombre: name, correo: email, password: password});
  };

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
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Keyboard avoid view */}
      <View style={loginStyles.formContainer}>
        <WhiteLogo />
        <Text style={loginStyles.title}>Register</Text>
        <Text style={loginStyles.label}>Name</Text>
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
          onChangeText={value => onChange(value, 'name')}
          value={name}
          autoCapitalize="words"
          autoCorrect={false}
        />
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
          onSubmitEditing={onRegister}
        />

        {/* Register Button */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={loginStyles.button}
            onPress={onRegister}>
            <Text style={loginStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* Create a new account */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.replace('LoginScreen')}
          style={loginStyles.buttonReturn}>
          <Text style={loginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5856d6',
  },
});
