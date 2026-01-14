import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
    color: COLORS.text,
  },
   pickerWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
});
