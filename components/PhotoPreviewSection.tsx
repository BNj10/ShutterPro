import { FontAwesome } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React from 'react'
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View, Alert } from 'react-native';

const PhotoPreviewSection = ({
    photo,
    handleRetakePhoto,
    handleDownloadPhoto,
}: {
    photo: CameraCapturedPicture;
    handleRetakePhoto: () => void;
    handleDownloadPhoto: () => void;
}) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Image
                style={styles.previewContainer}
                source={{uri: 'data:image/jpg;base64,' + photo.base64}}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                <FontAwesome name='trash' size={30} color='black' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDownloadPhoto}>
                <FontAwesome name='download' size={30} color='black' />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 15,
        padding: 1,
        width: '95%',
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        alignItems: "center",
    },
    previewContainer: {
        width: '95%',
        height: '80%',
        borderRadius: 15
    },
    buttonContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: "space-around",
        width: '100%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'gray',
        borderRadius: 10,
        padding: 20,
        paddingHorizontal: 50,
    }

});

export default PhotoPreviewSection;