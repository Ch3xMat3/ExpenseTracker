import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import ExpenseInput from './components/ExpenseInput';
import ExpenseItem from './components/ExpenseItem';

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (expense) => {
    const newExpense = { id: Math.random().toString(), ...expense };

    setExpenses((currentExpenses) => {
      const updatedExpenses = [...currentExpenses, newExpense];
      console.log('Updated Expenses:', updatedExpenses);
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
      <ExpenseInput onAddExpense={addExpenseHandler} />
      <FlatList
        data={expenses}
        renderItem={(itemData) => (
          <ExpenseItem 
            id={itemData.item.id}
            description={itemData.item.description}
            amount={itemData.item.amount} 
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