import { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ExpenseInput({ onAddExpense }) {
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState ([
    'Food', 'Travel', 'Utilities', 'Shopping'
  ]);

  const addExpenseHandler = () => {
    const amountNumber = parseFloat(enteredAmount);

    if (!enteredDescription.trim() || isNaN(amountNumber) || amountNumber <= 0) {
        Alert.alert('Invalid input', 'Please enter a valid description and amount.');
        return;
    }

    onAddExpense({
      description: enteredDescription,
      amount: amountNumber,
      category: selectedCategory,
    });

    // Clear inputs
    setEnteredDescription('');
    setEnteredAmount('');
    setSelectedCategory('Food');
  };

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

    setCategories((prev) => [...prev, trimmed]);
    setNewCategory('');
    setModalVisible(false);
    setSelectedCategory(trimmed);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={enteredDescription}
        onChangeText={setEnteredDescription}
      />
      <TextInput
        placeholder="Amount"
        style={styles.input}
        keyboardType="decimal-pad"
        value={enteredAmount}
        onChangeText={setEnteredAmount}
      />
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
        >
            {categories.map((cat) => (
                <Picker.Item label={cat} value={cat} key={cat} />
            ))}
        </Picker>
      </View>
      <View style={{ marginBottom: 12 }}>
        <Button title="Add New Category" onPress={() => setModalVisible(true)} />
      </View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add New Category</Text>
                    <TextInput
                        placeholder="Category name"
                        value={newCategory}
                        onChangeText={setNewCategory}
                        style={styles.modalInput}
                    />
                    <Button title="Save" onPress={handleAddCategory} />
                    <View style={{ marginTop: 10 }}>
                        <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </View>
      </Modal>      
      <Button title="Add Expense" onPress={addExpenseHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc', // light gray border
    borderRadius: 8,
    overflow: 'hidden', // important for rounded corners on android
    marginBottom: 10,
  },
  picker: {
    height: 55,
  },
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
