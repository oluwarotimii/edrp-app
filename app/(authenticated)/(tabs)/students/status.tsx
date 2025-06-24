import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { CircleCheck as CheckCircle, Circle as XCircle, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function StudentStatusScreen() {
  const { studentId, currentStatus } = useLocalSearchParams();
  const [selectedStatus, setSelectedStatus] = useState(currentStatus as string);
  const [reason, setReason] = useState('');

  const statusOptions = [
    { value: 'active', label: 'Active', icon: CheckCircle, color: '#34C759' },
    { value: 'suspended', label: 'Suspended', icon: AlertTriangle, color: '#FF9500' },
    { value: 'withdrawn', label: 'Withdrawn', icon: XCircle, color: '#FF3B30' },
    { value: 'graduated', label: 'Graduated', icon: CheckCircle, color: '#007AFF' },
  ];

  const handleUpdateStatus = () => {
    if (selectedStatus !== currentStatus && !reason.trim()) {
      Alert.alert('Error', 'Please provide a reason for the status change');
      return;
    }

    Alert.alert(
      'Success',
      'Student status updated successfully',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Update Student Status</Text>
        <Text style={styles.subtitle}>Current Status: {currentStatus}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Select New Status</Text>
        
        <View style={styles.statusOptions}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.statusOption,
                selectedStatus === option.value && styles.selectedStatus,
                { borderColor: option.color }
              ]}
              onPress={() => setSelectedStatus(option.value)}
            >
              <option.icon 
                size={24} 
                color={selectedStatus === option.value ? option.color : '#666'} 
              />
              <Text style={[
                styles.statusText,
                selectedStatus === option.value && { color: option.color }
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedStatus !== currentStatus && (
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonLabel}>Reason for Change *</Text>
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter reason for status change..."
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateStatus}>
            <Text style={styles.updateButtonText}>Update Status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statusOptions: {
    gap: 12,
    marginBottom: 24,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  selectedStatus: {
    backgroundColor: '#f8f9ff',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    color: '#333',
  },
  reasonContainer: {
    marginBottom: 24,
  },
  reasonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  reasonInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});