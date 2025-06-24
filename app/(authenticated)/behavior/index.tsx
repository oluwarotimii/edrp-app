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
import { Search, Plus, ClipboardList, User, Calendar, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';

export default function BehaviorReportsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const behaviorReports = [
    {
      id: 'br1',
      student_name: 'Alice Johnson',
      student_id: 'STU001',
      class: 'Grade 5A',
      type: 'positive',
      title: 'Excellent Participation',
      description: 'Actively participated in class discussion and helped other students',
      reported_by: 'Dr. Emma Wilson',
      date: '2024-01-20',
      status: 'reviewed'
    },
    {
      id: 'br2',
      student_name: 'Bob Smith',
      student_id: 'STU002',
      class: 'Grade 5B',
      type: 'negative',
      title: 'Disruptive Behavior',
      description: 'Talking during class and not following instructions',
      reported_by: 'Prof. James Brown',
      date: '2024-01-19',
      status: 'pending'
    },
    {
      id: 'br3',
      student_name: 'Carol Davis',
      student_id: 'STU003',
      class: 'Grade 4A',
      type: 'neutral',
      title: 'Late Submission',
      description: 'Submitted homework one day late',
      reported_by: 'Ms. Sarah Johnson',
      date: '2024-01-18',
      status: 'resolved'
    }
  ];

  const filteredReports = behaviorReports.filter(report => {
    const matchesSearch = report.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || report.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle size={20} color="#34C759" />;
      case 'negative':
        return <AlertTriangle size={20} color="#FF3B30" />;
      default:
        return <Clock size={20} color="#FF9500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'positive':
        return '#34C759';
      case 'negative':
        return '#FF3B30';
      default:
        return '#FF9500';
    }
  };

  const handleCreateReport = () => {
    router.push('/(authenticated)/behavior/create');
  };

  const renderReport = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.reportCard}
      onPress={() => router.push(`/(authenticated)/behavior/${item.id}`)}
    >
      <View style={styles.reportHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.student_name}</Text>
          <Text style={styles.studentClass}>{item.class} • {item.student_id}</Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
          {getTypeIcon(item.type)}
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      
      <Text style={styles.reportTitle}>{item.title}</Text>
      <Text style={styles.reportDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.reportFooter}>
        <View style={styles.reportDetails}>
          <User size={14} color="#666" />
          <Text style={styles.reportedBy}>By: {item.reported_by}</Text>
        </View>
        <View style={styles.reportDetails}>
          <Calendar size={14} color="#666" />
          <Text style={styles.reportDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Behavior Reports</Text>
        <Text style={styles.subtitle}>Track and manage student behavior</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reports..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateReport}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by type:</Text>
        <View style={styles.filterButtons}>
          {['all', 'positive', 'negative', 'neutral'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                filter === type && styles.activeFilter
              ]}
              onPress={() => setFilter(type)}
            >
              <Text style={[
                styles.filterButtonText,
                filter === type && styles.activeFilterText
              ]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{behaviorReports.length}</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{behaviorReports.filter(r => r.type === 'positive').length}</Text>
          <Text style={styles.statLabel}>Positive</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{behaviorReports.filter(r => r.type === 'negative').length}</Text>
          <Text style={styles.statLabel}>Negative</Text>
        </View>
      </View>

      <FlatList
        data={filteredReports}
        renderItem={renderReport}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ClipboardList size={48} color="#ccc" />
            <Text style={styles.emptyText}>No behavior reports found</Text>
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
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  studentClass: {
    fontSize: 14,
    color: '#666',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  reportDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportedBy: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  reportDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
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