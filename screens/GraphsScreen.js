import React, { useState, useLayoutEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

import MenuModal from '../components/MenuModal';

const screenWidth = Dimensions.get('window').width;

export default function GraphsScreen({ navigation, expenses, categories }) {
    const [menuVisible, setMenuVisible] = useState(false);

    // Aggregate expense totals per category
    const chartData = useMemo(() => {
        const totals = categories.map(category => {
            const total = expenses
                .filter(exp => exp.category === category.name)
                .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
            
            return {
                name: category.name,
                amount: total,
                color: category.color,
                legendFontColor: '#000',
                legendFontSize: 14,
            };
        });

        // Remove categories with 0 amount
        return totals.filter(t => t.amount > 0);
    }, [expenses, categories]);

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

            {chartData.length > 0 ? (
                <View style={styles.chartWrapper}>
                    <PieChart
                        data={chartData}
                        width={screenWidth * 0.8}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft={screenWidth * 0.2}
                        hasLegend={false}
                    />
                </View>
            ) : (
                <Text style={styles.noData}>No data to display</Text>
            )}

            <View style={styles.legendContainer}>
                {chartData.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                        <Text style={styles.legendText}>{item.name}: ${item.amount.toFixed(2)}</Text>
                    </View>
                ))}
            </View>

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
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    noData: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        color: '#666',
    },
    chartWrapper: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    legendContainer: {
        marginTop: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
        colorBox: {
        width: 16,
        height: 16,
        marginRight: 8,
        borderRadius: 4,
    },
        legendText: {
        fontSize: 14,
        color: '#000',
    },
});