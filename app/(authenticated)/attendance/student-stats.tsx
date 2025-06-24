import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, TrendingUp, TrendingDown, User, Calendar } from 'lucide-react-native';

export default function StudentAttendanceStatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const studentStats = [
    {
      id: 'stat1',
      student_name: 'Alice Johnson',
      student_id: 'STU001',
      class: 'Grade 5A',
      total_days: 100,
      present_days: 95,
      absent_days: 3,
      late_days: 2,
      attendance_rate: 95,
      trend: 'up'
    },
    {
      id: 'stat2',
      student_name: 'Bob Smith',
      student_id: 'STU002',
      class: 'Grade 5B',
      total_days: 100,
      present_days: 88,
      absent_days: 10,
      late_days: 2,
      attendance_rate: 88,
      trend: 'down'
    },
    {
      id: 'stat3',
      student_name: 'Carol Davis',
      student_id: 'STU003',
      class: 'Grade 4A',
      total_days: 100,
      present_days: 92,
      absent_days: 6,
      late_days: 2,
      attendance_rate: 92,
      trend: 'up'
    }
  ];

  const filteredStats = studentStats.filter(stat =>
    stat.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stat.student_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return '#34C759';
    if (rate >= 85) return '#FF9500';
    return '#FF3B30';
  };

  const renderStudentStat = ({ item }: { item: any }) => (
    <View style={styles.statCard}>
      <View style={styles.studentHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.student_name}</Text>
          <Text style={styles.studentDetails}>{item.class} • {item.student_id}</Text>
        </View>
        <View style={styles.attendanceRate}>
          <Text style={[
            styles.rateText,
            { color: getAttendanceColor(item.attendance_rate) }
          ]}>
            {item.attendance_rate}%
          </Text>
          {item.trend === 'up' ? (
            <TrendingUp size={16} color="#34C759" />
          ) : (
            <TrendingDown size={16} color="#FF3B30" />
          )}
        </View>
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

      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { 
              width: `${item.attendance_rate}%`,
              backgroundColor: getAttendanceColor(item.attendance_rate)
            }
          ]} 
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Attendance Statistics</Text>
        <Text style={styles.subtitle}>Individual student attendance analytics</Text>
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
      </View>

      <View style={styles.overallStats}>
        <View style={styles.overallStatCard}>
          <Text style={styles.overallStatValue}>92.3%</Text>
          <Text style={styles.overallStatLabel}>Average Attendance</Text>
        </View>
        <View style={styles.overallStatCard}>
          <Text style={styles.overallStatValue}>3</Text>
          <Text style={styles.overallStatLabel}>Students Below 85%</Text>
        </View>
      </View>

      <FlatList
        data={filteredStats}
        renderItem={renderStudentStat}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <User size={48} color="#ccc" />
            <Text style={styles.emptyText}>No student statistics found</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
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
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  attendanceRate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rateText: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
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