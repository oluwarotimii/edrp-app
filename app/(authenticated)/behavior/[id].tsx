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
import { User, Calendar, Clock, CreditCard as Edit, MessageSquare, FileText, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function BehaviorReportDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Mock behavior report data
  const behaviorReport = {
    id: id,
    student_name: 'Alice Johnson',
    student_id: 'STU001',
    class: 'Grade 5A',
    type: 'positive',
    title: 'Excellent Participation',
    description: 'Alice actively participated in today\'s science class discussion about renewable energy. She asked thoughtful questions and helped other students understand complex concepts. Her enthusiasm and collaborative spirit made the entire class more engaging.',
    reported_by: 'Dr. Emma Wilson',
    date: '2024-01-20',
    time: '10:30 AM',
    status: 'reviewed',
    follow_up_required: false,
    parent_notified: true,
    additional_notes: 'Alice continues to show leadership qualities and academic excellence.'
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle size={24} color="#34C759" />;
      case 'negative':
        return <AlertTriangle size={24} color="#FF3B30" />;
      default:
        return <Clock size={24} color="#FF9500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'positive':
        return '#34C759';
      case 'negative':
        return '#FF3B30';
      default:
        return '#FF9500';
    }
  };

  const handleEditReport = () => {
    Alert.alert('Edit Report', 'This would open the edit behavior report screen');
  };

  const handleContactParent = () => {
    Alert.alert('Contact Parent', 'This would open messaging to contact the parent');
  };

  const handleAddFollowUp = () => {
    Alert.alert('Follow-up', 'This would add a follow-up action to this report');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.reportHeader}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{behaviorReport.student_name}</Text>
            <Text style={styles.studentDetails}>{behaviorReport.class} • {behaviorReport.student_id}</Text>
          </View>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor(behaviorReport.type) }]}>
            {getTypeIcon(behaviorReport.type)}
            <Text style={styles.typeText}>{behaviorReport.type}</Text>
          </View>
        </View>
        <Text style={styles.reportTitle}>{behaviorReport.title}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report Details</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <User size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Reported By</Text>
                <Text style={styles.infoValue}>{behaviorReport.reported_by}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Calendar size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{behaviorReport.date}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Clock size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>{behaviorReport.time}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>{behaviorReport.description}</Text>
          </View>
        </View>

        {behaviorReport.additional_notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <View style={styles.notesCard}>
              <Text style={styles.notesText}>{behaviorReport.additional_notes}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Information</Text>
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Report Status:</Text>
              <Text style={[styles.statusValue, { color: getTypeColor(behaviorReport.type) }]}>
                {behaviorReport.status}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Parent Notified:</Text>
              <Text style={[styles.statusValue, { color: behaviorReport.parent_notified ? '#34C759' : '#FF3B30' }]}>
                {behaviorReport.parent_notified ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Follow-up Required:</Text>
              <Text style={[styles.statusValue, { color: behaviorReport.follow_up_required ? '#FF9500' : '#34C759' }]}>
                {behaviorReport.follow_up_required ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={handleEditReport}>
              <Edit size={24} color="#007AFF" />
              <Text style={styles.actionText}>Edit Report</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={handleContactParent}>
              <MessageSquare size={24} color="#007AFF" />
              <Text style={styles.actionText}>Contact Parent</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={handleAddFollowUp}>
              <FileText size={24} color="#007AFF" />
              <Text style={styles.actionText}>Add Follow-up</Text>
            </TouchableOpacity>
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
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  studentDetails: {
    fontSize: 14,
    color: '#666',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  typeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
    marginBottom: 12,
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
  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  notesCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
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
});