import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

export const VideoPlayer = () => {
  const [videoUri, setVideoUri] = useState(null);
  
  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setVideoUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Video" onPress={pickVideo} />
      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      )}
    </View>
  );
}

const styles =StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 60,
  },
  video: {
    width: 320,
    height: 200,
    marginTop: 20,
  }
});