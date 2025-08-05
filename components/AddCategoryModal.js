import { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

export default function AddCategoryModal({ visible, onAddCategory, onClose, categories }) {
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        const trimmed = newCategory.trim();

        if (!trimmed) {
            Alert.alert('Invalid input', 'Category name cannot be empty.');
            return;
        }

        if (categories.includes(trimmed)) {
            Alert.alert('Duplicate', 'Category already exists.');
            return;
        }

        onAddCategory(trimmed);
        setNewCategory('');
    };

    const handleClose = () => {
        setNewCategory('');
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add New Category</Text>
                    <TextInput
                        placeholder="Category Name"
                        value={newCategory}
                        onChangeText={setNewCategory}
                        style={styles.modalInput}
                    />
                    <Button title="Save" onPress={handleAddCategory} />
                    <View style={{ marginTop: 10 }}>
                        <Button title="Cancel" color="gray" onPress={handleClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
});