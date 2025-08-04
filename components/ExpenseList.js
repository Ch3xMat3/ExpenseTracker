import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseList() {
    return (
        <View style={styles.container}>
            <Text>Expense List</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
});