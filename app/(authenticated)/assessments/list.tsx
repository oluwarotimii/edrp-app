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
import { Search, Plus, ClipboardList, Calendar, Users, BookOpen } from 'lucide-react-native';

export default function AssessmentsListScreen() {
  const [assessments, setAssessments] = useState([
    {
      id: 'assess1',
      title: 'Mathematics Quiz 1',
      subject: 'Mathematics',
      class: 'Grade 5A',
      type: 'Quiz',
      date: '2024-01-25',
      total_marks: 50,
      duration: 45,
      status: 'scheduled',
      students_count: 28
    },
    {
      id: 'assess2',
      title: 'English Essay Assignment',
      subject: 'English',
      class: 'Grade 5B',
      type: 'Assignment',
      date: '2024-01-30',
      total_marks: 100,
      duration: 120,
      status: 'active',
      students_count: 25
    },
    {
      id: 'assess3',
      title: 'Science Lab Test',
      subject: 'Science',
      class: 'Grade 4A',
      type: 'Test',
      date: '2024-02-05',
      total_marks: 75,
      duration: 60,
      status: 'completed',
      students_count: 30
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assessment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || assessment.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateAssessment = () => {
    Alert.alert('Create Assessment', 'This would open the create assessment form');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#007AFF';
      case 'active':
        return '#34C759';
      case 'completed':
        return '#666';
      default:
        return '#FF9500';
    }
  };

  const renderAssessment = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.assessmentCard}
      onPress={() => router.push(`/(authenticated)/assessments/list/${item.id}`)}
    >
      <View style={styles.assessmentHeader}>
        <View style={styles.assessmentInfo}>
          <Text style={styles.assessmentTitle}>{item.title}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) }
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.assessmentMeta}>
          <Text style={styles.subjectText}>{item.subject} • {item.class}</Text>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      
      <View style={styles.assessmentDetails}>
        <View style={styles.detailRow}>
          <Calendar size={14} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Users size={14} color="#666" />
          <Text style={styles.detailText}>{item.students_count} students</Text>
        </View>
      </View>

      <View style={styles.assessmentStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.total_marks}</Text>
          <Text style={styles.statLabel}>Total Marks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.duration}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {item.status === 'completed' ? '100%' : '0%'}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assessments</Text>
        <Text style={styles.subtitle}>Create and manage assessments</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search assessments..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateAssessment}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by status:</Text>
        <View style={styles.filterButtons}>
          {['all', 'scheduled', 'active', 'completed'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                filter === status && styles.activeFilter
              ]}
              onPress={() => setFilter(status)}
            >
              <Text style={[
                styles.filterButtonText,
                filter === status && styles.activeFilterText
              ]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{assessments.length}</Text>
          <Text style={styles.statLabel}>Total Assessments</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{assessments.filter(a => a.status === 'active').length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{assessments.filter(a => a.status === 'scheduled').length}</Text>
          <Text style={styles.statLabel}>Scheduled</Text>
        </View>
      </View>

      <FlatList
        data={filteredAssessments}
        renderItem={renderAssessment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ClipboardList size={48} color="#ccc" />
            <Text style={styles.emptyText}>No assessments found</Text>
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
  filterContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
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
  assessmentCard: {
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
  assessmentHeader: {
    marginBottom: 12,
  },
  assessmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  assessmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  assessmentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  typeText: {
    fontSize: 14,
    color: '#666',
  },
  assessmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  assessmentStats: {
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