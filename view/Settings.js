import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {setTimes} from '@store';
import {useSelector, useDispatch, connect} from 'react-redux';
import {sensitiveHeaders} from '../node_modules_back/@types/node/http2.d';
import {BottomBannerAds} from './utils/Ads';

const Settings = () => {
  const state = useSelector(state => state);
  const {firstTime, secondTime, thirdTime} = useSelector(state => state);
  const dispatch = useDispatch();
  const getMinute = time => {
    return parseInt(time / 60000);
  };

  const getSecond = time => {
    return parseInt(time % 60000);
  };

  const setMinute = (target, time) => {
    const m = time * 60000;
    const s = getSecond(state[target]);
    dispatch(setTimes({[target]: m + s}));
  };

  const setSecond = (target, time) => {
    const m = getMinute(state[target]) * 60000;
    const s = time * 1000;
    dispatch(setTimes({[target]: m + s}));
  };

  const renderInput = (text, time, target, defaultValue) => {
    const m = getMinute(time);
    const s = getSecond(time);
    return (
      <View style={{marginBottom: 15, alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 5}}>{text}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            maxLength={2}
            keyboardType={'decimal-pad'}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'white',
              fontSize: 20,
              marginBottom: 10,
              marginLeft: 10,
            }}
            defaultValue={defaultValue.m.toString()}
            textAlign="center"
            onSubmitEditing={e => {
              setMinute(target, Number(e.nativeEvent.text));
            }}
            placeholder={'00'}
          />
          <Text>분</Text>
          <TextInput
            maxLength={2}
            keyboardType={'decimal-pad'}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'white',
              fontSize: 20,
              marginBottom: 10,
              marginLeft: 10,
            }}
            defaultValue={defaultValue.s.toString()}
            textAlign="center"
            onSubmitEditing={e => {
              setSecond(target, Number(e.nativeEvent.text));
            }}
            placeholder={'00'}
          />
          <Text>초</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderInput('1번 휴식 시간', firstTime, 'firstTime', {m: 1, s: 30})}
      {renderInput('2번 휴식 시간', secondTime, 'secondTime', {m: 3, s: 0})}
      {renderInput('3번 휴식 시간', thirdTime, 'thirdTime', {m: 5, s: 0})}
      <View style={{position: 'absolute', bottom: 0}}>
        <BottomBannerAds />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
