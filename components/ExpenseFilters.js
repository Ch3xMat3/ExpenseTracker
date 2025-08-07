import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ExpenseFilters({visible, onClose, onApplyFilters, categories}) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [exactDate, setExactDate] = useState(null);

    // Local state for date pickers visibility
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [showExactPicker, setShowExactPicker] = useState(false);

    const resetFilters = () => {
        setSelectedCategory('');
        setStartDate(null);
        setEndDate(null);
        setExactDate(null);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    };
    
    const handleApply = () => {
        onApplyFilters({ selectedCategory, startDate, endDate, exactDate });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Expenses</Text>

            {/* Category Picker */}
            <Text style={styles.label}>Category:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                <Picker.Item label="All Categories" value="" />
                {categories.map((cat) => (
                    <Picker.Item key={cat.name} label={cat.name} value={cat.name} />
                ))}
                </Picker>
            </View>

            {/* Exact Date Picker */}
            <Text style={styles.label}>Exact Date:</Text>
            <TouchableOpacity
                onPress={() => setShowExactPicker(true)}
                style={styles.dateButton}
            >
                <Text>{exactDate ? formatDate(exactDate) : 'Select Date'}</Text>
            </TouchableOpacity>
            {showExactPicker && (
                <DateTimePicker
                value={exactDate ? new Date(exactDate) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                    setShowExactPicker(false);
                    if (selectedDate) {
                    setExactDate(selectedDate);
                    setStartDate(null);
                    setEndDate(null);
                    }
                }}
                />
            )}

            {/* Start Date Picker */}
            <Text style={styles.label}>Start Date:</Text>
            <TouchableOpacity
                onPress={() => setShowStartPicker(true)}
                style={[
                styles.dateButton,
                exactDate && styles.disabledInput
                ]}
                disabled={!!exactDate}
            >
                <Text>{startDate ? formatDate(startDate) : 'Select Start Date'}</Text>
            </TouchableOpacity>
            {showStartPicker && (
                <DateTimePicker
                value={startDate ? new Date(startDate) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                    setShowStartPicker(false);
                    if (selectedDate) {
                    setStartDate(selectedDate);
                    setExactDate(null);
                    }
                }}
                />
            )}

            {/* End Date Picker */}
            <Text style={styles.label}>End Date:</Text>
            <TouchableOpacity
                onPress={() => setShowEndPicker(true)}
                style={[
                styles.dateButton,
                exactDate && styles.disabledInput
                ]}
                disabled={!!exactDate}
            >
                <Text>{endDate ? formatDate(endDate) : 'Select End Date'}</Text>
            </TouchableOpacity>
            {showEndPicker && (
                <DateTimePicker
                value={endDate ? new Date(endDate) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                    setShowEndPicker(false);
                    if (selectedDate) {
                    setEndDate(selectedDate);
                    setExactDate(null);
                    }
                }}
                />
            )}

            {/* Buttons */}
            <View style={styles.buttonRow}>
                <Button title="Clear All" onPress={resetFilters} />
                <Button title="Save Filters" onPress={handleApply} />
            </View>

            <View style={styles.closeButton}>
                <Button title="Close" onPress={onClose} color="gray" />
            </View>
            </View>
        </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
    },
    modalContent: {
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    label: {
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    dateButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        marginBottom: 5,
    },
    disabledInput: {
        backgroundColor: '#f0f0f0',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    closeButton: {
        marginTop: 10,
    },
});