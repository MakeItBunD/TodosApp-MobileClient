import React, { useState } from 'react';
import axios from 'axios';
import {
  Pressable, StyleSheet, TextInput, View, Text,
} from 'react-native';
import ModalUI from '../UI/modal/ModalUI';

function Form() {
  const [value, setValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const createHandler = async () => {
    try {
      await axios.post('http://192.168.1.7:8080/todos', {
        title: value,
      });
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setValue('');
    }
  };

  return (
    <View style={styles.container}>
      <ModalUI visible={!!errorMessage} title={errorMessage ?? 'Something goes wrong'} onCLose={() => setErrorMessage('')} onOk={() => setErrorMessage('')} />
      <TextInput
        style={styles.input}
        maxLength={80}
        onChangeText={setValue}
        value={value}
        placeholder="Todo name"
        onEndEditing={createHandler}
      />
      <Pressable
        disabled={!value}
        style={[styles.button, !value && styles.buttonDisabled]}
        onPress={createHandler}
      >
        <Text style={[styles.text, !value && styles.textDisabled]}>Create todo</Text>
      </Pressable>
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },

  input: {
    width: '100%',
    marginBottom: 12,
    fontSize: 18,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    paddingLeft: 10,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#1677ff',
    borderWidth: 1,
    borderColor: '#1677ff',
  },

  buttonDisabled: {
    backgroundColor: '#0000000a',
    borderWidth: 1,
    borderColor: 'white',
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  textDisabled: {
    color: '#00000040',
  },
});
