import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExpenseItem({ id, description, amount, category, onDelete }) {
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
            <View style={styles.card}>
                <MaterialIcons 
                    name="attach-money" 
                    size={24} 
                    color="#4caf50"
                    style={styles.icon}
                />
                <View style={styles.details}>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                    <Text style={styles.category}>Category: {category}</Text>
                </View>
            </View>
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 12,
        elevation: 4, // for Android shado
        shadowColor: 'rgba(0, 0, 0, 1.0)', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    icon: {
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    description: {
        fontSize: 16,
        fontWeight: '600',
    },
    amount: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    category: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
});