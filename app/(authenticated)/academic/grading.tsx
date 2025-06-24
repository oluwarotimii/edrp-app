import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Search, Plus, Award, Hash, TrendingUp } from 'lucide-react-native';

export default function GradingScalesScreen() {
  const [gradingScales, setGradingScales] = useState([
    {
      id: 'scale1',
      name: 'Standard Grading Scale',
      type: 'percentage',
      is_default: true,
      grades: [
        { grade: 'A+', min_score: 95, max_score: 100, points: 4.0 },
        { grade: 'A', min_score: 90, max_score: 94, points: 4.0 },
        { grade: 'A-', min_score: 85, max_score: 89, points: 3.7 },
        { grade: 'B+', min_score: 80, max_score: 84, points: 3.3 },
        { grade: 'B', min_score: 75, max_score: 79, points: 3.0 },
        { grade: 'B-', min_score: 70, max_score: 74, points: 2.7 },
        { grade: 'C+', min_score: 65, max_score: 69, points: 2.3 },
        { grade: 'C', min_score: 60, max_score: 64, points: 2.0 },
        { grade: 'D', min_score: 50, max_score: 59, points: 1.0 },
        { grade: 'F', min_score: 0, max_score: 49, points: 0.0 }
      ]
    },
    {
      id: 'scale2',
      name: 'Elementary Scale',
      type: 'descriptive',
      is_default: false,
      grades: [
        { grade: 'Excellent', min_score: 90, max_score: 100, points: 4.0 },
        { grade: 'Very Good', min_score: 80, max_score: 89, points: 3.0 },
        { grade: 'Good', min_score: 70, max_score: 79, points: 2.0 },
        { grade: 'Satisfactory', min_score: 60, max_score: 69, points: 1.0 },
        { grade: 'Needs Improvement', min_score: 0, max_score: 59, points: 0.0 }
      ]
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScales = gradingScales.filter(scale =>
    scale.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateScale = () => {
    Alert.alert('Create Grading Scale', 'This would open the create grading scale form');
  };

  const renderGradingScale = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.scaleCard}
      onPress={() => router.push(`/(authenticated)/academic/grading/${item.id}`)}
    >
      <View style={styles.scaleHeader}>
        <View style={styles.scaleInfo}>
          <Text style={styles.scaleName}>{item.name}</Text>
          {item.is_default && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        <View style={styles.scaleType}>
          <Hash size={16} color="#666" />
          <Text style={styles.scaleTypeText}>{item.type}</Text>
        </View>
      </View>
      
      <View style={styles.gradesPreview}>
        <Text style={styles.gradesTitle}>Grade Ranges:</Text>
        <View style={styles.gradesList}>
          {item.grades.slice(0, 3).map((grade: any, index: number) => (
            <View key={index} style={styles.gradeItem}>
              <Text style={styles.gradeLabel}>{grade.grade}</Text>
              <Text style={styles.gradeRange}>
                {grade.min_score}-{grade.max_score}%
              </Text>
            </View>
          ))}
          {item.grades.length > 3 && (
            <Text style={styles.moreGrades}>+{item.grades.length - 3} more</Text>
          )}
        </View>
      </View>

      <View style={styles.scaleStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.grades.length}</Text>
          <Text style={styles.statLabel}>Grades</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{Math.max(...item.grades.map((g: any) => g.points))}</Text>
          <Text style={styles.statLabel}>Max Points</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grading Scales</Text>
        <Text style={styles.subtitle}>Configure grading systems and scales</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search grading scales..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateScale}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{gradingScales.length}</Text>
          <Text style={styles.statLabel}>Total Scales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{gradingScales.filter(s => s.is_default).length}</Text>
          <Text style={styles.statLabel}>Default</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Scale Types</Text>
        </View>
      </View>

      <FlatList
        data={filteredScales}
        renderItem={renderGradingScale}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Award size={48} color="#ccc" />
            <Text style={styles.emptyText}>No grading scales found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    marginLeft: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  listContainer: {
    padding: 20,
  },
  scaleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scaleHeader: {
    marginBottom: 12,
  },
  scaleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  scaleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  defaultBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  scaleType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scaleTypeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  gradesPreview: {
    marginBottom: 12,
  },
  gradesTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  gradesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gradeItem: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  gradeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  gradeRange: {
    fontSize: 10,
    color: '#666',
  },
  moreGrades: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  scaleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});