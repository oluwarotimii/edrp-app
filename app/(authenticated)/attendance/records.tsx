import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, Calendar, Users, CheckCircle, XCircle, Clock } from 'lucide-react-native';

export default function AttendanceRecordsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-01-20');

  const attendanceRecords = [
    {
      id: 'att1',
      student_name: 'Alice Johnson',
      student_id: 'STU001',
      class: 'Grade 5A',
      date: '2024-01-20',
      status: 'present',
      time_in: '08:00 AM',
      time_out: '03:00 PM'
    },
    {
      id: 'att2',
      student_name: 'Bob Smith',
      student_id: 'STU002',
      class: 'Grade 5B',
      date: '2024-01-20',
      status: 'absent',
      time_in: null,
      time_out: null
    },
    {
      id: 'att3',
      student_name: 'Carol Davis',
      student_id: 'STU003',
      class: 'Grade 4A',
      date: '2024-01-20',
      status: 'late',
      time_in: '08:30 AM',
      time_out: '03:00 PM'
    }
  ];

  const filteredRecords = attendanceRecords.filter(record =>
    record.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.student_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={20} color="#34C759" />;
      case 'absent':
        return <XCircle size={20} color="#FF3B30" />;
      case 'late':
        return <Clock size={20} color="#FF9500" />;
      default:
        return <Clock size={20} color="#666" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return '#34C759';
      case 'absent':
        return '#FF3B30';
      case 'late':
        return '#FF9500';
      default:
        return '#666';
    }
  };

  const renderRecord = ({ item }: { item: any }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.student_name}</Text>
          <Text style={styles.studentDetails}>{item.class} • {item.student_id}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          {getStatusIcon(item.status)}
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      {item.status !== 'absent' && (
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>In: {item.time_in}</Text>
          <Text style={styles.timeText}>Out: {item.time_out}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance Records</Text>
        <Text style={styles.subtitle}>View attendance history and records</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.dateButton}>
          <Calendar size={20} color="#007AFF" />
          <Text style={styles.dateButtonText}>{selectedDate}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{attendanceRecords.filter(r => r.status === 'present').length}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{attendanceRecords.filter(r => r.status === 'late').length}</Text>
          <Text style={styles.statLabel}>Late</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{attendanceRecords.filter(r => r.status === 'absent').length}</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
      </View>

      <FlatList
        data={filteredRecords}
        renderItem={renderRecord}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Users size={48} color="#ccc" />
            <Text style={styles.emptyText}>No attendance records found</Text>
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
    gap: 12,
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  dateButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
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
  recordCard: {
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
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  studentDetails: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  timeText: {
    fontSize: 14,
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