import React, {useCallback, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export function prepareCommonScreen(nextScreenNames: string[]) {
  return function CommonScreen({
    navigation,
    route,
  }: {
    navigation:
      | StackNavigationProp<any>
      | BottomTabNavigationProp<any>
      | DrawerNavigationProp<any>;
    route: RouteProp<any, any>;
  }) {
    const handleGoBack = useCallback(() => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }, [navigation]);

    const handleCloseKeyboard = useCallback(() => {
      Keyboard.dismiss();
    }, []);

    const [newParams, setNewParams] = useState<string>('');

    return (
      <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
        <SafeAreaView style={styles.container}>
          <>
            <Text>Name: {route.name}</Text>
            <TextInput
              onChangeText={setNewParams}
              value={newParams}
              style={styles.input}
            />
            <Text>Params: {JSON.stringify(route.params)}</Text>
            {navigation.canGoBack() && (
              <Button onPress={handleGoBack} title="Go Back" />
            )}
            {nextScreenNames?.map(name => (
              <Button
                title={`go to ${name}`}
                key={name}
                onPress={() => {
                  navigation.navigate(name, {value: newParams});
                }}
              />
            ))}
          </>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 20,
    color: 'black'
  },
});
