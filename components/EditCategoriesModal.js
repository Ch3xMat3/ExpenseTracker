import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

import CategoryColorPickerModal from './CategoryColorPickerModal';

const EditCategoriesModal = ({ visible, categories, onClose, onSaveUpdatedCategories }) => {
    const [editedCategories, setEditedCategories] = useState([...categories]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showColorPicker, setShowColorPicker] = useState(false);

    useEffect(() => {
        setEditedCategories([...categories]);
    }, [categories, visible]);

    const openColorPicker = (category) => {
        setSelectedCategory(category);
        setShowColorPicker(true);
    };

    const handleColorChange = (newColor) => {
        setEditedCategories(prev =>
            prev.map(cat =>
                cat.name === selectedCategory.name ? { ...cat, color: newColor } : cat
            )
        );
        setShowColorPicker(false);
    };

    const handleSave = () => {
        const colorSet = new Set(editedCategories.map(cat => cat.color));
        if (colorSet.size !== editedCategories.length) {
            Alert.alert("Validation Error", "All categories must have unique colors.");
            return;
        }

        onSaveUpdatedCategories(editedCategories);
        onClose();
    }

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.categoryName}>{item.name}</Text>

            <TouchableOpacity
                style={[styles.colorBox, { backgroundColor: item.color }]}
                onPress={() => openColorPicker(item)}
            />
        </View>
    );

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Edit Categories</Text>
                    
                    {/* Scrollable list */}
                    <View style={styles.listContainer}>
                        <FlatList
                            data={editedCategories}
                            keyExtractor={(item) => item.name}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            renderItem={renderItem}
                        />
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <CategoryColorPickerModal
                    visible={showColorPicker}
                    defaultColor={selectedCategory?.color || '#ffffff'}
                    onClose={() => setShowColorPicker(false)}
                    onSelectColor={handleColorChange}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        height: 400,       // fixed height
        flexDirection: 'column',
        flexShrink: 1,     // prevents growing beyond fixed height
        overflow: 'hidden' // clips overflowing children
    },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  listContainer: {
  flex: 1,           // fills remaining space inside modalContainer
  marginBottom: 10,
},
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  categoryName: {
    fontSize: 16,
  },
  colorBox: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  buttonRow: {
    flexDirection: 'row',       
    justifyContent: 'space-between', 
  },
  button: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF4D4D',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditCategoriesModal;