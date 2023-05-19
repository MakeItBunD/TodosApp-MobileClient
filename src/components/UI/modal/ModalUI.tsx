import React from 'react';
import {
  Modal, StyleSheet, Text, View,
} from 'react-native';
import ButtonUI from '../Button/ButtonUI';

interface ModalUIProps {
  visible: boolean
  title: string
  onCLose: () => void
  onOk: () => void
}

export default function ModalUI({
  visible, title, onCLose, onOk,
}: ModalUIProps) {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => onCLose()}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttonsGroup}>
              <ButtonUI text="ok" type="ok" onPress={() => onOk()} disabled={false} />
              <ButtonUI text="cancel" type="cancel" onPress={() => onCLose()} disabled={false} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    marginBottom: 15,
    textAlign: 'center',
  },

  buttonsGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
