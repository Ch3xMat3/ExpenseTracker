import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExpenseItem({ description, date, amount, category, onDelete }) {
    const formattedDate = new Date(date).toLocaleDateString();

    return (
        <Pressable onLongPress={onDelete}>
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
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </Pressable>
    );
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
    dateContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginLeft: 8,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
});