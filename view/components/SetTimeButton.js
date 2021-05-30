import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const SetTimeButton = ({time, text, setDefaultTime, disabled}) => {
  return (
    <TouchableOpacity
      style={{
        width: 70,
        height: 50,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        setDefaultTime(time);
      }}
      disabled={disabled}>
      <Text>{`${text}`}</Text>
    </TouchableOpacity>
  );
};

export default SetTimeButton;
