import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Image, Text} from 'react-native';
import {CameraButton} from './src/components/CameraButton';
import {ImagePickerResponse} from 'react-native-image-picker';

const App = () => {
  const handleCamera = useCallback((response: ImagePickerResponse) => {
    console.info(JSON.stringify(response));
    setImageSrc(response.uri);
  }, []);

  const [imageSrc, setImageSrc] = useState<undefined | null | string>(null);

  const imageSource = useMemo(() => {
    return imageSrc ? {uri: imageSrc} : null;
  }, [imageSrc]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <CameraButton callback={handleCamera} />
        {imageSource !== null && (
          <Image source={imageSource} style={styles.image} />
        )}
        <Text style={styles.text}>{imageSrc}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {width: 200, height: 200},
  text: {color: 'white'},
});

export default App;
