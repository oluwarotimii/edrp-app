import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { FileText, Clock, Users, Shield, BookOpen } from 'lucide-react-native';

export default function SchoolPoliciesScreen() {
  const [policies, setPolicies] = useState({
    attendance: 'Students must maintain at least 85% attendance rate to be eligible for examinations.',
    discipline: 'The school follows a progressive discipline policy with clear consequences for misconduct.',
    academic: 'Students are expected to maintain academic integrity and complete all assignments on time.',
    uniform: 'All students must wear the prescribed school uniform during school hours.',
    technology: 'Personal devices are allowed but must be used responsibly and in accordance with school guidelines.',
    safety: 'The school maintains a zero-tolerance policy for bullying, harassment, and violence.',
  });

  const policyCategories = [
    {
      key: 'attendance',
      title: 'Attendance Policy',
      icon: Clock,
      description: 'Rules and requirements for student attendance',
    },
    {
      key: 'discipline',
      title: 'Discipline Policy',
      icon: Shield,
      description: 'Behavioral expectations and disciplinary procedures',
    },
    {
      key: 'academic',
      title: 'Academic Policy',
      icon: BookOpen,
      description: 'Academic standards and integrity guidelines',
    },
    {
      key: 'uniform',
      title: 'Uniform Policy',
      icon: Users,
      description: 'Dress code and uniform requirements',
    },
    {
      key: 'technology',
      title: 'Technology Policy',
      icon: FileText,
      description: 'Guidelines for technology use in school',
    },
    {
      key: 'safety',
      title: 'Safety Policy',
      icon: Shield,
      description: 'Safety protocols and emergency procedures',
    },
  ];

  const handlePolicyUpdate = (key: string, value: string) => {
    setPolicies(prev => ({ ...prev, [key]: value }));
  };

  const handleSavePolicies = () => {
    Alert.alert('Success', 'School policies updated successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>School Policies</Text>
        <Text style={styles.subtitle}>Update and manage school policies</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <FileText size={24} color="#007AFF" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Policy Management</Text>
            <Text style={styles.infoDescription}>
              These policies will be displayed to students, parents, and staff. 
              Make sure they are clear, comprehensive, and up-to-date.
            </Text>
          </View>
        </View>

        {policyCategories.map((category) => (
          <View key={category.key} style={styles.policySection}>
            <View style={styles.policyHeader}>
              <category.icon size={20} color="#007AFF" />
              <View style={styles.policyHeaderText}>
                <Text style={styles.policyTitle}>{category.title}</Text>
                <Text style={styles.policyDescription}>{category.description}</Text>
              </View>
            </View>
            <View style={styles.policyInputContainer}>
              <TextInput
                style={styles.policyInput}
                value={policies[category.key as keyof typeof policies]}
                onChangeText={(text) => handlePolicyUpdate(category.key, text)}
                multiline
                numberOfLines={4}
                placeholder={`Enter ${category.title.toLowerCase()}...`}
                textAlignVertical="top"
              />
            </View>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePolicies}>
            <Text style={styles.saveButtonText}>Save Policies</Text>
          </TouchableOpacity>
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
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  policySection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  policyHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  policyDescription: {
    fontSize: 14,
    color: '#666',
  },
  policyInputContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  policyInput: {
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});