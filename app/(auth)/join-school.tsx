import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { ArrowLeft, School, Mail, User } from 'lucide-react-native';

export default function JoinSchoolScreen() {
  const [formData, setFormData] = useState({
    schoolCode: '',
    name: '',
    email: '',
    role: 'teacher',
  });
  const [loading, setLoading] = useState(false);

  const handleJoinSchool = async () => {
    if (!formData.schoolCode || !formData.name || !formData.email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Mock join school request
      setTimeout(() => {
        Alert.alert(
          'Request Sent', 
          'Your request to join the school has been sent. You will be notified once approved.',
          [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
        );
        setLoading(false);
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to send request');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Join a School</Text>
          <Text style={styles.subtitle}>
            Enter your school code and details to request access
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <School size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="School Code"
              value={formData.schoolCode}
              onChangeText={(text) => setFormData({...formData, schoolCode: text})}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputContainer}>
            <User size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Role:</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'teacher' && styles.selectedRole
                ]}
                onPress={() => setFormData({...formData, role: 'teacher'})}
              >
                <Text style={[
                  styles.roleButtonText,
                  formData.role === 'teacher' && styles.selectedRoleText
                ]}>
                  Teacher
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === 'staff' && styles.selectedRole
                ]}
                onPress={() => setFormData({...formData, role: 'staff'})}
              >
                <Text style={[
                  styles.roleButtonText,
                  formData.role === 'staff' && styles.selectedRoleText
                ]}>
                  Staff
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.joinButton, loading && styles.disabledButton]}
            onPress={handleJoinSchool}
            disabled={loading}
          >
            <Text style={styles.joinButtonText}>
              {loading ? 'Sending Request...' : 'Send Request'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  roleContainer: {
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  selectedRole: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#666',
  },
  selectedRoleText: {
    color: '#fff',
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});