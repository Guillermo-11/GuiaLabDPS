import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'react-id-generator';
import { Picker } from '@react-native-picker/picker';

const Formulario = ({reservaciones, setReservaciones, setMostrarForm, guardarReservacionesStorage}) => {
  const [cliente, setCliente] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [numPersonas, setNumPersonas] = useState('');
  const [area, setArea] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const mostrarDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const ocultarDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    setFecha(date.toLocaleDateString('es-ES', opciones));
    ocultarDatePicker();
  }

  const mostrarTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const ocultarTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = hora => {
    const opciones = { hour: 'numeric', minute: '2-digit', hour12: false };
    setHora(hora.toLocaleString('es-ES', opciones));
    ocultarTimePicker();
  };
  
  const crearNuevaReservacion = () => {
    if (cliente.trim() === '' || fecha.trim() === '' || hora.trim() === '' || numPersonas.trim() === '' || area.trim() === '') {
      mostrarAlerta('Error', 'Todos los campos son obligatorios');
      return;
    }

    const reservacion = { cliente, fecha, hora, numPersonas, area };
    reservacion.id = shortid.generate();

    const newReservacion = [...reservaciones, reservacion];
    setReservaciones(newReservacion);
    guardarReservacionesStorage(JSON.stringify(newReservacion));

    setMostrarForm(false);

    setCliente('');
    setFecha('');
    setHora('');
    setNumPersonas('');
    setArea('');
  }

  const mostrarAlerta = (titulo, mensaje) => {
    Alert.alert(
      titulo,
      mensaje,
      [
        { text: 'OK' }
      ]
    )
  };

  return(
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Cliente:</Text>
          <TextInput style={styles.input} onChangeText={ texto => setCliente(texto) } />
        </View>

        <View>
          <Text style={styles.label}>Fecha: </Text>
          <Button title='Seleccionar Fecha' onPress={mostrarDatePicker} />
          <DateTimePickerModal isVisible={isDatePickerVisible} mode='date' onConfirm={confirmarFecha} onCancel={ocultarDatePicker} locale='es_ES' headerTextIOS='Elige La Fecha' cancelTextIOS='Cancelar' confirmTextIOS='Confirmar' />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title='Seleccionar Hora' onPress={mostrarTimePicker} />
          <DateTimePickerModal isVisible={isTimePickerVisible} mode='time' onConfirm={confirmarHora} onCancel={ocultarTimePicker} locale='es_ES' headerTextIOS='Elige La Hora' cancelTextIOS='Cancelar' confirmTextIOS='Confirmar' />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Número de Personas</Text>
          <TextInput style={styles.input} keyboardType="numeric" onChangeText={ texto => setNumPersonas(texto) } />
        </View>

        <View>
          <Text style={styles.label}>Sección:</Text>
          <Picker selectedValue={area} style={styles.input} onValueChange={itemValue => setArea(itemValue)} >
            <Picker.Item label='Fumadores' value='Fumadores' />
            <Picker.Item label='No Fumadores' value='No Fumadores' />
          </Picker>
        </View>

        <View>
          <TouchableHighlight onPress={ () => crearNuevaReservacion() } style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Crear Nueva Reservación</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#A0C9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
  },
  input: {
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: '#377BA6',
    color: '#FFF',
    cursorColor: '#FFF'
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#215BA6',
    marginVertical: 20,
    borderRadius: 10
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  }
});


export default Formulario;