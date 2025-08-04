import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TotalSummary() {
    return (
        <View style={styles.container}>
            <Text>Total Summary</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderTopWidth: 1,
    },
});