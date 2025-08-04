import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ExpenseItem({ title }) {
    return (
        <View style={styles.item}>
            <Text>{title}</Text>
        </View>
    );
}

export default ExpenseItem;

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#e0e0e0',
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 6,
    },
});