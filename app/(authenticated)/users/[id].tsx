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
import { mockUsers } from '@/data/mockData';
import { User, Mail, Calendar, Shield, CreditCard as Edit, Settings, Lock, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react-native';

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams();
  const user = mockUsers.find(u => u.id === id);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  const handleEditUser = () => {
    router.push({
      pathname: '/(authenticated)/users/edit',
      params: { userId: user.id }
    });
  };

  const handleChangePassword = () => {
    router.push({
      pathname: '/(authenticated)/users/change-password',
      params: { userId: user.id }
    });
  };

  const handleToggleStatus = () => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    Alert.alert(
      'Change Status',
      `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this user?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => Alert.alert('Success', `User ${newStatus}`) }
      ]
    );
  };

  const handleDeleteUser = () => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Deleted', 'User deleted successfully') }
      ]
    );
  };

  const getStatusIcon = () => {
    switch (user.status) {
      case 'active':
        return <CheckCircle size={20} color="#34C759" />;
      case 'pending':
        return <Clock size={20} color="#FF9500" />;
      default:
        return <XCircle size={20} color="#FF3B30" />;
    }
  };

  const quickActions = [
    { title: 'Edit Profile', icon: Edit, action: handleEditUser },
    { title: 'Change Password', icon: Lock, action: handleChangePassword },
    { title: 'User Settings', icon: Settings, action: () => Alert.alert('Settings', 'User settings') },
    { title: 'View Permissions', icon: Shield, action: () => Alert.alert('Permissions', 'User permissions') },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userAvatar}>
          <User size={40} color="#fff" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
          <View style={styles.statusContainer}>
            {getStatusIcon()}
            <Text style={[
              styles.statusText,
              { color: 
                user.status === 'active' ? '#34C759' : 
                user.status === 'pending' ? '#FF9500' : '#FF3B30'
              }
            ]}>
              {user.status}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditUser}>
          <Edit size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <User size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>{user.name}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Mail size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Shield size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Role</Text>
                <Text style={styles.infoValue}>{user.role}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Calendar size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Created</Text>
                <Text style={styles.infoValue}>{user.created_at}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Clock size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Last Login</Text>
                <Text style={styles.infoValue}>
                  {user.last_login || 'Never logged in'}
                </Text>
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
                <action.icon size={24} color="#007AFF" />
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Management</Text>
          <View style={styles.managementCard}>
            <TouchableOpacity style={styles.managementItem} onPress={handleToggleStatus}>
              <View style={styles.managementInfo}>
                <Text style={styles.managementTitle}>
                  {user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                </Text>
                <Text style={styles.managementDescription}>
                  {user.status === 'active' 
                    ? 'Temporarily disable user access' 
                    : 'Enable user access to the system'
                  }
                </Text>
              </View>
              <View style={[
                styles.managementIcon,
                { backgroundColor: user.status === 'active' ? '#FF9500' : '#34C759' }
              ]}>
                {user.status === 'active' ? 
                  <XCircle size={20} color="#fff" /> : 
                  <CheckCircle size={20} color="#fff" />
                }
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.managementItem} onPress={handleDeleteUser}>
              <View style={styles.managementInfo}>
                <Text style={[styles.managementTitle, { color: '#FF3B30' }]}>
                  Delete User
                </Text>
                <Text style={styles.managementDescription}>
                  Permanently remove user from the system
                </Text>
              </View>
              <View style={[styles.managementIcon, { backgroundColor: '#FF3B30' }]}>
                <XCircle size={20} color="#fff" />
              </View>
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
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  editButton: {
    padding: 8,
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
  managementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  managementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  managementInfo: {
    flex: 1,
    marginRight: 16,
  },
  managementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  managementDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  managementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});