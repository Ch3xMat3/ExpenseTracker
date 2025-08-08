import { ToastAndroid, Platform, Alert } from "react-native";

export function showToast(message) {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
        Alert.alert('', message);
    }
}