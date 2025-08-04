import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert} from 'react-native';

export default function ExpenseInput({ onAddExpense }) {
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');

    const descriptionInputHandler = (text) => {
        setEnteredDescription(text);
    };

    const amountInputHandler = (text) => {
        setEnteredAmount(text);
    };

    const addExpenseHandler = () => {
        const amountNumber = parseFloat(enteredAmount);

        if (!enteredDescription.trim() || isNaN(amountNumber) || amountNumber <= 0) {
            Alert.alert('Invalid input', 'Please enter a valid description and amount.');
            return;
        }

        onAddExpense({ description: enteredDescription, amount: amountNumber });

        // Clear inputs
        setEnteredDescription('');
        setEnteredAmount('');
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Description"
                style={styles.input}
                onChangeText={descriptionInputHandler}
                value={enteredDescription}
            />
            <TextInput
                placeholder="Amount"
                style={styles.input}
                keyboardType="decimal-pad"
                onChangeText={amountInputHandler}
                value={enteredAmount}
            />
            <Button title="Add Expense" onPress={addExpenseHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        margin: 20,
    },
    input: {
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingVertical: 6,
        paddingHorizontal: 2,
    },
});