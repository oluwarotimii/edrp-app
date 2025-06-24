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
import { 
  BookOpen, 
  Users, 
  Calendar, 
  GraduationCap,
  Building,
  Clock,
  FileText,
  Settings,
  Award
} from 'lucide-react-native';

export default function AcademicSetupScreen() {
  const academicModules = [
    {
      title: 'Departments',
      description: 'Manage academic departments',
      icon: Building,
      route: '/(authenticated)/academic/departments',
      color: '#007AFF',
    },
    {
      title: 'Classes',
      description: 'Setup and manage classes',
      icon: Users,
      route: '/(authenticated)/academic/classes',
      color: '#34C759',
    },
    {
      title: 'Subjects',
      description: 'Configure subjects and curriculum',
      icon: BookOpen,
      route: '/(authenticated)/academic/subjects',
      color: '#FF9500',
    },
    {
      title: 'Academic Sessions',
      description: 'Manage academic years and sessions',
      icon: Calendar,
      route: '/(authenticated)/academic/sessions',
      color: '#AF52DE',
    },
    {
      title: 'Terms',
      description: 'Setup academic terms and semesters',
      icon: Clock,
      route: '/(authenticated)/academic/terms',
      color: '#FF3B30',
    },
    {
      title: 'Grading Scales',
      description: 'Configure grading systems',
      icon: Award,
      route: '/(authenticated)/academic/grading',
      color: '#00C7BE',
    },
  ];

  const handleModulePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Academic Setup</Text>
        <Text style={styles.subtitle}>Configure academic structure and curriculum</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.overviewCard}>
          <Settings size={24} color="#007AFF" />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewTitle}>Academic Configuration</Text>
            <Text style={styles.overviewText}>
              Set up your school's academic structure including departments, classes, 
              subjects, and grading systems to ensure smooth academic operations.
            </Text>
          </View>
        </View>

        <View style={styles.modulesGrid}>
          {academicModules.map((module, index) => (
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

        <View style={styles.quickStats}>
          <Text style={styles.statsTitle}>Quick Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Departments</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Classes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Subjects</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Terms</Text>
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
    fontSize: 16,
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
  quickStats: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
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
});