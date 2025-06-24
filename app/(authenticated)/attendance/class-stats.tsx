import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, Users, TrendingUp, Calendar, BarChart3 } from 'lucide-react-native';

export default function ClassAttendanceStatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const classStats = [
    {
      id: 'class1',
      class_name: 'Grade 5A',
      teacher: 'Dr. Emma Wilson',
      total_students: 28,
      avg_attendance: 94.5,
      present_today: 26,
      absent_today: 2,
      late_today: 0,
      trend: 'up',
      weekly_trend: [92, 94, 96, 95, 94, 93, 95]
    },
    {
      id: 'class2',
      class_name: 'Grade 5B',
      teacher: 'Prof. James Brown',
      total_students: 25,
      avg_attendance: 89.2,
      present_today: 22,
      absent_today: 2,
      late_today: 1,
      trend: 'down',
      weekly_trend: [91, 89, 88, 90, 89, 87, 89]
    },
    {
      id: 'class3',
      class_name: 'Grade 4A',
      teacher: 'Ms. Sarah Johnson',
      total_students: 30,
      avg_attendance: 96.8,
      present_today: 29,
      absent_today: 1,
      late_today: 0,
      trend: 'up',
      weekly_trend: [95, 97, 98, 96, 97, 96, 97]
    }
  ];

  const filteredStats = classStats.filter(stat =>
    stat.class_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stat.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return '#34C759';
    if (rate >= 85) return '#FF9500';
    return '#FF3B30';
  };

  const renderClassStat = ({ item }: { item: any }) => (
    <View style={styles.statCard}>
      <View style={styles.classHeader}>
        <View style={styles.classInfo}>
          <Text style={styles.className}>{item.class_name}</Text>
          <Text style={styles.teacherName}>Teacher: {item.teacher}</Text>
        </View>
        <View style={styles.attendanceRate}>
          <Text style={[
            styles.rateText,
            { color: getAttendanceColor(item.avg_attendance) }
          ]}>
            {item.avg_attendance}%
          </Text>
          <TrendingUp size={16} color={item.trend === 'up' ? '#34C759' : '#FF3B30'} />
        </View>
      </View>

      <View style={styles.todayStats}>
        <Text style={styles.todayTitle}>Today's Attendance</Text>
        <View style={styles.todayGrid}>
          <View style={styles.todayItem}>
            <Text style={styles.todayValue}>{item.present_today}</Text>
            <Text style={styles.todayLabel}>Present</Text>
          </View>
          <View style={styles.todayItem}>
            <Text style={styles.todayValue}>{item.late_today}</Text>
            <Text style={styles.todayLabel}>Late</Text>
          </View>
          <View style={styles.todayItem}>
            <Text style={styles.todayValue}>{item.absent_today}</Text>
            <Text style={styles.todayLabel}>Absent</Text>
          </View>
          <View style={styles.todayItem}>
            <Text style={styles.todayValue}>{item.total_students}</Text>
            <Text style={styles.todayLabel}>Total</Text>
          </View>
        </View>
      </View>

      <View style={styles.weeklyTrend}>
        <Text style={styles.trendTitle}>Weekly Trend</Text>
        <View style={styles.trendChart}>
          {item.weekly_trend.map((value: number, index: number) => (
            <View key={index} style={styles.trendBar}>
              <View 
                style={[
                  styles.trendBarFill,
                  { 
                    height: `${value}%`,
                    backgroundColor: getAttendanceColor(value)
                  }
                ]} 
              />
              <Text style={styles.trendDay}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Class Attendance Statistics</Text>
        <Text style={styles.subtitle}>Class-wise attendance analytics</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search classes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.overallStats}>
        <View style={styles.overallStatCard}>
          <BarChart3 size={24} color="#007AFF" />
          <Text style={styles.overallStatValue}>93.5%</Text>
          <Text style={styles.overallStatLabel}>School Average</Text>
        </View>
        <View style={styles.overallStatCard}>
          <Users size={24} color="#34C759" />
          <Text style={styles.overallStatValue}>83</Text>
          <Text style={styles.overallStatLabel}>Total Students</Text>
        </View>
      </View>

      <FlatList
        data={filteredStats}
        renderItem={renderClassStat}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Users size={48} color="#ccc" />
            <Text style={styles.emptyText}>No class statistics found</Text>
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
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  teacherName: {
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
  todayStats: {
    marginBottom: 16,
  },
  todayTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  todayGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todayItem: {
    alignItems: 'center',
  },
  todayValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  todayLabel: {
    fontSize: 12,
    color: '#666',
  },
  weeklyTrend: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  trendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  trendChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 60,
  },
  trendBar: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  trendBarFill: {
    width: '100%',
    borderRadius: 2,
    marginBottom: 4,
  },
  trendDay: {
    fontSize: 10,
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