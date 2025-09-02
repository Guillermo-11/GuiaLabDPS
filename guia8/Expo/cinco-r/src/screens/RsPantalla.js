import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const rsData = [
  { id: '1', title: 'Rechazar', icon: 'cancel', desc: 'Evitar productos que generan residuos innecesarios.' },
  { id: '2', title: 'Reducir', icon: 'arrow-down-bold', desc: 'Minimizar el consumo y el desperdicio.' },
  { id: '3', title: 'Reutilizar', icon: 'refresh', desc: 'Dar una segunda vida a los objetos.' },
  { id: '4', title: 'Reciclar', icon: 'recycle', desc: 'Transformar residuos en nuevos productos.' },
  { id: '5', title: 'Recuperar', icon: 'factory', desc: 'Aprovechar materiales para generar energía u otros usos.' },
];

const RsScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedItem(item)}>
      <Icon name={item.icon} size={40} color="#2E7D32" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      {/* Modal */}
      <Modal visible={!!selectedItem} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Icon name={selectedItem.icon} size={60} color="#2E7D32" />
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedItem(null)}>
                  <Text style={styles.closeText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F8E9' },
  list: { padding: 10 },
  card: {
    flex: 1,
    backgroundColor: '#C8E6C9',
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20', marginTop: 10 },
  desc: { fontSize: 14, textAlign: 'center', color: '#2E7D32', marginTop: 6 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B5E20', marginVertical: 10 },
  modalDesc: { fontSize: 16, color: '#2E7D32', textAlign: 'center' },
  closeButton: { marginTop: 20, backgroundColor: '#81C784', padding: 10, borderRadius: 8 },
  closeText: { color: '#fff', fontWeight: 'bold' },
});

export default RsScreen;