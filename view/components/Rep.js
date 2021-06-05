import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Rep = ({number}) => {
  return <Text style={styles.number}>{`${number} rep`}</Text>;
};

const styles = StyleSheet.create({
  number: {
    color: 'yellow',
    fontSize: 50,
    marginBottom: -20,
    marginTop: 15,
  },
});

export default Rep;
