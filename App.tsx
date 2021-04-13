import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [locationResponse, setLocationResponse] = useState<null | any>(null);

  useEffect(() => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    check(permission).then(result => {
      if (result === RESULTS.GRANTED) {
        enableLocation();
      } else if (result === RESULTS.DENIED) {
        request(permission).then(requestResult => {
          if (requestResult === RESULTS.GRANTED) {
            enableLocation();
          }
        });
      }
    });

    function enableLocation() {
      console.log('enable location');
      Geolocation.watchPosition(
        setLocationResponse,
        err => {
          console.error(err);
        },
        {
          accuracy: {android: 'high', ios: 'best'},
          enableHighAccuracy: true,
          interval: 100,
          fastestInterval: 50,
          showLocationDialog: true,
          showsBackgroundLocationIndicator: true,
        },
      );
    }

    return () => {
      Geolocation.stopObserving();
    };
  }, [setLocationResponse]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text>{JSON.stringify(locationResponse)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
