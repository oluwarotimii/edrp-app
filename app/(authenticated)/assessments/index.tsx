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
import { GraduationCap, FileText, ChartBar as BarChart3, Award, ClipboardList, TrendingUp, Users, BookOpen } from 'lucide-react-native';

export default function AssessmentsScreen() {
  const assessmentModules = [
    {
      title: 'Assessments',
      description: 'Create and manage assessments',
      icon: ClipboardList,
      route: '/(authenticated)/assessments/list',
      color: '#007AFF',
    },
    {
      title: 'Score Entry',
      description: 'Enter student scores and grades',
      icon: FileText,
      route: '/(authenticated)/assessments/score-entry',
      color: '#34C759',
    },
    {
      title: 'Student Results',
      description: 'View individual student results',
      icon: Users,
      route: '/(authenticated)/assessments/student-results',
      color: '#FF9500',
    },
    {
      title: 'Report Cards',
      description: 'Generate student report cards',
      icon: Award,
      route: '/(authenticated)/assessments/report-cards',
      color: '#AF52DE',
    },
    {
      title: 'Assessment Schemes',
      description: 'Configure assessment schemes',
      icon: BookOpen,
      route: '/(authenticated)/assessments/schemes',
      color: '#FF3B30',
    },
    {
      title: 'Analytics',
      description: 'Assessment analytics and insights',
      icon: BarChart3,
      route: '/(authenticated)/assessments/analytics',
      color: '#00C7BE',
    },
  ];

  const handleModulePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assessments & Grading</Text>
        <Text style={styles.subtitle}>Manage student assessments and academic performance</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.overviewCard}>
          <GraduationCap size={24} color="#007AFF" />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewTitle}>Assessment Overview</Text>
            <Text style={styles.overviewText}>
              Comprehensive assessment management system for tracking student 
              performance, creating evaluations, and generating detailed reports.
            </Text>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Active Assessments</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1,234</Text>
            <Text style={styles.statLabel}>Students Assessed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Avg Performance</Text>
          </View>
        </View>

        <View style={styles.modulesGrid}>
          {assessmentModules.map((module, index) => (
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

        <View style={styles.recentActivity}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <ClipboardList size={16} color="#007AFF" />
              <Text style={styles.activityText}>Math Quiz 1 created for Grade 5A</Text>
              <Text style={styles.activityTime}>2h ago</Text>
            </View>
            <View style={styles.activityItem}>
              <FileText size={16} color="#34C759" />
              <Text style={styles.activityText}>Scores entered for English Essay</Text>
              <Text style={styles.activityTime}>4h ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Award size={16} color="#FF9500" />
              <Text style={styles.activityText}>Report cards generated for Grade 4</Text>
              <Text style={styles.activityTime}>1d ago</Text>
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
  recentActivity: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});