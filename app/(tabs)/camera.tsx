import PhotoPreviewSection from '@/components/PhotoPreviewSection';
import { FontAwesome } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ToastAndroid} from 'react-native';

export default function Camera() {
  
  const showSaveToast = () => {
    ToastAndroid.show('Photo saved to gallery.', ToastAndroid.SHORT);
  }

  const showRetakeToast = () => {
    ToastAndroid.show('Photo discarded.', ToastAndroid.SHORT);
  }
  const showErrorToast = () => {
    ToastAndroid.show('Photo cannot be saved. An error occured.', ToastAndroid.SHORT);
  }

  const showNotSavedToast = () => {
    ToastAndroid.show('Photo not saved. Insufficient permission given.', ToastAndroid.SHORT);
  }

  const ctr = useRef(0);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [permissionResponse, requestPermissionMedia] = MediaLibrary.usePermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {

    return (
      <View style={styles.container}>
        <View style={styles.containter1}><Button onPress={requestPermission} title="grant permission" /></View>
        <Text style={styles.text1}>We need your permission to show the camera</Text> 
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleTakePhoto =  async () => {
    if (cameraRef.current) {
        const options = {
            quality: 1,
            base64: true,
            exif: false,
        };
        const Photo = await cameraRef.current.takePictureAsync(options);
        setPhoto(Photo);
    }
  }; 

  const handleDownloadPhoto = async () => {
    if (!photo) {
      alert("No photo to save.");
      return;
    }
  
    if (!permissionResponse || permissionResponse.status !== 'granted') {
      const newPermission = await requestPermissionMedia();
      if (newPermission.status !== 'granted') {
        showNotSavedToast();
        return;
      }
    }
  
    try {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      showSaveToast();
      setPhoto(null);
    } catch (error) {
      showErrorToast();
    }
  };

  const handleRetakePhoto = () =>
  {
    showRetakeToast ();
    setPhoto(null);
  };

  if (photo) return <PhotoPreviewSection photo={photo} handleRetakePhoto={handleRetakePhoto} handleDownloadPhoto={handleDownloadPhoto} />

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <FontAwesome name= 'refresh' size={30} color='black' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <FontAwesome name='camera' size={30} color='black' />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  containter1: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  text1: {
    fontSize: 13,
    color: 'black',
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center', 
  }
});