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
import { Search, Plus, FileText, Clock, Award } from 'lucide-react-native';

export default function AssessmentTypesScreen() {
  const [assessmentTypes, setAssessmentTypes] = useState([
    {
      id: 'type1',
      name: 'Quiz',
      description: 'Short assessment to test understanding',
      default_duration: 30,
      default_marks: 25,
      color: '#007AFF',
      weight_percentage: 15,
      is_active: true
    },
    {
      id: 'type2',
      name: 'Test',
      description: 'Comprehensive assessment of topics',
      default_duration: 60,
      default_marks: 50,
      color: '#34C759',
      weight_percentage: 25,
      is_active: true
    },
    {
      id: 'type3',
      name: 'Assignment',
      description: 'Take-home or project-based assessment',
      default_duration: 1440, // 24 hours
      default_marks: 100,
      color: '#FF9500',
      weight_percentage: 30,
      is_active: true
    },
    {
      id: 'type4',
      name: 'Final Exam',
      description: 'Comprehensive end-of-term examination',
      default_duration: 120,
      default_marks: 100,
      color: '#AF52DE',
      weight_percentage: 30,
      is_active: true
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTypes = assessmentTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateType = () => {
    Alert.alert('Create Assessment Type', 'This would open the create assessment type form');
  };

  const renderAssessmentType = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.typeCard}
      onPress={() => router.push(`/(authenticated)/assessments/types/${item.id}`)}
    >
      <View style={styles.typeHeader}>
        <View style={[styles.typeIcon, { backgroundColor: item.color }]}>
          <FileText size={24} color="#fff" />
        </View>
        <View style={styles.typeInfo}>
          <Text style={styles.typeName}>{item.name}</Text>
          <Text style={styles.typeDescription}>{item.description}</Text>
        </View>
        <View style={styles.weightBadge}>
          <Text style={styles.weightText}>{item.weight_percentage}%</Text>
        </View>
      </View>
      
      <View style={styles.typeDetails}>
        <View style={styles.detailItem}>
          <Clock size={16} color="#666" />
          <Text style={styles.detailText}>
            {item.default_duration >= 1440 
              ? `${Math.floor(item.default_duration / 1440)} day(s)`
              : `${item.default_duration} min`
            }
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Award size={16} color="#666" />
          <Text style={styles.detailText}>{item.default_marks} marks</Text>
        </View>
      </View>

      <View style={styles.typeStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.default_marks}</Text>
          <Text style={styles.statLabel}>Default Marks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.weight_percentage}%</Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[
            styles.statValue,
            { color: item.is_active ? '#34C759' : '#FF3B30' }
          ]}>
            {item.is_active ? 'Active' : 'Inactive'}
          </Text>
          <Text style={styles.statLabel}>Status</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assessment Types</Text>
        <Text style={styles.subtitle}>Configure assessment categories and settings</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search assessment types..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateType}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{assessmentTypes.length}</Text>
          <Text style={styles.statLabel}>Total Types</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{assessmentTypes.filter(t => t.is_active).length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {assessmentTypes.reduce((sum, t) => sum + t.weight_percentage, 0)}%
          </Text>
          <Text style={styles.statLabel}>Total Weight</Text>
        </View>
      </View>

      <FlatList
        data={filteredTypes}
        renderItem={renderAssessmentType}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FileText size={48} color="#ccc" />
            <Text style={styles.emptyText}>No assessment types found</Text>
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
  typeCard: {
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
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  weightBadge: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  weightText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  typeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  typeStats: {
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
    fontSize: 16,
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