import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseItem({ description, amount }) {
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.text}>${amount.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 16,
        backgroundColor: '#f5f5f5',
        borderWidth: 2,
        borderRadius: 6,
    },
    text: {
        fontSize: 16,
    },
});