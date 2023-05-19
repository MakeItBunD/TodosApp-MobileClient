import React, { useEffect, useState } from 'react';
import {
  Text, StyleSheet, View, TextInput,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import ITodo from '../../interfaces/ITodo';
import ModalUI from '../UI/modal/ModalUI';
import ButtonUI from '../UI/Button/ButtonUI';

type ItemProps = {
  item: ITodo;
};

export default function TodoItem({ item }: ItemProps) {
  const [value, setValue] = useState<string>(item.title);
  const [isChecked, setChecked] = useState(item.isCompleted);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShowInput, setIsShowInput] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const updateHandler = async () => {
    try {
      await axios.put(`http://192.168.1.7:8080/todos/${item._id}`, {
        title: value,
        isCompleted: isChecked,
      });
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setValue(item.title);
    } finally {
      setIsShowInput(false);
    }
  };

  useEffect(() => {
    updateHandler();
  }, [isChecked]);

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://192.168.1.7:8080/todos/${item._id}`);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <ModalUI visible={!!errorMessage} title={errorMessage ?? 'Something goes wrong'} onCLose={() => setErrorMessage('')} onOk={() => setErrorMessage('')} />
      <ModalUI visible={isShowModal} title="Are you sure you want to delete this todo?" onCLose={() => setIsShowModal(false)} onOk={deleteHandler} />
      <View style={styles.container}>
        <Checkbox
          style={styles.checkBox}
          value={isChecked}
          onValueChange={setChecked}
        />
        {isShowInput
          ? (
            <TextInput
              style={styles.input}
              maxLength={80}
              onChangeText={setValue}
              value={value}
              placeholder="Todo name"
              autoFocus
              onSubmitEditing={updateHandler}
            />
          )
          : <Text style={styles.title}>{item.title}</Text>}
        {isShowInput
          ? (
            <View style={styles.buttonGroup}>
              <ButtonUI text="update" type="ok" onPress={updateHandler} disabled={!value} />
              <ButtonUI text="cancel" type="cancel" onPress={() => setIsShowInput(false)} disabled={false} />
            </View>
          )
          : (
            <View style={styles.buttonGroup}>
              <ButtonUI text="edit" type="ok" onPress={() => setIsShowInput(true)} disabled={false} />
              <ButtonUI text="delete" type="cancel" onPress={() => setIsShowModal(true)} disabled={false} />
            </View>
          )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: '#e7e7e7',
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  title: {
    flex: 1,
  },

  input: {
    flex: 1,
    paddingRight: 10,
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },

  checkBox: {
    marginRight: 5,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
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

  buttonRed: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'red',
  },

  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  textDisabled: {
    color: '#00000040',
  },
});
