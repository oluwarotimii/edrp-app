import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { mockStudents, mockAttendance } from '@/data/mockData';
import { CheckCircle, XCircle, Clock, Save, Users } from 'lucide-react-native';

export default function TakeAttendanceScreen() {
  const [selectedClass, setSelectedClass] = useState('Grade 5A');
  const [attendance, setAttendance] = useState<{[key: string]: 'present' | 'absent' | 'late'}>({});

  const classStudents = mockStudents.filter(student => student.class === selectedClass);

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = () => {
    const totalMarked = Object.keys(attendance).length;
    const totalStudents = classStudents.length;
    
    if (totalMarked < totalStudents) {
      Alert.alert(
        'Incomplete Attendance',
        `You have marked ${totalMarked} out of ${totalStudents} students. Continue anyway?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Save', onPress: () => saveAttendance() }
        ]
      );
    } else {
      saveAttendance();
    }
  };

  const saveAttendance = () => {
    Alert.alert('Success', 'Attendance saved successfully', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const getAttendanceStats = () => {
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    const total = classStudents.length;
    
    return { present, absent, late, total, marked: Object.keys(attendance).length };
  };

  const stats = getAttendanceStats();

  const renderStudent = ({ item }: { item: any }) => {
    const studentAttendance = attendance[item.id];
    
    return (
      <View style={styles.studentCard}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentId}>ID: {item.student_id}</Text>
        </View>
        <View style={styles.attendanceButtons}>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.presentButton,
              studentAttendance === 'present' && styles.selectedButton
            ]}
            onPress={() => handleAttendanceChange(item.id, 'present')}
          >
            <CheckCircle size={16} color={studentAttendance === 'present' ? '#fff' : '#34C759'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.lateButton,
              studentAttendance === 'late' && styles.selectedButton
            ]}
            onPress={() => handleAttendanceChange(item.id, 'late')}
          >
            <Clock size={16} color={studentAttendance === 'late' ? '#fff' : '#FF9500'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.absentButton,
              studentAttendance === 'absent' && styles.selectedButton
            ]}
            onPress={() => handleAttendanceChange(item.id, 'absent')}
          >
            <XCircle size={16} color={studentAttendance === 'absent' ? '#fff' : '#FF3B30'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Take Attendance</Text>
        <Text style={styles.subtitle}>{selectedClass} - {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.present}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.late}</Text>
          <Text style={styles.statLabel}>Late</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.absent}</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.marked}/{stats.total}</Text>
          <Text style={styles.statLabel}>Marked</Text>
        </View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <CheckCircle size={16} color="#34C759" />
          <Text style={styles.legendText}>Present</Text>
        </View>
        <View style={styles.legendItem}>
          <Clock size={16} color="#FF9500" />
          <Text style={styles.legendText}>Late</Text>
        </View>
        <View style={styles.legendItem}>
          <XCircle size={16} color="#FF3B30" />
          <Text style={styles.legendText}>Absent</Text>
        </View>
      </View>

      <FlatList
        data={classStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Users size={48} color="#ccc" />
            <Text style={styles.emptyText}>No students found in this class</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAttendance}>
          <Save size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save Attendance</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendText: {
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
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  studentId: {
    fontSize: 14,
    color: '#666',
  },
  attendanceButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  attendanceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  presentButton: {
    borderColor: '#34C759',
    backgroundColor: '#f0fff4',
  },
  lateButton: {
    borderColor: '#FF9500',
    backgroundColor: '#fff7ed',
  },
  absentButton: {
    borderColor: '#FF3B30',
    backgroundColor: '#fff5f5',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#34C759',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
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