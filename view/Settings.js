import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {setTimes} from '@store';
import {useSelector, useDispatch, connect} from 'react-redux';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#7FFFD4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
