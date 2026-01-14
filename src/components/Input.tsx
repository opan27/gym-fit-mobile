import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { COLORS } from '../constants/colors';

export const Input: React.FC<TextInputProps> = (props) => {
  return <TextInput style={styles.input} placeholderTextColor="#9CA3AF" {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
});
