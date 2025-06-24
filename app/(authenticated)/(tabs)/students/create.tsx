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
import { User, Mail, Calendar, School, Phone } from 'lucide-react-native';

export default function CreateStudentScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    student_id: '',
    class: '',
    date_of_birth: '',
    admission_date: '',
    parent_name: '',
    parent_phone: '',
    parent_email: '',
    address: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.student_id) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Student created successfully',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          
          <View style={styles.inputContainer}>
            <User size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address *"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <School size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Student ID *"
              value={formData.student_id}
              onChangeText={(text) => setFormData({...formData, student_id: text})}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputContainer}>
            <School size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Class/Grade"
              value={formData.class}
              onChangeText={(text) => setFormData({...formData, class: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Calendar size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={formData.date_of_birth}
              onChangeText={(text) => setFormData({...formData, date_of_birth: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Calendar size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Admission Date (YYYY-MM-DD)"
              value={formData.admission_date}
              onChangeText={(text) => setFormData({...formData, admission_date: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => setFormData({...formData, address: text})}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parent/Guardian Information</Text>
          
          <View style={styles.inputContainer}>
            <User size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Parent/Guardian Name"
              value={formData.parent_name}
              onChangeText={(text) => setFormData({...formData, parent_name: text})}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Phone size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Parent Phone Number"
              value={formData.parent_phone}
              onChangeText={(text) => setFormData({...formData, parent_phone: text})}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Parent Email Address"
              value={formData.parent_email}
              onChangeText={(text) => setFormData({...formData, parent_email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Student</Text>
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
  form: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
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