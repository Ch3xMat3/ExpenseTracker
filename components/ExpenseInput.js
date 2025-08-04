import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ExpenseInput() {
    return (
        <View style={styles.container}>
            <Text>Expense Input</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
});