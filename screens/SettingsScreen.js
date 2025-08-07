// SettingsScreen.js
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MenuModal from '../components/MenuModal';
import EditCategoriesModal from '../components/EditCategoriesModal';

export default function SettingsScreen({ navigation, categories, onSaveUpdatedCategories }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

    // Set header with menu icon on the right
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginRight: 16 }}>
                    <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Edit Category Colors"
                    onPress={() => setIsCategoryModalVisible(true)}
                />
            </View>
            <EditCategoriesModal
                visible={isCategoryModalVisible}
                onClose={() => setIsCategoryModalVisible(false)}
                categories={categories}
                onSaveUpdatedCategories={onSaveUpdatedCategories} // passed down
            />
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
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '60%',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});
