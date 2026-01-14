import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: COLORS.background,
  },
  illustration: {
    width: 200,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 16,
    color: COLORS.text,
  },
  linkText: {
    marginTop: 16,
    textAlign: 'center',
    color: COLORS.primary,
  },
});
