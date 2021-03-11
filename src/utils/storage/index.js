import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from '../showMessage';

export const storeData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    // saving error
    showMessage('Gagal menyimpan ke Localstorage');
  }
};

export const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    showMessage('Gagal mengambil Data dari Localstorage');
  }
};
