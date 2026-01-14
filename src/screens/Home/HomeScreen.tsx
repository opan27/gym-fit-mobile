// src/screens/Home/HomeScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import {
  fetchMissionDetail,
  fetchRecommendedMissions,
  RecommendedMission,
} from '../../services/missionService';
import { styles } from './styles';

const exerciseCategories = [
  { id: 'run', label: 'Running', color: '#FFEDE5', icon: 'walk' },
  { id: 'swim', label: 'Swimming', color: '#E5F7FF', icon: 'water' },
  { id: 'gym', label: 'Gym', color: '#E9E7FF', icon: 'barbell' },
  { id: 'cycle', label: 'Cycling', color: '#E8FFE5', icon: 'bicycle' },
];

const popularCourses = [
  {
    id: '1',
    title: 'Boxing Course',
    rating: 4.8,
    reviews: 232,
    tag: 'Boxing • Kick boxing • BJJ',
    image:
      'https://images.pexels.com/photos/4761355/pexels-photo-4761355.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    title: 'Guided Program',
    rating: 4.5,
    reviews: 150,
    tag: 'Meditation • Breathing • Yoga',
    image:
      'https://images.pexels.com/photos/3823063/pexels-photo-3823063.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const healthArticles = [
  {
    id: 'a1',
    title: '5 Tips Jaga Konsistensi Latihan',
    tag: 'Motivasi • Kebiasaan',
  },
  {
    id: 'a2',
    title: 'Panduan Pemula di Gym',
    tag: 'Beginner • Teknik dasar',
  },
];

export const HomeScreen = () => {
  const [recommended, setRecommended] = useState<RecommendedMission[]>([]);
  const [loadingRecommended, setLoadingRecommended] = useState(false);
  const [openingId, setOpeningId] = useState<number | null>(null);

  const router = useRouter();

  const loadRecommended = async () => {
    try {
      setLoadingRecommended(true);
      const res = await fetchRecommendedMissions();
      setRecommended(res.missions);
    } catch (e) {
      console.log('Failed to load recommended missions', e);
    } finally {
      setLoadingRecommended(false);
    }
  };

  const handleOpenMission = async (missionId: number) => {
    try {
      setOpeningId(missionId);
      const mission = await fetchMissionDetail(missionId);

      router.push({
        pathname: '/mission/detail',
        params: {
          mission: JSON.stringify(mission),
        },
      });
    } catch (e: any) {
      console.log(
        'Failed to load mission detail',
        e?.response?.data || e.message,
      );
    } finally {
      setOpeningId(null);
    }
  };

  useEffect(() => {
    loadRecommended();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="menu-outline" size={24} color={COLORS.text} />
        <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#9CA3AF"
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* RECOMMENDED MISSION */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended Mission</Text>
      </View>

      {loadingRecommended ? (
        <View style={styles.recommendedLoading}>
          <ActivityIndicator />
        </View>
      ) : recommended.length === 0 ? null : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendedScrollContent}
        >
          {recommended.map((m) => (
            <TouchableOpacity
              key={m.id}
              activeOpacity={0.9}
              style={styles.missionBanner}
              onPress={() => handleOpenMission(m.id)}
              disabled={openingId === m.id}
            >
              <View style={styles.missionIconWrapper}>
                <Ionicons name="flag-outline" size={18} color="#fff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.missionTitle} numberOfLines={1}>
                  {m.title}
                </Text>
                <Text style={styles.missionDesc} numberOfLines={2}>
                  {m.description}
                </Text>

                <Text style={styles.missionTag}>
                  {openingId === m.id
                    ? 'Loading...'
                    : `${
                        m.goalType === 'lose_fat'
                          ? 'Lose fat'
                          : m.goalType === 'gain_muscle'
                          ? 'Gain muscle'
                          : 'General health'
                      } • ${
                        m.sessionsPerWeek
                          ? `${m.sessionsPerWeek}x / minggu`
                          : 'Flexible'
                      }`}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* POPULAR EXERCISE */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular exercise</Text>
        <Text style={styles.sectionLink}>View All</Text>
      </View>
      <View style={styles.exerciseRow}>
        {exerciseCategories.map((item) => (
          <View
            key={item.id}
            style={[styles.exerciseChip, { backgroundColor: item.color }]}
          >
            <View style={styles.exerciseIconWrapper}>
              <Ionicons
                name={item.icon as any}
                size={20}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.exerciseLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* POPULAR COURSE */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Course</Text>
        <Text style={styles.sectionLink}>View All</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={popularCourses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <Image source={{ uri: item.image }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <View style={styles.courseMetaRow}>
                <Ionicons
                  name="star"
                  size={12}
                  color="#F59E0B"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.courseMeta}>
                  {item.rating} ({item.reviews} review)
                </Text>
              </View>
              <Text style={styles.courseTag}>{item.tag}</Text>
            </View>
          </View>
        )}
      />

      {/* HEALTH ARTICLE */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Health Article</Text>
        <Text style={styles.sectionLink}>View All</Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        {healthArticles.map((item) => (
          <View key={item.id} style={styles.articleCard}>
            <View style={styles.articleIconWrapper}>
              <Ionicons
                name="newspaper-outline"
                size={18}
                color={COLORS.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <Text style={styles.articleTag}>{item.tag}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
