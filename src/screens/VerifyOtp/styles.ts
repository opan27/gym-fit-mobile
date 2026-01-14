import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  linkText: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.primary,
  },
});
