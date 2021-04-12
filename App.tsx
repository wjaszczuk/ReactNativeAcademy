import React, {useReducer, useCallback} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Button, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATE_KEY = 'state';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {value: 0});

  const handleIncrease = useCallback(() => {
    dispatch({type: 'increase'});
  }, [dispatch]);

  const handleDecrease = useCallback(() => {
    dispatch({type: 'decrease'});
  }, [dispatch]);

  const handleSave = useCallback(() => {
    AsyncStorage.setItem(STATE_KEY, JSON.stringify(state));
  }, [state]);

  const handleLoad = useCallback(() => {
    AsyncStorage.getItem(STATE_KEY).then(result => {
      dispatch({
        type: 'set',
        state: result ? (JSON.parse(result) as {value: number}) : null,
      });
    });
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text>{`Current value: ${JSON.stringify(state)}`}</Text>
        <Button title={'+'} onPress={handleIncrease} />
        <Button title={'-'} onPress={handleDecrease} />
        <Button title={'save'} onPress={handleSave} />
        <Button title={'load'} onPress={handleLoad} />
      </ScrollView>
    </SafeAreaView>
  );
};

function reducer(
  state: {value: number},
  action:
    | {type: 'increase'}
    | {type: 'decrease'}
    | {type: 'set'; state: {value: number} | null},
) {
  switch (action.type) {
    case 'increase':
      return {value: Number(state.value ?? 0) + 1};
    case 'decrease':
      return {value: Number(state.value ?? 0) - 1};
    case 'set':
      return action.state ? action.state : {value: 0};
    default:
      return state;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
