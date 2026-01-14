import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // HEADER
  header: {
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // SEARCH
  searchWrapper: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },

  // SECTION
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionLink: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  // RECOMMENDED MISSION
  recommendedLoading: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  recommendedScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  missionBanner: {
    width: 260,
    marginRight: 12,
    borderRadius: 18,
    backgroundColor: '#FFF4DE',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFB000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  missionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  missionDesc: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  missionTag: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },

  // EXERCISE
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  exerciseChip: {
    width: 70,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 18,
  },
  exerciseIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  exerciseLabel: {
    fontSize: 11,
    color: COLORS.text,
  },

  // COURSE
  courseCard: {
    width: 230,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    marginRight: 14,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 130,
  },
  courseInfo: {
    padding: 10,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  courseMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  courseMeta: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  courseTag: {
    fontSize: 11,
    color: '#6B7280',
  },

  // ARTICLE
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  articleIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF4DE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  articleTag: {
    fontSize: 11,
    color: '#6B7280',
  },
});
