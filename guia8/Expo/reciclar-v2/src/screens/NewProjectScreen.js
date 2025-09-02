import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewProjectScreen ({ navigation }) {
  const [name, setName] = useState('');
  const [manager, setManager] = useState('');
  const [contact, setContact] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const saveProject = async () => {
    try {
      const newProject = { name, manager, contact, socialMedia: socialMedia.split(',') };
      const storedProjects = await AsyncStorage.getItem('projects');
      const projects = storedProjects ? JSON.parse(storedProjects) : [];
      projects.push(newProject);
      await AsyncStorage.setItem('projects', JSON.stringify(projects));
      navigation.navigate('Projects');
    } catch (error) {
      console.log('Error saving project', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscripción de Proyecto</Text>
      <TextInput placeholder="Nombre del Proyecto" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Encargado" value={manager} onChangeText={setManager} style={styles.input} />
      <TextInput placeholder="Contacto" value={contact} onChangeText={setContact} style={styles.input} />
      <TextInput placeholder="Redes Sociales (separadas por coma)" value={socialMedia} onChangeText={setSocialMedia} style={styles.input} />
      <Button title="Guardar Proyecto" onPress={saveProject} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
});
