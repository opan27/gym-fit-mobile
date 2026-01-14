import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { COLORS } from '../constants/colors';

type Props = TouchableOpacityProps & {
  title: string;
};

export const Button: React.FC<Props> = ({ title, style, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
