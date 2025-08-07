import React, { useEffect, useRef } from 'react';
import { Modal, Text, StyleSheet, TouchableOpacity, Pressable, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function MenuModal({ visible, onClose, navigation }) {
    const slideAnim = useRef(new Animated.Value(-SCREEN_HEIGHT)).current;

    useEffect(() => {
        // Reset to initial value when component mounts
        slideAnim.setValue(-SCREEN_HEIGHT);

        if (visible) {
            const animation = Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            });
            animation.start();

            return () => animation.stop();
        }
    }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }, ]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Menu</Text>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                onClose();
                navigation.navigate('AddExpense');
                }}
            >
                <Text style={styles.menuText}>Add Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                onClose();
                navigation.navigate('ExpensesList');
                }}
            >
                <Text style={styles.menuText}>View Expenses</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    onClose();
                    navigation.navigate('ExpensesGraph');
                }}
            >
                <Text style={styles.menuText}>View Expense Graphs</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    onClose();
                    navigation.navigate('Settings');
                }}
            >
                <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
});