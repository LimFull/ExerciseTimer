import React, {useRef, useState, useEffect, forwardRef} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {getFormattedTime} from '../utils';

const Timer = forwardRef((props, ref) => {
  const textInput = useRef();
  const [defaultValue, setDefaultValue] = useState(props.defaultTime);

  useEffect(() => {
    setDefaultValue(props.defaultTime);
  }, [props.defaultTime]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={styles.textInput}
        defaultValue={getFormattedTime(defaultValue)}
        editable={false}
        textAlign={'center'}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '10%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '80%',
    height: '90%',
    backgroundColor: 'red',
    fontSize: 30,
  },
});

export default Timer;
