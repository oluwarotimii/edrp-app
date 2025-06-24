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
import { FileText, ChartBar as BarChart3, Users, DollarSign, Calendar, TrendingUp, Download, Share } from 'lucide-react-native';

export default function ReportsScreen() {
  const reportCategories = [
    {
      title: 'Student Reports',
      description: 'Academic and behavioral reports',
      icon: Users,
      route: '/(authenticated)/reports/students',
      color: '#007AFF',
    },
    {
      title: 'Financial Reports',
      description: 'Fee collection and financial analytics',
      icon: DollarSign,
      route: '/(authenticated)/reports/financial',
      color: '#34C759',
    },
    {
      title: 'Attendance Reports',
      description: 'Attendance statistics and trends',
      icon: Calendar,
      route: '/(authenticated)/reports/attendance',
      color: '#FF9500',
    },
    {
      title: 'Academic Reports',
      description: 'Performance and assessment reports',
      icon: BarChart3,
      route: '/(authenticated)/reports/academic',
      color: '#AF52DE',
    },
    {
      title: 'Custom Reports',
      description: 'Generate custom reports',
      icon: FileText,
      route: '/(authenticated)/reports/custom',
      color: '#FF3B30',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics overview',
      icon: TrendingUp,
      route: '/(authenticated)/reports/analytics',
      color: '#00C7BE',
    },
  ];

  const handleReportPress = (route: string) => {
    Alert.alert('Report', `This would navigate to ${route}`);
  };

  const quickReports = [
    { title: 'Monthly Attendance', type: 'attendance', generated: '2024-01-20' },
    { title: 'Fee Collection Summary', type: 'financial', generated: '2024-01-19' },
    { title: 'Academic Performance', type: 'academic', generated: '2024-01-18' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <Text style={styles.subtitle}>Generate and view comprehensive reports</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.overviewCard}>
          <FileText size={24} color="#007AFF" />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewTitle}>Reports Center</Text>
            <Text style={styles.overviewText}>
              Access comprehensive reports and analytics for all aspects of 
              school management including academics, finances, and operations.
            </Text>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Reports Generated</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1,234</Text>
            <Text style={styles.statLabel}>Data Points</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>95%</Text>
            <Text style={styles.statLabel}>Accuracy Rate</Text>
          </View>
        </View>

        <View style={styles.categoriesGrid}>
          {reportCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => handleReportPress(category.route)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <category.icon size={28} color="#fff" />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickReportsSection}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          <View style={styles.quickReportsList}>
            {quickReports.map((report, index) => (
              <View key={index} style={styles.quickReportCard}>
                <View style={styles.quickReportInfo}>
                  <Text style={styles.quickReportTitle}>{report.title}</Text>
                  <Text style={styles.quickReportType}>{report.type}</Text>
                  <Text style={styles.quickReportDate}>Generated: {report.generated}</Text>
                </View>
                <View style={styles.quickReportActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Download size={16} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Share size={16} color="#007AFF" />
                  </TouchableOpacity>
                </View>
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
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
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  quickReportsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  quickReportsList: {
    gap: 12,
  },
  quickReportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quickReportInfo: {
    flex: 1,
  },
  quickReportTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  quickReportType: {
    fontSize: 12,
    color: '#007AFF',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  quickReportDate: {
    fontSize: 12,
    color: '#666',
  },
  quickReportActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f0f8ff',
  },
});