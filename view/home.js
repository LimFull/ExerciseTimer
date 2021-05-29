import React, {Component, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Timer from './components/Timer';

import SetTimeButton from './components/SetTimeButton';
import {getFormattedTime} from './utils';

const Home = () => {
  const [defaultTime, setDefaultTime] = useState(90000);
  const textInput = useRef();

  const _onPress = (textInput, defaultValue) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;

      const left = defaultValue - elapsed;
      textInput.current.setNativeProps({text: getFormattedTime(left)});

      if (left <= 0) {
        clearInterval(interval);
        textInput.current.setNativeProps({text: getFormattedTime(0)});
      }
    }, 41);
  };

  return (
    <View style={styles.container}>
      <Timer ref={textInput} defaultTime={defaultTime} />

      <View style={styles.setTimeButtonsContainer}>
        <SetTimeButton
          time={90000}
          text={'1분 30초'}
          setDefaultTime={setDefaultTime}
        />
        <SetTimeButton
          time={180000}
          text={'3분'}
          setDefaultTime={setDefaultTime}
        />
        <SetTimeButton
          time={300000}
          text={'5분'}
          setDefaultTime={setDefaultTime}
        />
      </View>
      <TouchableOpacity
        style={{width: 200, height: 50, backgroundColor: 'pink'}}
        onPress={() => {
          _onPress(textInput, defaultTime);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setTimeButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    // backgroundColor: 'red',
  },
});

export default Home;
