import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {prepareCommonScreen} from './src/screens/CommonScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {BackHandler} from 'react-native';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerHomeScreen = prepareCommonScreen(['Settings']);
const SettingsScreen = prepareCommonScreen(['Home']);

const Screen = prepareCommonScreen(['Screen 1']);
const Screen1 = prepareCommonScreen(['Screen 2']);
const Screen2 = prepareCommonScreen(['Screen']);

const StackScreen = () => (
  <Stack.Navigator initialRouteName="Screen 2">
    <Stack.Screen name={'Screen'} component={Screen} />
    <Stack.Screen name={'Screen 1'} component={Screen1} />
    <Stack.Screen name={'Screen 2'} component={Screen2} />
  </Stack.Navigator>
);

const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Drawer Home">
    <Drawer.Screen name={'Drawer Home'} component={DrawerHomeScreen} />
    <Drawer.Screen name={'Settings'} component={SettingsScreen} />
  </Drawer.Navigator>
);

export default function App() {
  const handleBackButton = useCallback(() => {
    console.log('back button');
    return true;
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => subscription.remove();
  }, [handleBackButton]);

  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Home"
          component={StackScreen}
          options={{
            title: 'Stack',
            tabBarIcon: ({color, size, focused}) => (
              <Ionicons
                size={size}
                color={color}
                name={focused ? 'ios-home' : 'ios-home-outline'}
              />
            ),
          }}
        />
        <BottomTab.Screen name="Drawer" component={DrawerScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
