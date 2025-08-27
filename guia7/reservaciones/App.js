import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform, Touchable } from 'react-native';
import Reservacion from './componentes/Reservacion';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [reservaciones, setReservaciones] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerReservacionesStorage = async () => {
      try {
        const reservacionesStorage = await AsyncStorage.getItem('reservaciones');
        if (reservacionesStorage)
          setReservaciones(JSON.parse(reservacionesStorage));
      } catch (error) {
        console.log(error);
      }
    }
    
    obtenerReservacionesStorage();
  }, []);

  //Eliminar los clientes del State
  const eliminarCliente = id => {
    const reservacionesFiltradas = reservaciones.filter(reservacion => reservacion.id !== id);
    setReservaciones(reservacionesFiltradas);
    guardarReservacionesStorage(JSON.stringify(reservacionesFiltradas));
  }

  //Muestra u Oculta el formulario
  const mostrarFormulario = () => {
    setMostrarForm(!mostrarForm);
  }

  //Ocultar el Teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  const guardarReservacionesStorage = async (reservacionesJSON) => {
    try {
      await AsyncStorage.setItem('reservaciones', reservacionesJSON);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Administrador de Reservaciones</Text>
        <View>
          <TouchableHighlight style={styles.btnMostrarForm} onPress={() => mostrarFormulario()}>
            <Text style={styles.textoMostrarForm}> {mostrarForm ? 'Cancelar Crear Reservación' : 'Crear Reservación Nueva'}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Una Nueva Reservación</Text>
              <Formulario reservaciones={reservaciones} setReservaciones={setReservaciones} guardarReservacionesStorage={guardarReservacionesStorage} setMostrarForm={setMostrarForm} />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>{reservaciones.length > 0 ? 'Administra tus reservaciones.' : 'No hay reservaciones... Agrega una.'}</Text>
              <FlatList style={styles.listado} data={reservaciones} renderItem={ ({item}) => <Reservacion item={item} eliminarCliente={eliminarCliente} /> } keyExtractor={ reservacion => reservacion.id } />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#144E73',
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#A0C9D9',
    marginVertical: 10,
  },
  textoMostrarForm: {
    // color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});