import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import ExpenseItem from '../components/ExpenseItem';

export default function ExpensesScreen({ expenses, onDeleteExpense }) {
    // Confirm before deleting an expense
    const confirmDelete = (id) => {
        Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => onDeleteExpense(id) },
            ]
        );
    };

    const renderExpenseItem = ({ item }) => (
        <ExpenseItem
            description={item.description}
            date={item.date}
            amount={item.amount}
            category={item.category}
            onDelete={() => confirmDelete(item.id)}
        />
    );
    
    if (expenses.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Expenses found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={renderExpenseItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
});