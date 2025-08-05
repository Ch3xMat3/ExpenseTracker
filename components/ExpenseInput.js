import { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Pressable, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ExpenseInput({ onAddExpense, categories }) {
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
  const [selectedDate, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Sync selectedCategory when categories change
  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0] || '');
    }
  }, [categories]);

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
      date: selectedDate,
    });

    // Clear inputs
    setEnteredDescription('');
    setEnteredAmount('');
    setSelectedCategory(categories[0] || '');
  };

  const onChangeDate = (event, pickedDate) => {
    const currentDate = pickedDate || selectedDate;
    setShowDatePicker(Platform.OS === 'ios'); // For iOS use
    setDate(currentDate);
  }

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
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Date:</Text>
        <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.dateText}>
              {selectedDate.toLocaleDateString()}
            </Text>
            <MaterialIcons name="calendar-today" size={20} color="#888" />
          </View>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
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
    backgroundColor: '#fff',
  },
  picker: {
    height: 55,
  },
  dateContainer: {
    marginvertical: 12,
  },
  dateLabel: {
    fontsize: 16,
    marginBottom: 4,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});
