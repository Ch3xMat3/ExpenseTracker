import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ExpenseInput from './components/ExpenseInput';
import ExpenseItem from './components/ExpenseItem';

export default function App() {
  const [expenses, setExpenses] = useState([]);

  // Load expenses from AsyncStorage on app startup
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem('expenses');
        if (storedExpenses !== null) {
          const parsedExpenses = JSON.parse(storedExpenses);
          setExpenses(parsedExpenses);
          console.log('Loaded expenses:', parsedExpenses); // Debug log
        }
      } catch (error) {
        console.error('Failed to load expenses:', error);
      }
    };

    loadExpenses();
  }, []);

  // Save expenses to AsyncStorage whenever they change
  useEffect(() => {
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
      } catch (error) {
        console.error('Failed to save expenses:', error);
      }
    };

    saveExpenses();
  }, [expenses]);

  const addExpenseHandler = async (expense) => {
    const newExpense = { id: Math.random().toString(), ...expense };

    setExpenses((currentExpenses) => {
      const updatedExpenses = [...currentExpenses, newExpense];
      AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  };

  const deleteExpenseHandler = (id) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense tracker App!</Text>
      <ExpenseInput 
        onAddExpense={addExpenseHandler}
      />
      <FlatList
        data={expenses}
        renderItem={(itemData) => (
          <ExpenseItem 
            id={itemData.item.id}
            description={itemData.item.description}
            amount={itemData.item.amount}
            category={itemData.item.category}
            onDelete={deleteExpenseHandler}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});