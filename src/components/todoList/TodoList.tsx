import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';
import TodoItem from '../todoItem/TodoItem';
import ITodo from '../../interfaces/ITodo';
import ModalUI from '../UI/modal/ModalUI';

export default function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getTodos = async () => {
    try {
      const responce = await axios.get<ITodo[]>('http://192.168.1.7:8080/todos');
      setTodos(responce.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  });

  return (
    <ScrollView style={styles.container}>
      <ModalUI visible={!!errorMessage} title={`${errorMessage}\nServer uri is not correct`} onCLose={() => setErrorMessage('')} onOk={() => setErrorMessage('')} />
      {todos.length
        ? todos.map((todo) => (
          <TodoItem key={todo._id} item={todo} />
        ))
        : <Text style={styles.text}>No todos</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },

  text: {
    textAlign: 'center',
  },
});
