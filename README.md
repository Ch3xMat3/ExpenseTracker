# 💰 React Native Expense Tracker

A simple and intuitive mobile app built with **React Native** and **Expo** for tracking daily expenses. Users can add expenses with categories, see a list of past expenses, and even add new custom categories.

---

## ✨ Features

- Add and delete expenses
- Choose from preset or custom categories
- Add new categories with a modal popup
- Persistent storage using AsyncStorage
- Clean and minimal UI
- Works on Android and iOS via Expo Go

---

## 📸 Screenshot

<table>
    <tr>
      <th>Main Landing Page</th>
      <th>Add Expense Category</th>
      <th>Expense Listing page</th>
      <th>Expense Filtering Menu</th>
    </tr>
    <tr>
        <td>
            <img src="assets/ExpenseHomePage.jpg" alt="Screenshot of app landing page on phone" Width="200" />
        </td>
        <td>
            <img src="assets/AddExpenseCategory.jpg" alt="Screenshot of app Expense Listing page on phone" Width="200" />
        </td>
        <td>
            <img src="assets/ExpenseListPage.jpg" alt="Screenshot of app landing page on phone" Width="200" />
        </td>
        <td>
            <img src="assets/ExpenseFilterPage.jpg" alt="Screenshot of app Expense Listing page on phone" Width="200" />
        </td>
    </tr>
    <tr>
        <th>Expense Graphs Page</th>
        <th>Settings Page</th>
        <th>Edit Category Color Page</th>
        <th>Wheel Color Picker</th>
    </tr>
        <td>
            <img src="assets/ExpenseGraphs.jpg" alt="Screenshot of app Expense Graphs page on phone" Width="200" />
        </td>
        <td>
            <img src="assets/Settings.jpg" alt="Screenshot of app Settings page on phone" Width="200" />
        </td>
        <td>
            <img src="assets/EditCategoryColors.jpg" alt="Screenshot of app Edit Category Color page on phone" Width="200" />
        </td>
        <td>
            <img src="assets/ColorPicker.jpg" alt="Screenshot of app Color Picker on phone" Width="200" />
        </td>
    <tr>

    </tr>
</table>

## 🚀 Getting Started

### Prerequisites

- Node.js
- Expo CLI
- Expo Go app (on your iOS/Android phone)

### Install and Run

1. Clone the repo:

```bash
git clone https://github.com/ch3xmate/ExpenseTracker.git
cd ExpenseTracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the App:

You can start the Expo development server using one of the two options below:

**Option 1 (Basic Start):**

```bash
npx expo start
```

**Option 2 (Clear Cache + Tunnel - if Option 1 fails to connect your phone):**

```bash
npx expo start -c --tunnel
```

>The `-c` flag clears the Metro bundler cache, and `--tunnel` helps establish a connection if your device can't connect over LAN.

4. Scan the QR code with the Expo Go app on your phone.

## 📦 Dependencies

This project uses the following libraries and are installed automatically when running `npm install`:

### Runtime Dependencies

- **@expo/vector-icons** - Icon set for React Native (used with Expo)
- **@react-native-async-storage/async-storage** - Persistent local storage for saving data like expenses and categories
- **@react-native-picker/picker** - Dropdown picker component for category selection
- **@react-navigation/native** - Core utilities for navigation between screens
- **@react-navigation/native-stack** - Native stack navigator for screen transitions
- **expo** - Framework for universal React applications
- **expo-status-bar** - A drop-in replacement for the native status bar
- **react** - The core React library for building UI
- **react-native** - Framework for building native apps using React
- **react-native-safe-area-context** - Handles safe area insets on modern phones
- **react-native-screens** - Optimized screen management for navigation
- **@react-native-community/datetimepicker** - Native date and time picker component for React Native
- **react-native-chart-kit** - Simple and customizable chart components
- **react-native-svg** - Allows the chart kit and other components to render vector graphics
- **react-native-wheel-color-picker** - Wheel color picker

### Development Dependencies

- **@babel/core** - Babel compiler core, used by Metro bundler and Expo for transforming code

