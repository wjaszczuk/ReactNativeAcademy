import React, {useCallback} from 'react';
import {Button, View} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
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
    check(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        if (result === RESULTS.GRANTED) {
          camera();
        } else if (result === RESULTS.DENIED) {
          request(PERMISSIONS.ANDROID.CAMERA).then(requestResult => {
            if (requestResult === RESULTS.GRANTED) {
              camera();
            } else {
              console.warn('No camera ' + requestResult);
            }
          });
        } else {
          console.warn('No camera ' + result);
        }
      })
      .catch(e => {
        console.warn('Camera exception ' + JSON.stringify(e));
      });

    function camera() {
      launchCamera(
        {
          cameraType: 'front',
          mediaType: 'photo',
          includeBase64: useBase64,
          saveToPhotos: true,
        },
        callback,
      );
    }
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
