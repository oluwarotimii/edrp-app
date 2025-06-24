import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  Users, 
  User,
  BookOpen,
  MapPin,
  Settings,
  Plus
} from 'lucide-react-native';

export default function TimetableScreen() {
  const [selectedView, setSelectedView] = useState('class');

  const timetableModules = [
    {
      title: 'Class Timetables',
      description: 'View and manage class schedules',
      icon: Users,
      route: '/(authenticated)/timetable/class',
      color: '#007AFF',
    },
    {
      title: 'Teacher Timetables',
      description: 'Manage teacher schedules',
      icon: User,
      route: '/(authenticated)/timetable/teacher',
      color: '#34C759',
    },
    {
      title: 'Room Schedules',
      description: 'Track room utilization',
      icon: MapPin,
      route: '/(authenticated)/timetable/rooms',
      color: '#FF9500',
    },
    {
      title: 'Time Periods',
      description: 'Configure time periods',
      icon: Clock,
      route: '/(authenticated)/timetable/periods',
      color: '#AF52DE',
    },
    {
      title: 'Timetable Entries',
      description: 'Manage individual entries',
      icon: BookOpen,
      route: '/(authenticated)/timetable/entries',
      color: '#FF3B30',
    },
    {
      title: 'Settings',
      description: 'Timetable configuration',
      icon: Settings,
      route: '/(authenticated)/timetable/settings',
      color: '#00C7BE',
    },
  ];

  const handleModulePress = (route: string) => {
    router.push(route as any);
  };

  const sampleTimetable = [
    { time: '08:00 - 08:45', monday: 'Math', tuesday: 'English', wednesday: 'Science', thursday: 'Math', friday: 'Art' },
    { time: '08:45 - 09:30', monday: 'English', tuesday: 'Math', wednesday: 'English', thursday: 'PE', friday: 'Math' },
    { time: '09:30 - 09:45', monday: 'Break', tuesday: 'Break', wednesday: 'Break', thursday: 'Break', friday: 'Break' },
    { time: '09:45 - 10:30', monday: 'Science', tuesday: 'Science', wednesday: 'Math', thursday: 'English', friday: 'Science' },
    { time: '10:30 - 11:15', monday: 'History', tuesday: 'Art', wednesday: 'History', thursday: 'Science', friday: 'Music' },
    { time: '11:15 - 12:00', monday: 'PE', tuesday: 'Music', wednesday: 'PE', thursday: 'Art', friday: 'English' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timetable Management</Text>
        <Text style={styles.subtitle}>Manage class schedules and time periods</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.overviewCard}>
          <Calendar size={24} color="#007AFF" />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewTitle}>Timetable Overview</Text>
            <Text style={styles.overviewText}>
              Comprehensive timetable management system for scheduling classes, 
              managing teacher assignments, and optimizing room utilization.
            </Text>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>85</Text>
            <Text style={styles.statLabel}>Teachers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>30</Text>
            <Text style={styles.statLabel}>Rooms</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Periods</Text>
          </View>
        </View>

        <View style={styles.modulesGrid}>
          {timetableModules.map((module, index) => (
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

        <View style={styles.sampleTimetable}>
          <View style={styles.timetableHeader}>
            <Text style={styles.timetableTitle}>Sample Timetable - Grade 5A</Text>
            <TouchableOpacity 
              style={styles.viewFullButton}
              onPress={() => router.push('/(authenticated)/timetable/class')}
            >
              <Text style={styles.viewFullText}>View Full</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.timetableGrid}>
            <View style={styles.timetableRow}>
              <Text style={styles.timeHeader}>Time</Text>
              <Text style={styles.dayHeader}>Mon</Text>
              <Text style={styles.dayHeader}>Tue</Text>
              <Text style={styles.dayHeader}>Wed</Text>
              <Text style={styles.dayHeader}>Thu</Text>
              <Text style={styles.dayHeader}>Fri</Text>
            </View>
            
            {sampleTimetable.slice(0, 4).map((period, index) => (
              <View key={index} style={styles.timetableRow}>
                <Text style={styles.timeCell}>{period.time}</Text>
                <Text style={[styles.subjectCell, period.monday === 'Break' && styles.breakCell]}>
                  {period.monday}
                </Text>
                <Text style={[styles.subjectCell, period.tuesday === 'Break' && styles.breakCell]}>
                  {period.tuesday}
                </Text>
                <Text style={[styles.subjectCell, period.wednesday === 'Break' && styles.breakCell]}>
                  {period.wednesday}
                </Text>
                <Text style={[styles.subjectCell, period.thursday === 'Break' && styles.breakCell]}>
                  {period.thursday}
                </Text>
                <Text style={[styles.subjectCell, period.friday === 'Break' && styles.breakCell]}>
                  {period.friday}
                </Text>
              </View>
            ))}
          </View>
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
  overviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewContent: {
    flex: 1,
    marginLeft: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quickStats: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    textAlign: 'center',
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
  sampleTimetable: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timetableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timetableTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewFullButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewFullText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  timetableGrid: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  timetableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  timeHeader: {
    flex: 1.2,
    padding: 8,
    backgroundColor: '#f8f9fa',
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  dayHeader: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f8f9fa',
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  timeCell: {
    flex: 1.2,
    padding: 8,
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  },
  subjectCell: {
    flex: 1,
    padding: 8,
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  breakCell: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
});