import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ExpenseInput from './components/ExpenseInput';
import ExpensesScreen from './screens/ExpensesScreen';
import AddCategoryModal from './components/AddCategoryModal';

const Stack = createNativeStackNavigator();

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState(['Food', 'Travel', 'Utilities', 'Shopping']);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  // Load expenses from AsyncStorage on app startup
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem('expenses');
        if (storedExpenses) setExpenses(JSON.parse(storedExpenses));

        const storedCategories = await AsyncStorage.getItem('categories');
        if (storedCategories) setCategories(JSON.parse(storedCategories));
      } catch (error) {
        console.error('Failed to load expenses:', error);
      }
    };

    loadData();
  }, []);

  // Save expenses when changed
  useEffect(() => {
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
      } catch (error) {
        console.error('Failed to save expenses', error);
      }
    };

    saveExpenses();
  }, [expenses]);

  // Save categories when changed
  useEffect(() => {
    const saveCategories = async () => {
      try {
        await AsyncStorage.setItem('categories', JSON.stringify(categories));
      } catch (error) {
        console.error('Failed to save categories', error);
      }
    };
    
    saveCategories();
  }, [categories]);

  // Add expense
  const addExpenseHandler = (expense) => {
    const newExpense = { id: Math.random().toString(), ...expense };
    setExpenses((currentExpenses) => [...currentExpenses, newExpense]);
  };

  // Delete expense
  const deleteExpenseHandler = (id) => {
    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id));
  };

  // Add category
  const addCategoryHandler = (newCategory) => {
    setCategories((currentCategories) => [...currentCategories, newCategory]);
    setIsCategoryModalVisible(false);
  };

  // Screen to add expenses, categories, and open category modal
  function AddExpenseScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Expense tracker App!</Text>
        <ExpenseInput
          onAddExpense={addExpenseHandler}
          categories={categories}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Add New Category"
            onPress={() => setIsCategoryModalVisible(true)}
          />
        </View>
        <AddCategoryModal
          visible={isCategoryModalVisible}
          onAddCategory={addCategoryHandler}
          onClose={() => setIsCategoryModalVisible(false)}
          categories={categories}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="View Expenses"
            onPress={() => navigation.navigate('ExpensesList')}
          />
        </View>
      </View>
    );
  }

  // Screen to display the list of expenses
  function ExpensesListScreen() {
    return (
      <ExpensesScreen
        expenses={expenses}
        onDeleteExpense={deleteExpenseHandler}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{ title: 'Add Expense' }}
        />
        <Stack.Screen
          name="ExpensesList"
          component={ExpensesListScreen}
          options={{ title: 'Expenses List' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  buttonContainer: {
    width: '60%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});