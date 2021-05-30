import React, {useRef, useState, useEffect, forwardRef} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {getFormattedTime} from '@utils';

const Timer = forwardRef((props, ref) => {
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
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
    color: 'white',
    fontSize: 80,
  },
});

export default Timer;
