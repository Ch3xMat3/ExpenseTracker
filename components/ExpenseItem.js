import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

export default function ExpenseItem({ id, description, amount, onDelete }) {
    const confirmDelete = () => {
        Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => onDelete(id),
                }
            ]
        );
    };
    
    return (
        <Pressable onLongPress={confirmDelete}>
            <View style={styles.item}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.amount}>${amount.toFixed(2)}</Text>
            </View>
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eee',
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 20,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        fontSize: 16,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});