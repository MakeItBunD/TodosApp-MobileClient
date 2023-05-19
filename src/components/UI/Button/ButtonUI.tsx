import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface ButtonUIProps {
  text: string
  type: 'ok' | 'cancel'
  onPress: () => void
  disabled: boolean
}

function ButtonUI({
  text, type, onPress, disabled = false,
}: ButtonUIProps) {
  return (
    <Pressable
      disabled={disabled}
      style={[styles.button, type === 'cancel' && styles.buttonCancel, disabled && styles.buttonDisabled]}
      onPress={() => onPress()}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{text}</Text>
    </Pressable>
  );
}

export default ButtonUI;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
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

  buttonCancel: {
    backgroundColor: '#ff4d4f',
    borderWidth: 1,
    borderColor: '#ff4d4f',
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
