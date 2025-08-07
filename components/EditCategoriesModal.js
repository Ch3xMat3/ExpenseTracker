import React from 'react';
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function EditCategoriesModal({ visible, onClose, categories }) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Edit Categories</Text>
                    
                    {/* Scrollable list */}
                    <View style={styles.listContainer}>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.name}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={styles.listContent}
                            renderItem={({ item }) => (
                                <View style={styles.categoryItem}>
                                    <Text style={styles.categoryText}>{item.name}</Text>
                                    <View style={[styles.colorCircle, { backgroundColor: item.color }]} />
                                </View>
                            )}
                        />
                    </View>

                    <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // dimmed background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '85%',
    height: '60%', // fixed height
    borderRadius: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 0, // leave space for cancel button
    justifyContent: 'flex-start',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'center',
  },
  listContainer: {
    flex: 1,
    marginBottom: 60, // space below list to avoid overlap with cancel button
  },
  listContent: {
    paddingBottom: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
