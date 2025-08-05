import { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ExpenseItem from '../components/ExpenseItem';

export default function ExpensesScreen({ expenses, onDeleteExpense }) {
    const [selectedCategory, setSelectedCategory] = useState('');

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

    // Sort expenses by date (most recent first)
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    const displayedExpenses = selectedCategory
        ? sortedExpenses.filter(exp => exp.category === selectedCategory)
        : sortedExpenses;

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
            <Text style={styles.filterLabel}>Filter by Category:</Text>
            <View style={styles.dropdownWrapper}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}
                    style={styles.picker}
                    dropdownIconColor="#555"
                >
                    <Picker.Item label="All" value="" />
                    {[...new Set(expenses.map(e => e.category))].map((cat) => (
                        <Picker.Item key={cat} label={cat} value={cat} />
                    ))}
                </Picker>
            </View>
            <FlatList
                data={displayedExpenses}
                keyExtractor={(item, index) => index.toString()}
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
    pickerContainer: {
        marginHorizontal: 16,
        marginBottom: 12,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    dropdownWrapper: {
        borderWidth: 1,
        borderColor: '#ccc', // light gray border
        borderRadius: 8,
        overflow: 'hidden', // important for rounded corners on android
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    picker: {
        height: 55,
        width: '100%',
        paddingHorizontal: 8,
    },
});