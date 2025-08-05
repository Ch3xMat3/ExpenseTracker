import { useState, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Alert, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseFilters from '../components/ExpenseFilters';

export default function ExpensesScreen ({ navigation, expenses, onDeleteExpense, categories }) {
    const [filterVisible, setFilterVisible] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    // Sort all expenses by date (newest first) on load or when expenses change
    useEffect(() => {
        const sortedExpenses = [...expenses].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
        setFilteredExpenses(sortedExpenses);
    }, [expenses]);

    // Set header with filter icon
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setFilterVisible(true)} style={{ marginRight: 10 }}>
                    <MaterialIcons name="filter-list" size={24} color="#000" />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    // Confirm before deleting an expense
    const confirmDelete = (id) => {
        Alert.alert('Delete Expense', 'Are you sure you want to delete this expense?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => onDeleteExpense(id) },
        ]);
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

    return (
        <View style={styles.container}>
            <ExpenseFilters
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                categories={categories}
                onApplyFilters={({ selectedCategory, startDate, endDate, exactDate }) => {
                    const normalizeDate = (date) => {
                        const d = new Date(date);
                        d.setHours(0, 0, 0, 0);
                        return d;
                    };

                    const filtered = expenses.filter((expense) => {
                        const expenseDate = normalizeDate(expense.date);
                        
                        let matchesExactDate = true;
                        if (exactDate) {
                            matchesExactDate = expenseDate.getTime() === normalizeDate(exactDate).getTime();
                        }

                        const matchesCategory = selectedCategory
                            ? expense.category === selectedCategory
                            : true;

                        const matchesStart = startDate 
                            ? expenseDate.getTime() >= normalizeDate(startDate).getTime()
                            : true;

                        const matchesEnd = endDate
                            ? expenseDate.getTime() <= normalizeDate(endDate).getTime()
                            : true;

                        const dateMatches = exactDate ? matchesExactDate : (matchesStart && matchesEnd);

                        return matchesCategory && dateMatches;
                    });

                    // Sort filtered list from newest to oldest
                    const sorted = [...filtered].sort(
                        (a, b) => new Date(b.date) - new Date(a.date)
                    );

                    setFilteredExpenses(sorted);
                    setFilterVisible(false);
                }}
            />

            {filteredExpenses.length === 0 ? (
                <Text style={styles.noExpensesText}>No Expenses Found.</Text>
            ) : (
                <FlatList
                    data={filteredExpenses}
                    keyExtractor={(item) => item.id}
                    renderItem={renderExpenseItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    noExpensesText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});