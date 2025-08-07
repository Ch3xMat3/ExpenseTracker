import { useState, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ExpenseInput from './components/ExpenseInput';
import ExpensesScreen from './screens/ExpensesScreen';
import GraphsScreen from './screens/GraphsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddCategoryModal from './components/AddCategoryModal';
import MenuModal from './components/MenuModal';

const Stack = createNativeStackNavigator();

const resetCategories = async () => {
  const defaultCategories = [
    { name: 'Food', color: '#FF6384' },
    { name: 'Travel', color: '#36A2EB' },
    { name: 'Utilities', color: '#FFCE56' },
    { name: 'Shopping', color: '#4BC0C0' },
  ];
  try {
    await AsyncStorage.setItem('categories', JSON.stringify(defaultCategories));
    alert('Categories reset to default!');
  } catch (error) {
    console.error('Failed to reset categories', error);
  }
};

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    { name: 'Food', color: '#FF6384' }, 
    { name: 'Utilities', color: '#36A2EB' }, 
    { name: 'Travel', color: '#FFCE56' }, 
    { name: 'Shopping', color: '#8AFFC1' }
  ]);

  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // Load expenses from AsyncStorage on app startup
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem('expenses');
        if (storedExpenses) setExpenses(JSON.parse(storedExpenses));

        const storedCategories = await AsyncStorage.getItem('categories');
        if (storedCategories) {
          const parsed = JSON.parse(storedCategories);
          // Ensure that the stored categories are in object format
          const isValid = parsed.every(cat => typeof cat === 'object' && cat.name && cat.color);
          if (isValid) {
            setCategories(parsed);
          } else {
            // fallback: convert old format to new format
            const converted = parsed.map(name => ({
              name,
              color: generateUniqueColor([]),
            }));
            setCategories(converted);
            await AsyncStorage.setItem('categories', JSON.stringify(converted));
          }
        }
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

  // Add expense
  const addExpenseHandler = (expense) => {
    const newExpense = { id: Math.random().toString(), ...expense };
    setExpenses((currentExpenses) => [...currentExpenses, newExpense]);
  };

  // Delete expense
  const deleteExpenseHandler = (id) => {
    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id));
  };

  // Add category & Save category
  const addCategoryHandler = async (newCategory) => {
    const newColor = generateUniqueColor(categories.map(cat => cat.color));
    const newCategoryColor = { name: newCategory, color: newColor };
    const updated = [...categories, newCategoryColor];

    setCategories(updated);
    setIsCategoryModalVisible(false);

    try {
      await AsyncStorage.setItem('categories', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save categories:', error);
    }
  };

  const handleUpdateCategoryColor = async (updatedCategories) => {
    setCategories(updatedCategories)
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
    } catch (error) {
      console.error('Failed to save updated categories', error);
    }
  };

  const generateUniqueColor = (existingColors) => {
    let color;
    do {
      color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    } while (existingColors.includes(color));
    return color;
  };

  // Screen to add expenses, categories, and open category modal
  function AddExpenseScreen({ navigation }) {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginRight: 16 }}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }, [navigation]);

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
        <View style={styles.buttonContainer}>
          <Button title="Reset Categories" onPress={resetCategories} />
        </View>
        <MenuModal
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          navigation={navigation}
        />
      </View>
    );
  }

  // Screen to display the list of expenses
  function ExpensesListScreen({ navigation }) {
    return (
      <ExpensesScreen
        navigation={navigation}
        expenses={expenses}
        onDeleteExpense={deleteExpenseHandler}
        categories={categories}
      />
    );
  }

  // Screen to display the expenses with graphs
  function GraphsScreenPage({ navigation }) {
    return (
      <GraphsScreen
        navigation={navigation}
        expenses={expenses}
        categories={categories}
      />
    );
  }

  // Screen for editing Settings
  function SettingsScreenPage({ navigation }) {
    return (
      <SettingsScreen
        navigation={navigation}
        categories={categories}
        onSaveUpdatedCategories={handleUpdateCategoryColor}
      />
    )
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
        <Stack.Screen
          name="ExpensesGraph"
          component={GraphsScreenPage}
          options={{ title: 'Expense Graphs' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreenPage}
          options={{ title: 'Settings' }}
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