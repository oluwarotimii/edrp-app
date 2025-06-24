import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { mockSchools } from '@/data/mockData';
import { School, MapPin, Phone, Mail, Calendar, Settings, CreditCard as Edit, Users, BookOpen, DollarSign, ChartBar as BarChart3 } from 'lucide-react-native';

export default function SchoolDetailsScreen() {
  const { id } = useLocalSearchParams();
  const school = mockSchools.find(s => s.id === id);

  if (!school) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>School not found</Text>
      </View>
    );
  }

  const handleEditSchool = () => {
    router.push({
      pathname: '/(authenticated)/schools/edit',
      params: { schoolId: school.id }
    });
  };

  const handleSchoolSettings = () => {
    router.push({
      pathname: '/(authenticated)/schools/settings',
      params: { schoolId: school.id }
    });
  };

  const quickActions = [
    { title: 'School Settings', icon: Settings, action: handleSchoolSettings },
    { title: 'View Students', icon: Users, action: () => Alert.alert('Students', 'Navigate to students') },
    { title: 'Academic Setup', icon: BookOpen, action: () => Alert.alert('Academic', 'Navigate to academic setup') },
    { title: 'Fee Management', icon: DollarSign, action: () => Alert.alert('Fees', 'Navigate to fee management') },
    { title: 'Analytics', icon: BarChart3, action: () => Alert.alert('Analytics', 'Navigate to analytics') },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.schoolImage}
        />
        <View style={styles.overlay}>
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>{school.name}</Text>
            <Text style={styles.schoolType}>{school.type}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: school.status === 'active' ? '#34C759' : '#FF9500' }
            ]}>
              <Text style={styles.statusText}>{school.status}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditSchool}>
            <Edit size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>School Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <School size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>School Name</Text>
                <Text style={styles.infoValue}>{school.name}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <MapPin size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{school.address}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Phone size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{school.phone}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Mail size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{school.email}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Calendar size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Established</Text>
                <Text style={styles.infoValue}>{school.established}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={action.action}
              >
                <action.icon size={32} color="#007AFF" />
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>School Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>1,234</Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>85</Text>
              <Text style={styles.statLabel}>Teachers</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>48</Text>
              <Text style={styles.statLabel}>Classes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Departments</Text>
            </View>
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
    height: 250,
    position: 'relative',
  },
  schoolImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  schoolType: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 12,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
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
  actionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
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
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});