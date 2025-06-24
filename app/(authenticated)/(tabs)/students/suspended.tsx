import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function SuspendedStudentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock suspended students data
  const suspendedStudents = [
    {
      id: 'susp1',
      name: 'Carol Davis',
      student_id: 'STU003',
      class: 'Grade 4A',
      suspension_date: '2024-01-10',
      suspension_end: '2024-01-17',
      reason: 'Disciplinary action',
      days_remaining: 3
    },
    {
      id: 'susp2',
      name: 'Alex Johnson',
      student_id: 'STU110',
      class: 'Grade 7B',
      suspension_date: '2024-01-15',
      suspension_end: '2024-01-22',
      reason: 'Repeated violations',
      days_remaining: 1
    }
  ];

  const filteredStudents = suspendedStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.student_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStudent = ({ item }: { item: any }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <View style={styles.studentHeader}>
          <Text style={styles.studentName}>{item.name}</Text>
          <View style={styles.daysBadge}>
            <Text style={styles.daysText}>{item.days_remaining}d left</Text>
          </View>
        </View>
        <Text style={styles.studentDetails}>ID: {item.student_id}</Text>
        <Text style={styles.studentDetails}>Class: {item.class}</Text>
        <Text style={styles.studentDetails}>Suspended: {item.suspension_date}</Text>
        <Text style={styles.studentDetails}>Ends: {item.suspension_end}</Text>
        <Text style={styles.studentDetails}>Reason: {item.reason}</Text>
      </View>
      <AlertTriangle size={24} color="#FF9500" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search suspended students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Currently Suspended Students: {suspendedStudents.length}
        </Text>
      </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AlertTriangle size={48} color="#ccc" />
            <Text style={styles.emptyText}>No suspended students found</Text>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
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
  summary: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  listContainer: {
    padding: 20,
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  studentInfo: {
    flex: 1,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  daysBadge: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  daysText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  studentDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
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