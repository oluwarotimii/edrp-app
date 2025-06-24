import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Clock, CircleCheck as CheckCircle, Circle as XCircle, User, Mail } from 'lucide-react-native';

export default function PendingApprovalsScreen() {
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 'pending1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'teacher',
      requested_date: '2024-01-18',
      school_code: 'SCH001',
    },
    {
      id: 'pending2',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      role: 'staff',
      requested_date: '2024-01-19',
      school_code: 'SCH001',
    },
    {
      id: 'pending3',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      role: 'teacher',
      requested_date: '2024-01-20',
      school_code: 'SCH001',
    },
  ]);

  const handleApprove = (userId: string, userName: string) => {
    Alert.alert(
      'Approve User',
      `Are you sure you want to approve ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            setPendingUsers(prev => prev.filter(user => user.id !== userId));
            Alert.alert('Success', `${userName} has been approved`);
          }
        }
      ]
    );
  };

  const handleReject = (userId: string, userName: string) => {
    Alert.alert(
      'Reject User',
      `Are you sure you want to reject ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setPendingUsers(prev => prev.filter(user => user.id !== userId));
            Alert.alert('Rejected', `${userName} has been rejected`);
          }
        }
      ]
    );
  };

  const renderPendingUser = ({ item }: { item: any }) => (
    <View style={styles.userCard}>
      <View style={styles.userAvatar}>
        <User size={24} color="#fff" />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <View style={styles.userDetails}>
          <Mail size={14} color="#666" />
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <Text style={styles.userRole}>Role: {item.role}</Text>
        <Text style={styles.requestDate}>Requested: {item.requested_date}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => handleApprove(item.id, item.name)}
        >
          <CheckCircle size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleReject(item.id, item.name)}
        >
          <XCircle size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pending User Approvals</Text>
        <Text style={styles.subtitle}>Review and approve new user requests</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Clock size={24} color="#FF9500" />
          <Text style={styles.statValue}>{pendingUsers.length}</Text>
          <Text style={styles.statLabel}>Pending Approvals</Text>
        </View>
      </View>

      <FlatList
        data={pendingUsers}
        renderItem={renderPendingUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CheckCircle size={48} color="#34C759" />
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptyText}>No pending user approvals at the moment</Text>
          </View>
        }
      />
    </View>
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
  statsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statCard: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF9500',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  userRole: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  requestDate: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});