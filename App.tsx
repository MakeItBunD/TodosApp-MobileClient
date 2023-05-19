import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Form from './src/components/form/Form';
import TodoList from './src/components/todoList/TodoList';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todos App</Text>
      <Form />
      <TodoList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeb6bd',
    paddingTop: 40,
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    color: 'gray',
  },
});
