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
import { DollarSign, CreditCard, FileText, Users, TrendingUp, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function FeesScreen() {
  const feeModules = [
    {
      title: 'Fee Types',
      description: 'Manage different fee categories',
      icon: FileText,
      route: '/(authenticated)/fees/types',
      color: '#007AFF',
    },
    {
      title: 'Student Fees',
      description: 'Manage individual student fees',
      icon: Users,
      route: '/(authenticated)/fees/student-fees',
      color: '#34C759',
    },
    {
      title: 'Payments',
      description: 'Process and track payments',
      icon: CreditCard,
      route: '/(authenticated)/fees/payments',
      color: '#FF9500',
    },
    {
      title: 'Fee Reports',
      description: 'Generate fee collection reports',
      icon: TrendingUp,
      route: '/(authenticated)/fees/reports',
      color: '#AF52DE',
    },
  ];

  const handleModulePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fee Management</Text>
        <Text style={styles.subtitle}>Manage school fees and payment tracking</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.overviewCard}>
          <DollarSign size={24} color="#007AFF" />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewTitle}>Fee Collection Overview</Text>
            <Text style={styles.overviewText}>
              Comprehensive fee management system for tracking payments, 
              generating invoices, and managing different fee categories.
            </Text>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹2.4M</Text>
            <Text style={styles.statLabel}>Total Collected</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹450K</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>84%</Text>
            <Text style={styles.statLabel}>Collection Rate</Text>
          </View>
        </View>

        <View style={styles.statusCards}>
          <View style={styles.statusCard}>
            <CheckCircle size={20} color="#34C759" />
            <Text style={styles.statusValue}>1,045</Text>
            <Text style={styles.statusLabel}>Paid Students</Text>
          </View>
          <View style={styles.statusCard}>
            <Clock size={20} color="#FF9500" />
            <Text style={styles.statusValue}>189</Text>
            <Text style={styles.statusLabel}>Pending Payments</Text>
          </View>
          <View style={styles.statusCard}>
            <AlertCircle size={20} color="#FF3B30" />
            <Text style={styles.statusValue}>23</Text>
            <Text style={styles.statusLabel}>Overdue</Text>
          </View>
        </View>

        <View style={styles.modulesGrid}>
          {feeModules.map((module, index) => (
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

        <View style={styles.recentPayments}>
          <Text style={styles.paymentsTitle}>Recent Payments</Text>
          <View style={styles.paymentsList}>
            <View style={styles.paymentItem}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentStudent}>Alice Johnson</Text>
                <Text style={styles.paymentType}>Tuition Fee - Q1</Text>
              </View>
              <Text style={styles.paymentAmount}>₹15,000</Text>
            </View>
            <View style={styles.paymentItem}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentStudent}>Bob Smith</Text>
                <Text style={styles.paymentType}>Transport Fee</Text>
              </View>
              <Text style={styles.paymentAmount}>₹3,500</Text>
            </View>
            <View style={styles.paymentItem}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentStudent}>Carol Davis</Text>
                <Text style={styles.paymentType}>Library Fee</Text>
              </View>
              <Text style={styles.paymentAmount}>₹500</Text>
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
    marginBottom: 16,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statusCards: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statusCard: {
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
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  statusLabel: {
    fontSize: 11,
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
  recentPayments: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  paymentsList: {
    gap: 12,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentStudent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  paymentType: {
    fontSize: 12,
    color: '#666',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
  },
});