import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseItem() {
    return (
        <View style={styles.container}>
            <Text>Expense Item</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
});