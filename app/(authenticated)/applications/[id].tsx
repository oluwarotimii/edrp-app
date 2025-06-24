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
import { mockApplications } from '@/data/mockData';
import { User, Mail, Phone, Calendar, FileText, CircleCheck as CheckCircle, Circle as XCircle, Clock, Download, MessageSquare } from 'lucide-react-native';

export default function ApplicationDetailsScreen() {
  const { id } = useLocalSearchParams();
  const application = mockApplications.find(app => app.id === id);

  if (!application) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Application not found</Text>
      </View>
    );
  }

  const handleApprove = () => {
    Alert.alert(
      'Approve Application',
      `Are you sure you want to approve ${application.student_name}'s application?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Approve', onPress: () => Alert.alert('Success', 'Application approved successfully') }
      ]
    );
  };

  const handleReject = () => {
    Alert.alert(
      'Reject Application',
      `Are you sure you want to reject ${application.student_name}'s application?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reject', style: 'destructive', onPress: () => Alert.alert('Rejected', 'Application rejected') }
      ]
    );
  };

  const handleContactParent = () => {
    Alert.alert('Contact Parent', 'This would open messaging or call functionality');
  };

  const handleViewDocuments = () => {
    Alert.alert('Documents', 'This would show uploaded documents');
  };

  const getStatusIcon = () => {
    switch (application.status) {
      case 'approved':
        return <CheckCircle size={24} color="#34C759" />;
      case 'rejected':
        return <XCircle size={24} color="#FF3B30" />;
      default:
        return <Clock size={24} color="#FF9500" />;
    }
  };

  const getStatusColor = () => {
    switch (application.status) {
      case 'approved':
        return '#34C759';
      case 'rejected':
        return '#FF3B30';
      default:
        return '#FF9500';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.applicationInfo}>
          <Text style={styles.studentName}>{application.student_name}</Text>
          <Text style={styles.gradeApplying}>Applying for: {application.grade_applying}</Text>
          <View style={styles.statusContainer}>
            {getStatusIcon()}
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {application.status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <User size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Student Name</Text>
                <Text style={styles.infoValue}>{application.student_name}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Calendar size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Grade Applying For</Text>
                <Text style={styles.infoValue}>{application.grade_applying}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Calendar size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Application Date</Text>
                <Text style={styles.infoValue}>{application.application_date}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parent/Guardian Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <User size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Parent Name</Text>
                <Text style={styles.infoValue}>{application.parent_name}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Mail size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{application.parent_email}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Phone size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{application.parent_phone}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <View style={styles.documentsCard}>
            <View style={styles.documentsHeader}>
              <FileText size={20} color={application.documents_submitted ? '#34C759' : '#FF9500'} />
              <Text style={[
                styles.documentsStatus,
                { color: application.documents_submitted ? '#34C759' : '#FF9500' }
              ]}>
                {application.documents_submitted ? 'All Documents Submitted' : 'Documents Pending'}
              </Text>
            </View>
            {application.documents_submitted && (
              <TouchableOpacity style={styles.viewDocumentsButton} onPress={handleViewDocuments}>
                <Download size={16} color="#007AFF" />
                <Text style={styles.viewDocumentsText}>View Documents</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={handleContactParent}>
              <MessageSquare size={24} color="#007AFF" />
              <Text style={styles.actionText}>Contact Parent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={handleViewDocuments}>
              <FileText size={24} color="#007AFF" />
              <Text style={styles.actionText}>View Documents</Text>
            </TouchableOpacity>
          </View>
        </View>

        {application.status === 'pending' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Application Decision</Text>
            <View style={styles.decisionButtons}>
              <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                <XCircle size={20} color="#fff" />
                <Text style={styles.rejectButtonText}>Reject Application</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
                <CheckCircle size={20} color="#fff" />
                <Text style={styles.approveButtonText}>Approve Application</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    backgroundColor: '#007AFF',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  applicationInfo: {
    alignItems: 'center',
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  gradeApplying: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    textTransform: 'capitalize',
    color: '#fff',
  },
  content: {
    padding: 20,
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
  infoCard: {
    backgroundColor: '#fff',
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
  documentsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  documentsStatus: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  viewDocumentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  viewDocumentsText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginLeft: 6,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
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
  actionText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  decisionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 16,
  },
  rejectButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759',
    borderRadius: 12,
    padding: 16,
  },
  approveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});