import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { Users, UserCheck, BookOpen, Calendar, DollarSign, TrendingUp, Bell, CircleAlert as AlertCircle, MapPin, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Students', value: '1,234', icon: Users, color: '#007AFF' },
    { title: 'Active Teachers', value: '85', icon: UserCheck, color: '#34C759' },
    { title: 'Classes', value: '48', icon: BookOpen, color: '#FF9500' },
    { title: 'Today\'s Attendance', value: '94%', icon: Calendar, color: '#AF52DE' },
  ];

  const quickActions = [
    { title: 'Take Attendance', icon: Calendar, screen: 'attendance' },
    { title: 'View Students', icon: Users, screen: 'students' },
    { title: 'Send Message', icon: Bell, screen: 'messages' },
    { title: 'Fee Collection', icon: DollarSign, screen: 'fees' },
    { title: 'Location Check-in', icon: MapPin, screen: 'location-verification' },
    { title: 'Quick Reports', icon: TrendingUp, screen: 'reports' },
  ];

  const recentActivities = [
    { title: 'New student admission approved', time: '2 hours ago', type: 'success' },
    { title: '5 pending fee payments', time: '4 hours ago', type: 'warning' },
    { title: 'Teacher leave request submitted', time: '1 day ago', type: 'info' },
    { title: 'Monthly report generated', time: '2 days ago', type: 'success' },
  ];

  const handleQuickAction = (screen: string) => {
    switch (screen) {
      case 'attendance':
        router.push('/(authenticated)/attendance/take');
        break;
      case 'students':
        router.push('/(authenticated)/(tabs)/students');
        break;
      case 'messages':
        router.push('/(authenticated)/messages/create');
        break;
      case 'fees':
        router.push('/(authenticated)/fees');
        break;
      case 'location-verification':
        router.push('/(authenticated)/attendance/location-verification');
        break;
      case 'reports':
        router.push('/(authenticated)/reports');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning, {user?.name}!</Text>
        <Text style={styles.subtitle}>Here's what's happening at {user?.school_name}</Text>
      </View>

      {/* Location Check-in Button - Prominent placement */}
      <View style={styles.locationCheckIn}>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={() => router.push('/(authenticated)/attendance/location-verification')}
        >
          <MapPin size={24} color="#fff" />
          <View style={styles.locationButtonText}>
            <Text style={styles.locationButtonTitle}>Location Check-in</Text>
            <Text style={styles.locationButtonSubtitle}>Mark your attendance</Text>
          </View>
          <Clock size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <TouchableOpacity key={index} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction(action.screen)}
            >
              <action.icon size={32} color="#007AFF" />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <View style={styles.activitiesContainer}>
          {recentActivities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={[
                styles.activityIndicator,
                { backgroundColor: 
                  activity.type === 'success' ? '#34C759' :
                  activity.type === 'warning' ? '#FF9500' :
                  '#007AFF'
                }
              ]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Today's Schedule */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>09:00 AM</Text>
            <Text style={styles.scheduleTitle}>Math Class - Grade 5A</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>11:00 AM</Text>
            <Text style={styles.scheduleTitle}>Staff Meeting</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>02:00 PM</Text>
            <Text style={styles.scheduleTitle}>Parent Conference</Text>
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
  greeting: {
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
  locationCheckIn: {
    padding: 20,
    paddingBottom: 10,
  },
  locationButton: {
    backgroundColor: '#34C759',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  locationButtonText: {
    flex: 1,
    marginLeft: 16,
  },
  locationButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  locationButtonSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    paddingTop: 10,
    gap: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: (width - 55) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
  },
  quickActionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: (width - 55) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  activitiesContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  scheduleContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    width: 80,
  },
  scheduleTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});