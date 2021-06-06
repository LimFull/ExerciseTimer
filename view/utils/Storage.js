import {AsyncStorage} from 'react-native';

export const setData = async (key, data) => {
  console.log('setData', key, data.toString());
  try {
    await AsyncStorage.setItem(key, data.toString());
  } catch (error) {
    // Error saving data
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log('getData!', key, value);
      return value;
    }
    return null;
  } catch (error) {
    console.log('error', error);
    // Error retrieving data
  }
};
