import React, { useState } from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';
import WheelColorPicker from 'react-native-wheel-color-picker';

const CategoryColorPickerModal = ({ visible, defaultColor, onClose, onSelectColor }) => {
    const [selectedColor, setSelectedColor] = useState(defaultColor || '#ffffff');
    
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.pickerContainer}>
                    <WheelColorPicker
                        color={selectedColor}
                        onColorChange={setSelectedColor}
                        thumbSize={30}
                        sliderSize={30}
                        noSnap={true}
                        row={false}
                    />
                    <View style={styles.buttonRow}>
                        <Button 
                            title="Select"
                            onPress={() => {
                                onSelectColor(selectedColor);
                                onClose();
                            }}
                        />
                        <Button title="Cancel" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
    },
    pickerContainer: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        height: 400,
        justifyContent: 'space-between',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default CategoryColorPickerModal;