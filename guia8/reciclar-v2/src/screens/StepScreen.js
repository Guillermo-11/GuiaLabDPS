import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const StepScreen = ({ step, description, image, onNextStep }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>Paso {step}</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.descriptionText}>{description}</Text>
      <Button title="Siguiente" onPress={onNextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  stepText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  descriptionText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 15,
    resizeMode: 'contain'
  }
});

export default StepScreen;
