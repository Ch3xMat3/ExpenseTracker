import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ExpenseInput from './components/ExpenseInput';
import ExpenseItem from './components/ExpenseItem';

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (expenseText) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { id: Math.random().toString(), value: expenseText }
    ]);
  };

  return (
    <View style={styles.container}>
      <ExpenseInput onAddExpense={addExpenseHandler} />
      <FlatList
        data={expenses}
        rednerItem={(itemData) => (
          <ExpenseItem title={itemData.item.value} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: '#fff'
  }
});