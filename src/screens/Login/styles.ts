import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  illustration: {
    width: 220,
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 24,
    color: COLORS.text,
  },
  linkText: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.primary,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
