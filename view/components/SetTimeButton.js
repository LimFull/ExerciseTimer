import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const SetTimeButton = ({time, text, setDefaultTime, disabled}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setDefaultTime(time);
      }}
      disabled={disabled}>
      <Text style={styles.buttonText}>{`${text}`}</Text>
    </TouchableOpacity>
  );
};

export default SetTimeButton;

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 40,
    backgroundColor: '#9370DB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 15,
  },
});
