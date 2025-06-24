import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { mockClasses, mockStudents } from '@/data/mockData';
import { Users, User, MapPin, Clock, Edit, BookOpen, Calendar } from 'lucide-react-native';

export default function ClassDetailsScreen() {
  const { id } = useLocalSearchParams();
  const classData = mockClasses.find(c => c.id === id);
  const classStudents = mockStudents.filter(s => s.class === classData?.name);

  if (!classData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Class not found</Text>
      </View>
    );
  }

  const handleEditClass = () => {
    Alert.alert('Edit Class', 'This would open the edit class form');
  };

  const handleManageStudents = () => {
    Alert.alert('Manage Students', 'This would open student management for this class');
  };

  const handleViewTimetable = () => {
    Alert.alert('View Timetable', 'This would show the class timetable');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.classInfo}>
          <Text style={styles.className}>{classData.name}</Text>
          <Text style={styles.teacherName}>Teacher: {classData.teacher}</Text>
          <View style={styles.classDetails}>
            <View style={styles.detailItem}>
              <MapPin size={16} color="#666" />
              <Text style={styles.detailText}>{classData.room}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={16} color="#666" />
              <Text style={styles.detailText}>{classData.schedule}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditClass}>
          <Edit size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Users size={24} color="#007AFF" />
            <Text style={styles.statValue}>{classData.student_count}</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={styles.statCard}>
            <BookOpen size={24} color="#34C759" />
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={24} color="#FF9500" />
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Periods/Day</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={handleManageStudents}>
              <Users size={24} color="#007AFF" />
              <Text style={styles.actionText}>Manage Students</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={handleViewTimetable}>
              <Calendar size={24} color="#007AFF" />
              <Text style={styles.actionText}>View Timetable</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Attendance', 'Take attendance')}>
              <Clock size={24} color="#007AFF" />
              <Text style={styles.actionText}>Take Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Assessments', 'View assessments')}>
              <BookOpen size={24} color="#007AFF" />
              <Text style={styles.actionText}>Assessments</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Students in Class</Text>
          <View style={styles.studentsContainer}>
            {classStudents.map((student, index) => (
              <TouchableOpacity
                key={student.id}
                style={styles.studentCard}
                onPress={() => router.push(`/(authenticated)/(tabs)/students/${student.id}`)}
              >
                <View style={styles.studentAvatar}>
                  <User size={20} color="#fff" />
                </View>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={styles.studentId}>ID: {student.student_id}</Text>
                </View>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: student.status === 'active' ? '#34C759' : '#FF9500' }
                ]} />
              </TouchableOpacity>
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
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 8,
  },
  classDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  editButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  studentsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 14,
    color: '#666',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});