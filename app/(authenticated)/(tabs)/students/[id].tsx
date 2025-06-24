import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { mockStudents } from '@/data/mockData';
import { User, Mail, Phone, Calendar, School, CreditCard as Edit, Settings, Users, FileText } from 'lucide-react-native';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams();
  const student = mockStudents.find(s => s.id === id);

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Student not found</Text>
      </View>
    );
  }

  const handleStatusChange = () => {
    router.push({
      pathname: '/(authenticated)/(tabs)/students/status',
      params: { studentId: student.id, currentStatus: student.status }
    });
  };

  const handleViewParents = () => {
    Alert.alert('View Parents', 'This would show parent information and management');
  };

  const handleCustomFields = () => {
    Alert.alert('Custom Fields', 'This would show custom field management');
  };

  const handleViewReports = () => {
    Alert.alert('View Reports', 'This would show student reports and academic records');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentId}>ID: {student.student_id}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: student.status === 'active' ? '#34C759' : '#FF9500' }
          ]}>
            <Text style={styles.statusText}>{student.status}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Edit size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <User size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{student.name}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Mail size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{student.email}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <School size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Class</Text>
              <Text style={styles.infoValue}>{student.class}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Calendar size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>{student.date_of_birth}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Calendar size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Admission Date</Text>
              <Text style={styles.infoValue}>{student.admission_date}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parent Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <User size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Parent Name</Text>
              <Text style={styles.infoValue}>{student.parent_name}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Phone size={20} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Parent Phone</Text>
              <Text style={styles.infoValue}>{student.parent_phone}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleStatusChange}>
            <Settings size={24} color="#007AFF" />
            <Text style={styles.actionButtonText}>Manage Status</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleViewParents}>
            <Users size={24} color="#007AFF" />
            <Text style={styles.actionButtonText}>Parent Links</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleCustomFields}>
            <Edit size={24} color="#007AFF" />
            <Text style={styles.actionButtonText}>Custom Fields</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleViewReports}>
            <FileText size={24} color="#007AFF" />
            <Text style={styles.actionButtonText}>View Reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>95%</Text>
            <Text style={styles.summaryLabel}>Attendance Rate</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>A-</Text>
            <Text style={styles.summaryLabel}>Current Grade</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>12</Text>
            <Text style={styles.summaryLabel}>Subjects</Text>
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
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
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
  actionButtonText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 8,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});