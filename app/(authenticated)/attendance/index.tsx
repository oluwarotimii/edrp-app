import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Calendar, Clock, Users, CircleCheck as CheckCircle, ChartBar as BarChart3, MapPin, UserCheck, FileText } from 'lucide-react-native';

export default function AttendanceScreen() {
  const attendanceModules = [
    {
      title: 'Take Attendance',
      description: 'Mark student attendance for classes',
      icon: UserCheck,
      route: '/(authenticated)/attendance/take',
      color: '#34C759',
    },
    {
      title: 'Attendance Records',
      description: 'View attendance history and records',
      icon: FileText,
      route: '/(authenticated)/attendance/records',
      color: '#007AFF',
    },
    {
      title: 'Student Statistics',
      description: 'Individual student attendance stats',
      icon: Users,
      route: '/(authenticated)/attendance/student-stats',
      color: '#FF9500',
    },
    {
      title: 'Class Statistics',
      description: 'Class-wise attendance analytics',
      icon: BarChart3,
      route: '/(authenticated)/attendance/class-stats',
      color: '#AF52DE',
    },
    {
      title: 'Teacher Statistics',
      description: 'Teacher attendance tracking',
      icon: Clock,
      route: '/(authenticated)/attendance/teacher-stats',
      color: '#FF3B30',
    },
    {
      title: 'Location Verification',
      description: 'Manage attendance locations',
      icon: MapPin,
      route: '/(authenticated)/attendance/locations',
      color: '#00C7BE',
    },
  ];

  const handleModulePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance Management</Text>
        <Text style={styles.subtitle}>Track and manage student & teacher attendance</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.todayOverview}>
          <Text style={styles.overviewTitle}>Today's Overview</Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewStat}>
              <CheckCircle size={24} color="#34C759" />
              <Text style={styles.overviewStatValue}>94%</Text>
              <Text style={styles.overviewStatLabel}>Present</Text>
            </View>
            <View style={styles.overviewStat}>
              <Clock size={24} color="#FF9500" />
              <Text style={styles.overviewStatValue}>6%</Text>
              <Text style={styles.overviewStatLabel}>Absent</Text>
            </View>
            <View style={styles.overviewStat}>
              <Users size={24} color="#007AFF" />
              <Text style={styles.overviewStatValue}>1,234</Text>
              <Text style={styles.overviewStatLabel}>Total</Text>
            </View>
          </View>
        </View>

        <View style={styles.modulesGrid}>
          {attendanceModules.map((module, index) => (
            <TouchableOpacity
              key={index}
              style={styles.moduleCard}
              onPress={() => handleModulePress(module.route)}
            >
              <View style={[styles.moduleIcon, { backgroundColor: module.color }]}>
                <module.icon size={28} color="#fff" />
              </View>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleDescription}>{module.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/(authenticated)/attendance/take')}
          >
            <UserCheck size={20} color="#fff" />
            <Text style={styles.quickActionText}>Take Attendance Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    paddingBottom: 30,
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
  content: {
    padding: 20,
  },
  todayOverview: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  overviewStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  moduleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  moduleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  moduleDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  quickActions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  quickActionButton: {
    backgroundColor: '#34C759',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});