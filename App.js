import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  // Estados para el nombre del cliente, fecha de reserva, lista de clientes, y visibilidad del modal
  const [nombre, setNombre] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [cantidadP, setCantidadP] = useState('');
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Estados para el datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Función para cambiar la fecha seleccionada en el datetimepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Si no se selecciona ninguna fecha, se mantiene la actual
    setShow(false); // Oculta el datetimepicker
    setFechaReserva(currentDate); // Establece la fecha de reserva seleccionada en el estado
  };

  // Función para mostrar el datetimepicker con el modo especificado (date o time)
  const showMode = (currentMode) => {
    setShow(true); // Muestra el datetimepicker
    setMode(currentMode); // Establece el modo del datetimepicker
  };

  // Función para mostrar el datetimepicker en modo fecha
  const showDatepicker = () => {
    showMode('date');
  };

  // Función para agregar un nuevo cliente
  const agregarCliente = () => {
    // Genera un nuevo cliente con un ID único (incrementa el último ID generado)
    const nuevoCliente = { id: clientes.length + 1, nombre: nombre, fechaReserva: fechaReserva, cantidadP: cantidadP };
    // Agrega el nuevo cliente a la lista de clientes
    setClientes([...clientes, nuevoCliente]);
    // Limpia los campos de entrada
    setNombre('');
    setCantidadP('');
    setFechaReserva(new Date());
    // Oculta el modal de agregar cliente
    setModalVisible(false);
  };

  // Función para eliminar un cliente
  const eliminarCliente = (id) => {
    // Filtra la lista de clientes para excluir el cliente con el ID dado
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal de agregar cliente */}
      <Button title="Agregar Cliente" onPress={() => setModalVisible(true)} />
      {/* Modal de agregar cliente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de entrada para el nombre del cliente */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del Cliente"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad de personas"
              value={cantidadP}
              onChangeText={setCantidadP}
            />

            {/* Botón para mostrar el datetimepicker */}
            <TouchableOpacity onPress={showDatepicker}><Text style={styles.Fecha}>Seleccionar fecha de Reserva</Text></TouchableOpacity>
            {/* Muestra la fecha seleccionada */}
            <Text>selected: {fechaReserva.toLocaleString()}</Text>
            {/* Muestra el datetimepicker si la variable show es verdadera */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES' // Establece el idioma del datetimepicker a español
              />
            )}
            {/* Botón para agregar el cliente */}
            <Button title="Agregar Cliente" onPress={agregarCliente} />
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      {/* Lista de clientes */}
      <FlatList
        data={clientes}
        renderItem={({ item }) => (
          <View style={styles.clienteItem}>
            {/* Información del cliente */}
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                // Aquí puede ir alguna otra acción como mostrar detalles del cliente
                console.log('Detalles del cliente', item);
              }}
            >
              <Text style={styles.clienteNombre}>{item.id}</Text>
              <Text style={styles.clienteNombre}>{item.nombre}</Text>
              <Text style={styles.clienteCantidad}>
                Cantidad de personas: {item.cantidadP}
              </Text>
              <Text style={styles.clienteFecha}>
                Fecha de Reserva: {item.fechaReserva.toDateString()}
              </Text>
            </TouchableOpacity>

            {/* Botón para eliminar cliente */}
            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={() => eliminarCliente(item.id)} x
            >
              <Text style={styles.textoBotonEliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  clienteItem: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clienteNombre: {
    fontSize: 18,
    color: '#333',
  },
  clienteFecha: {
    fontSize: 16,
    padding: 5,
    color: '#666',
  },
  botonEliminar: {
    padding: 10,
    backgroundColor: '#BE4200',
    borderRadius: 5,
  },
  textoBotonEliminar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Fecha: {
    padding: 10,
    fontSize: 15,
    color: '#0085E1',
  }

});

export default App;
