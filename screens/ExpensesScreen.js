import { useState, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import ExpenseItem from '../components/ExpenseItem';
import ExpenseFilters from '../components/ExpenseFilters';
import MenuModal from '../components/MenuModal';
import { showToast } from '../utils/showToast';

export default function ExpensesScreen ({ navigation, expenses, onDeleteExpense, categories }) {
    const [filterVisible, setFilterVisible] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);

    // Helper to get category object by name
    const getCategoryObject = (name) => categories.find((cat) => cat.name === name);

    // Sort all expenses by date (newest first) on load or when expenses change
    useEffect(() => {
        const sortedExpenses = [...expenses].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
        setFilteredExpenses(sortedExpenses);
    }, [expenses]);

    // helper function for toast or alert
    const handleExportPress = async () => {
        try {
            // Convert expenses to CSV format
            const csvHeader = 'Date,Category,Description,Amount\n';
            const csvRows = filteredExpenses.map(exp => {
                const date = new Date(exp.date).toLocaleDateString();
                return `"${date}","${exp.category}","${exp.description}",${exp.amount}`;
            });
            const csvString = csvHeader + csvRows.join('\n');

            // Create file path
            const fileUri = FileSystem.documentDirectory + 'expenses_export.csv';

            // Write CSV to file
            await FileSystem.writeAsStringAsync(fileUri, csvString, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            // Open share dialog
            await Sharing.shareAsync(fileUri, {
                mimeType: 'text/csv',
                dialogTitle: 'Export Expenses CSV',
                UTI: 'public.comma-separated-values-text',
            });

            // Show success alert after sharing
            showToast('Export succcessful! File saved on your device.');
        } catch (error) {
            showToast('Error exporting CSV: ' + error.message);
        }
    }

    // Set header with filter icon
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', gap: 15, marginRight: 10 }}>
                    <TouchableOpacity onPress={handleExportPress} style={{ marginHorizontal: 8 }}>
                        <Ionicons name="download-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilterVisible(true)} style={{ marginHorizontal: 8 }}>
                        <MaterialIcons name="filter-alt" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginHorizontal: 8 }}>
                        <Ionicons name="menu" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, handleExportPress]);

    // Confirm before deleting an expense
    const confirmDelete = (id) => {
        Alert.alert('Delete Expense', 'Are you sure you want to delete this expense?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => onDeleteExpense(id) },
        ]);
    };

    const renderExpenseItem = ({ item }) => {
        const categoryObj = getCategoryObject(item.category);
        return (
            <ExpenseItem
                description={item.description}
                date={item.date}
                amount={item.amount}
                category={categoryObj?.name || item.category}
                onDelete={() => confirmDelete(item.id)}
            />
        );
    };

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

            <MenuModal
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                navigation={navigation}
            />
        </View>
    );
}

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