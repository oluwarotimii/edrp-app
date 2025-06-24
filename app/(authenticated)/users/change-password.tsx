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
import { useLocalSearchParams, router } from 'expo-router';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react-native';

export default function ChangePasswordScreen() {
  const { userId } = useLocalSearchParams();
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    };
  };

  const passwordValidation = validatePassword(passwords.new);

  const handleSubmit = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (!passwordValidation.isValid) {
      Alert.alert('Error', 'Please ensure your new password meets all requirements');
      return;
    }

    Alert.alert(
      'Success',
      'Password changed successfully',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <View style={styles.requirementRow}>
      <View style={[styles.requirementDot, { backgroundColor: met ? '#34C759' : '#e0e0e0' }]} />
      <Text style={[styles.requirementText, { color: met ? '#34C759' : '#666' }]}>
        {text}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subtitle}>Update your account password</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.securityNotice}>
          <Shield size={24} color="#007AFF" />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Security Notice</Text>
            <Text style={styles.noticeText}>
              Choose a strong password that you haven't used elsewhere. 
              Your password will be encrypted and stored securely.
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Current Password</Text>
            <View style={styles.passwordInputContainer}>
              <Lock size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.passwordInput}
                value={passwords.current}
                onChangeText={(text) => handlePasswordChange('current', text)}
                secureTextEntry={!showPasswords.current}
                placeholder="Enter current password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={styles.passwordInputContainer}>
              <Lock size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.passwordInput}
                value={passwords.new}
                onChangeText={(text) => handlePasswordChange('new', text)}
                secureTextEntry={!showPasswords.new}
                placeholder="Enter new password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm New Password</Text>
            <View style={styles.passwordInputContainer}>
              <Lock size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.passwordInput}
                value={passwords.confirm}
                onChangeText={(text) => handlePasswordChange('confirm', text)}
                secureTextEntry={!showPasswords.confirm}
                placeholder="Confirm new password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {passwords.new.length > 0 && (
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Password Requirements</Text>
              <PasswordRequirement 
                met={passwordValidation.minLength} 
                text="At least 8 characters long" 
              />
              <PasswordRequirement 
                met={passwordValidation.hasUpperCase} 
                text="Contains uppercase letter" 
              />
              <PasswordRequirement 
                met={passwordValidation.hasLowerCase} 
                text="Contains lowercase letter" 
              />
              <PasswordRequirement 
                met={passwordValidation.hasNumbers} 
                text="Contains number" 
              />
              <PasswordRequirement 
                met={passwordValidation.hasSpecialChar} 
                text="Contains special character" 
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Change Password</Text>
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
  securityNotice: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  noticeContent: {
    flex: 1,
    marginLeft: 12,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginLeft: 12,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  eyeIcon: {
    padding: 12,
  },
  requirementsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  requirementText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});