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
import { ChartBar as BarChart3, TrendingUp, Users, GraduationCap, DollarSign, Calendar, FileText, ChartPie as PieChart } from 'lucide-react-native';

export default function AnalyticsScreen() {
  const analyticsModules = [
    {
      title: 'Student Analytics',
      description: 'Student performance and behavior insights',
      icon: Users,
      route: '/(authenticated)/analytics/students',
      color: '#007AFF',
    },
    {
      title: 'Academic Performance',
      description: 'Class and subject performance trends',
      icon: GraduationCap,
      route: '/(authenticated)/analytics/academic',
      color: '#34C759',
    },
    {
      title: 'Attendance Analytics',
      description: 'Attendance patterns and trends',
      icon: Calendar,
      route: '/(authenticated)/analytics/attendance',
      color: '#FF9500',
    },
    {
      title: 'Financial Reports',
      description: 'Fee collection and financial insights',
      icon: DollarSign,
      route: '/(authenticated)/analytics/financial',
      color: '#AF52DE',
    },
    {
      title: 'Custom Reports',
      description: 'Generate custom analytical reports',
      icon: FileText,
      route: '/(authenticated)/analytics/custom',
      color: '#FF3B30',
    },
    {
      title: 'Dashboard Insights',
      description: 'Key performance indicators',
      icon: PieChart,
      route: '/(authenticated)/analytics/dashboard',
      color: '#00C7BE',
    },
  ];

  const handleModulePress = (route: string) => {
    router.push(route as any);
  };

  const keyMetrics = [
    { title: 'Student Enrollment', value: '1,234', change: '+5.2%', trend: 'up' },
    { title: 'Average Attendance', value: '94.2%', change: '+2.1%', trend: 'up' },
    { title: 'Academic Performance', value: '85.7%', change: '+1.8%', trend: 'up' },
    { title: 'Fee Collection Rate', value: '92.5%', change: '-0.5%', trend: 'down' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics & Reports</Text>
        <Text style={styles.subtitle}>Data-driven insights for better decision making</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.overviewCard}>
          <BarChart3 size={24} color="#007AFF" />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewTitle}>Analytics Dashboard</Text>
            <Text style={styles.overviewText}>
              Comprehensive analytics and reporting system providing insights into 
              student performance, attendance patterns, and institutional metrics.
            </Text>
          </View>
        </View>

        <View style={styles.metricsSection}>
          <Text style={styles.metricsTitle}>Key Performance Indicators</Text>
          <View style={styles.metricsGrid}>
            {keyMetrics.map((metric, index) => (
              <View key={index} style={styles.metricCard}>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <View style={styles.metricChange}>
                  <TrendingUp 
                    size={14} 
                    color={metric.trend === 'up' ? '#34C759' : '#FF3B30'} 
                  />
                  <Text style={[
                    styles.metricChangeText,
                    { color: metric.trend === 'up' ? '#34C759' : '#FF3B30' }
                  ]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.modulesGrid}>
          {analyticsModules.map((module, index) => (
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

        <View style={styles.quickInsights}>
          <Text style={styles.insightsTitle}>Quick Insights</Text>
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <TrendingUp size={16} color="#34C759" />
              </View>
              <Text style={styles.insightText}>
                Student performance has improved by 3.2% this quarter
              </Text>
            </View>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Users size={16} color="#007AFF" />
              </View>
              <Text style={styles.insightText}>
                Grade 5A has the highest attendance rate at 97.8%
              </Text>
            </View>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <DollarSign size={16} color="#FF9500" />
              </View>
              <Text style={styles.insightText}>
                Fee collection is 2.3% behind target for this month
              </Text>
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
  metricsSection: {
    marginBottom: 24,
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricChangeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
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
  quickInsights: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});