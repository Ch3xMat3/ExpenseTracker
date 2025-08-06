import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MenuModal from '../components/MenuModal';

export default function GraphsScreen({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);

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
            <Text style={styles.title}>Expense Graphs</Text>

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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
