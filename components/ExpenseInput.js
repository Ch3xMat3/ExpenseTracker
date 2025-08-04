import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ExpenseInput({ onAddExpense }) {
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');

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
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Travel" value="Travel" />
            <Picker.Item label="Utilities" value="Utilities" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
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
});
