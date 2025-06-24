import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, User, Clock, CheckCircle, Calendar, MapPin } from 'lucide-react-native';

export default function TeacherAttendanceStatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const teacherStats = [
    {
      id: 'teacher1',
      name: 'Dr. Emma Wilson',
      employee_id: 'EMP001',
      department: 'Mathematics',
      total_days: 100,
      present_days: 98,
      absent_days: 2,
      late_days: 1,
      attendance_rate: 98,
      avg_check_in: '07:45 AM',
      avg_check_out: '04:15 PM',
      last_check_in: '2024-01-20 07:42 AM',
      status: 'present'
    },
    {
      id: 'teacher2',
      name: 'Prof. James Brown',
      employee_id: 'EMP002',
      department: 'English',
      total_days: 100,
      present_days: 95,
      absent_days: 4,
      late_days: 1,
      attendance_rate: 95,
      avg_check_in: '07:50 AM',
      avg_check_out: '04:10 PM',
      last_check_in: '2024-01-20 07:48 AM',
      status: 'present'
    },
    {
      id: 'teacher3',
      name: 'Ms. Sarah Johnson',
      employee_id: 'EMP003',
      department: 'Science',
      total_days: 100,
      present_days: 92,
      absent_days: 6,
      late_days: 2,
      attendance_rate: 92,
      avg_check_in: '08:05 AM',
      avg_check_out: '04:00 PM',
      last_check_in: 'Not checked in today',
      status: 'absent'
    }
  ];

  const filteredStats = teacherStats.filter(stat =>
    stat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stat.employee_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return '#34C759';
    if (rate >= 85) return '#FF9500';
    return '#FF3B30';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return '#34C759';
      case 'late':
        return '#FF9500';
      case 'absent':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const renderTeacherStat = ({ item }: { item: any }) => (
    <View style={styles.statCard}>
      <View style={styles.teacherHeader}>
        <View style={styles.teacherInfo}>
          <Text style={styles.teacherName}>{item.name}</Text>
          <Text style={styles.teacherDetails}>{item.department} • {item.employee_id}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.attendanceRate}>
        <Text style={styles.rateLabel}>Attendance Rate</Text>
        <Text style={[
          styles.rateValue,
          { color: getAttendanceColor(item.attendance_rate) }
        ]}>
          {item.attendance_rate}%
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.present_days}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.late_days}</Text>
          <Text style={styles.statLabel}>Late</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.absent_days}</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.total_days}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <View style={styles.timeInfo}>
        <View style={styles.timeItem}>
          <Clock size={16} color="#666" />
          <Text style={styles.timeText}>Avg Check-in: {item.avg_check_in}</Text>
        </View>
        <View style={styles.timeItem}>
          <Clock size={16} color="#666" />
          <Text style={styles.timeText}>Avg Check-out: {item.avg_check_out}</Text>
        </View>
      </View>

      <View style={styles.lastCheckIn}>
        <MapPin size={16} color="#666" />
        <Text style={styles.lastCheckInText}>Last: {item.last_check_in}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Teacher Attendance Statistics</Text>
        <Text style={styles.subtitle}>Staff attendance tracking and analytics</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search teachers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.overallStats}>
        <View style={styles.overallStatCard}>
          <CheckCircle size={24} color="#34C759" />
          <Text style={styles.overallStatValue}>95.0%</Text>
          <Text style={styles.overallStatLabel}>Staff Average</Text>
        </View>
        <View style={styles.overallStatCard}>
          <User size={24} color="#007AFF" />
          <Text style={styles.overallStatValue}>{teacherStats.filter(t => t.status === 'present').length}</Text>
          <Text style={styles.overallStatLabel}>Present Today</Text>
        </View>
      </View>

      <FlatList
        data={filteredStats}
        renderItem={renderTeacherStat}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <User size={48} color="#ccc" />
            <Text style={styles.emptyText}>No teacher statistics found</Text>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
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
  overallStats: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  overallStatCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  overallStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  overallStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  statCard: {
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
  teacherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  teacherDetails: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  attendanceRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  rateLabel: {
    fontSize: 14,
    color: '#666',
  },
  rateValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  timeInfo: {
    marginBottom: 12,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  lastCheckIn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  lastCheckInText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
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