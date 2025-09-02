import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const messages = [
  { title: 'Rechazar', desc: 'Evitar productos que generan residuos innecesarios.' },
  { title: 'Reducir', desc: 'Minimizar el consumo y el desperdicio.' },
  { title: 'Reutilizar', desc: 'Dar una segunda vida a los objetos.' },
  { title: 'Reciclar', desc: 'Transformar residuos en nuevos productos.' },
  { title: 'Recuperar', desc: 'Aprovechar materiales para generar energía u otros usos.' },
];

const PantallaCarga = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (index < messages.length) {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.delay(500),
        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start(() => setIndex(index + 1));
    } else {
      navigation.replace('RsScreen');
    }
  }, [index]);

  return (
    <View style={styles.container}>
      {index < messages.length && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>{messages[index].title}</Text>
          <Text style={styles.desc}>{messages[index].desc}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    color: '#388E3C',
    textAlign: 'center',
  },
});

export default PantallaCarga;