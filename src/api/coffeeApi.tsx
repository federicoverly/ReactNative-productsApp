import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Development
const baseURL = 'http://localhost:8080/api';

const coffeeApi = axios.create({baseURL});

coffeeApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default coffeeApi;
