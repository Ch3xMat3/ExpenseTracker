import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
                <MaterialIcons 
                    name="attach-money" 
                    size={24} 
                    color="#4caf50"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f1f1f1',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: 14,
        color: '#555',
    },
});