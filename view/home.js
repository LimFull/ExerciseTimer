import React, {Component, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Timer from '@components/Timer';

import SetTimeButton from '@components/SetTimeButton';
import {getFormattedTime} from './utils';

let interval;
let pausedCurrentLeft = 0;

const Home = () => {
  const [defaultTime, setDefaultTime] = useState(90000);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [currentLeft, setCurrentLeft] = useState(0);
  const textInput = useRef();

  const _onStart = (textInput, defaultValue) => {
    const start = Date.now();

    interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const fullTime = isPause ? pausedCurrentLeft : defaultValue;
      const left = fullTime - elapsed;
      textInput.current.setNativeProps({text: getFormattedTime(left)});
      setCurrentLeft(left);
      if (left <= 0) {
        clearInterval(interval);
        textInput.current.setNativeProps({text: getFormattedTime(0)});
        setIsPause(false);
        setIsRunning(false);
      }
    }, 41);
  };

  const _onStop = () => {
    setIsPause(true);
    pausedCurrentLeft = currentLeft;
    clearInterval(interval);
  };

  const renderReset = () => {
    return (
      <TouchableOpacity
        style={{...styles.bigButton, backgroundColor: 'blue'}}
        onPress={() => {
          textInput.current.setNativeProps({
            text: getFormattedTime(defaultTime),
          });
          setIsPause(false);
        }}
        disabled={!isPause}>
        <Text style={styles.bigButtonText}>{'재설정'}</Text>
      </TouchableOpacity>
    );
  };

  const renderStart = () => {
    return isRunning ? (
      <TouchableOpacity
        style={{...styles.bigButton, backgroundColor: 'pink'}}
        onPress={() => {
          setIsRunning(false);
          _onStop();
        }}>
        <Text style={styles.bigButtonText}>{'정지'}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={{...styles.bigButton, backgroundColor: 'pink'}}
        onPress={() => {
          setIsRunning(true);
          _onStart(textInput, defaultTime);
        }}>
        <Text style={styles.bigButtonText}>{'시작'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.setTimeButtonsContainer}>
        <SetTimeButton
          time={90000}
          text={'1분 30초'}
          setDefaultTime={setDefaultTime}
          disabled={isRunning || isPause}
        />
        <SetTimeButton
          time={180000}
          text={'3분'}
          setDefaultTime={setDefaultTime}
          disabled={isRunning || isPause}
        />
        <SetTimeButton
          time={300000}
          text={'5분'}
          setDefaultTime={setDefaultTime}
          disabled={isRunning || isPause}
        />
      </View>
      <Timer ref={textInput} defaultTime={defaultTime} />

      <View style={styles.bigButtonContainer}>
        {renderReset()}
        {renderStart()}
      </View>
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
  bigButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  bigButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
  },
  bigButtonText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Home;
