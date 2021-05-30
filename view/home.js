import React, {Component, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Timer from '@components/Timer';
import Rep from '@components/Rep';

import SetTimeButton from '@components/SetTimeButton';
import {getFormattedTime} from './utils';

let interval;
let pausedCurrentLeft = 0;

const Home = () => {
  const defaultRecord = [{rep: 1}, {rep: 2}, {rep: 3}, {rep: 4}];

  const [defaultTime, setDefaultTime] = useState(90000);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [currentLeft, setCurrentLeft] = useState(0);
  const [currentRep, setCurrentRep] = useState(1);
  const [record, setRecord] = useState(defaultRecord);
  const textInput = useRef();

  const addRep = () => {
    setCurrentRep(currentRep + 1);
  };

  const _onClear = () => {
    setCurrentRep(1);
    setRecord(defaultRecord);
  };

  const _onStart = (textInput, defaultValue) => {
    const start = Date.now();
    if (!isPause) {
      const index = record.findIndex(r => r.rep === currentRep);
      const tempRecord = record;
      if (index === -1) {
        tempRecord.push({
          rep: currentRep,
          time: getFormattedTime(defaultTime),
        });
      } else {
        tempRecord[index] = {
          rep: currentRep,
          time: getFormattedTime(defaultTime),
        };
      }

      setRecord(tempRecord);
    }

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
        addRep();
      }
    }, 16);
  };

  const _onStop = () => {
    setIsPause(true);
    pausedCurrentLeft = currentLeft;
    clearInterval(interval);
  };

  const renderReset = () => {
    const color =
      isPause && !isRunning ? 'rgba(112, 128, 144, 0.5)' : 'rgba(0,0,0,0.5)';
    return (
      <TouchableOpacity
        style={{...styles.bigButton, backgroundColor: color}}
        onPress={() => {
          textInput.current.setNativeProps({
            text: getFormattedTime(defaultTime),
          });
          setIsPause(false);
        }}
        disabled={!isPause || isRunning}>
        <Text style={styles.bigButtonText}>{'재설정'}</Text>
      </TouchableOpacity>
    );
  };

  const renderStart = () => {
    return isRunning ? (
      <TouchableOpacity
        style={{...styles.bigButton, backgroundColor: 'rgba(0,0,255,1)'}}
        onPress={() => {
          setIsRunning(false);
          _onStop();
        }}>
        <Text style={styles.bigButtonText}>{'일시 정지'}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={{...styles.bigButton, backgroundColor: 'rgba(0,0,255,1)'}}
        onPress={() => {
          setIsRunning(true);

          _onStart(textInput, defaultTime);
        }}>
        <Text style={styles.bigButtonText}>{'시작'}</Text>
      </TouchableOpacity>
    );
  };

  const renderClear = () => {
    return (
      <TouchableOpacity
        style={styles.clearButton}
        disabled={isRunning}
        onPress={() => {
          _onClear();
        }}>
        <Text style={styles.clearButtonText}>초기화</Text>
      </TouchableOpacity>
    );
  };

  const renderScrollBox = () => {
    const splitBar = () => <View style={styles.splitBar} />;

    const data = (rep, time) => (
      <View style={styles.scrollBoxData}>
        <Text style={styles.scrollBoxRep}>{time ? `${rep} rep` : ''}</Text>
        <Text style={styles.scrollBoxTime}>{time ? time : ''}</Text>
      </View>
    );

    return (
      <View style={styles.scrollContainer}>
        <ScrollView style={{backgroundColor: 'black'}}>
          {record.map((r, i) => {
            return (
              <View key={i}>
                {splitBar()}
                {data(r.rep, r.time)}
              </View>
            );
          })}
          {splitBar()}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Rep number={currentRep} />
      <Timer ref={textInput} defaultTime={defaultTime} />
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
      <View style={styles.bigButtonContainer}>
        {renderReset()}
        {renderStart()}
      </View>
      {renderScrollBox()}
      {renderClear()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
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
    borderWidth: 2,
    borderColor: 'gray',
  },
  bigButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  clearButton: {
    width: 250,
    height: 45,
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
  },
  clearButtonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  scrollContainer: {
    width: '80%',
    height: 220,
  },
  splitBar: {
    width: '100%',
    height: 1,
    backgroundColor: '#2b2b2b',
  },
  scrollBoxData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollBoxRep: {
    height: 43,
    padding: 5,
    marginLeft: 5,
    fontSize: 28,
    color: 'white',
  },
  scrollBoxTime: {
    padding: 5,
    marginRight: 5,
    fontSize: 28,
    color: 'white',
  },
});

export default Home;
