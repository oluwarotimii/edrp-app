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
import { User, Calendar, Clock, FileText, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function CreateBehaviorReportScreen() {
  const [reportData, setReportData] = useState({
    student_id: '',
    student_name: '',
    type: 'positive',
    title: '',
    description: '',
    follow_up_required: false,
    notify_parent: true,
    additional_notes: '',
  });

  const reportTypes = [
    { value: 'positive', label: 'Positive', icon: CheckCircle, color: '#34C759' },
    { value: 'negative', label: 'Negative', icon: AlertTriangle, color: '#FF3B30' },
    { value: 'neutral', label: 'Neutral', icon: Clock, color: '#FF9500' },
  ];

  const students = [
    { id: 'STU001', name: 'Alice Johnson', class: 'Grade 5A' },
    { id: 'STU002', name: 'Bob Smith', class: 'Grade 5B' },
    { id: 'STU003', name: 'Carol Davis', class: 'Grade 4A' },
    { id: 'STU004', name: 'David Wilson', class: 'Grade 5A' },
  ];

  const handleSubmit = () => {
    if (!reportData.student_name || !reportData.title || !reportData.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Behavior report created successfully',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const handleStudentSelect = (student: any) => {
    setReportData({
      ...reportData,
      student_id: student.id,
      student_name: student.name,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Behavior Report</Text>
        <Text style={styles.subtitle}>Document student behavior and incidents</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Student Selection</Text>
            <View style={styles.studentSelector}>
              {students.map((student) => (
                <TouchableOpacity
                  key={student.id}
                  style={[
                    styles.studentOption,
                    reportData.student_id === student.id && styles.selectedStudent
                  ]}
                  onPress={() => handleStudentSelect(student)}
                >
                  <User size={16} color={reportData.student_id === student.id ? '#fff' : '#666'} />
                  <View style={styles.studentInfo}>
                    <Text style={[
                      styles.studentName,
                      reportData.student_id === student.id && styles.selectedStudentText
                    ]}>
                      {student.name}
                    </Text>
                    <Text style={[
                      styles.studentClass,
                      reportData.student_id === student.id && styles.selectedStudentText
                    ]}>
                      {student.class} • {student.id}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Report Type</Text>
            <View style={styles.typeSelector}>
              {reportTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.typeOption,
                    reportData.type === type.value && styles.selectedType,
                    { borderColor: type.color }
                  ]}
                  onPress={() => setReportData({...reportData, type: type.value})}
                >
                  <type.icon 
                    size={20} 
                    color={reportData.type === type.value ? type.color : '#666'} 
                  />
                  <Text style={[
                    styles.typeText,
                    reportData.type === type.value && { color: type.color }
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Report Details</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Title *</Text>
              <View style={styles.inputWrapper}>
                <FileText size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Brief title for the behavior report"
                  value={reportData.title}
                  onChangeText={(text) => setReportData({...reportData, title: text})}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description *</Text>
              <View style={styles.textAreaWrapper}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Detailed description of the behavior or incident..."
                  value={reportData.description}
                  onChangeText={(text) => setReportData({...reportData, description: text})}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Additional Notes</Text>
              <View style={styles.textAreaWrapper}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Any additional notes or context (optional)..."
                  value={reportData.additional_notes}
                  onChangeText={(text) => setReportData({...reportData, additional_notes: text})}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Options</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setReportData({...reportData, notify_parent: !reportData.notify_parent})}
              >
                <View style={[
                  styles.checkbox,
                  reportData.notify_parent && styles.checkedBox
                ]}>
                  {reportData.notify_parent && <CheckCircle size={16} color="#fff" />}
                </View>
                <Text style={styles.optionText}>Notify Parent/Guardian</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setReportData({...reportData, follow_up_required: !reportData.follow_up_required})}
              >
                <View style={[
                  styles.checkbox,
                  reportData.follow_up_required && styles.checkedBox
                ]}>
                  {reportData.follow_up_required && <CheckCircle size={16} color="#fff" />}
                </View>
                <Text style={styles.optionText}>Follow-up Required</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Create Report</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  studentSelector: {
    gap: 8,
  },
  studentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  selectedStudent: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  studentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  studentClass: {
    fontSize: 12,
    color: '#666',
  },
  selectedStudentText: {
    color: '#fff',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
    gap: 8,
  },
  selectedType: {
    backgroundColor: '#f8f9ff',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
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
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  textAreaWrapper: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    gap: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
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