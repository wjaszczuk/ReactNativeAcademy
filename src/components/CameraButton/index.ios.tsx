import React, {useCallback} from 'react';
import {Button, View} from 'react-native';
import {
  Callback,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

interface Props {
  callback: Callback;
  useBase64?: boolean;
}

export function CameraButton({callback, useBase64 = false}: Props) {
  const handleCameraClick = useCallback(() => {
    launchCamera(
      {
        cameraType: 'front',
        mediaType: 'photo',
        includeBase64: useBase64,
        saveToPhotos: true,
      },
      callback,
    );
  }, [callback, useBase64]);

  const handleLibraryClick = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: useBase64,
      },
      callback,
    );
  }, [callback, useBase64]);

  return (
    <View>
      <Button title="Open a camera" onPress={handleCameraClick} />
      <Button title="Open a photo library" onPress={handleLibraryClick} />
    </View>
  );
}
