import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Save, Users, BookOpen, Award } from 'lucide-react-native';

export default function ScoreEntryScreen() {
  const [selectedAssessment, setSelectedAssessment] = useState('Math Quiz 1');
  const [scores, setScores] = useState<{[key: string]: string}>({});

  const assessmentInfo = {
    name: 'Math Quiz 1',
    subject: 'Mathematics',
    class: 'Grade 5A',
    total_marks: 50,
    date: '2024-01-25'
  };

  const students = [
    { id: 'student1', name: 'Alice Johnson', student_id: 'STU001' },
    { id: 'student2', name: 'Bob Smith', student_id: 'STU002' },
    { id: 'student3', name: 'Carol Davis', student_id: 'STU003' },
    { id: 'student4', name: 'David Wilson', student_id: 'STU004' },
    { id: 'student5', name: 'Eva Brown', student_id: 'STU005' },
  ];

  const handleScoreChange = (studentId: string, score: string) => {
    setScores(prev => ({ ...prev, [studentId]: score }));
  };

  const handleSaveScores = () => {
    const enteredScores = Object.keys(scores).length;
    const totalStudents = students.length;
    
    if (enteredScores < totalStudents) {
      Alert.alert(
        'Incomplete Scores',
        `You have entered scores for ${enteredScores} out of ${totalStudents} students. Continue anyway?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Save', onPress: () => saveScores() }
        ]
      );
    } else {
      saveScores();
    }
  };

  const saveScores = () => {
    Alert.alert('Success', 'Scores saved successfully', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const getGrade = (score: number, totalMarks: number) => {
    const percentage = (score / totalMarks) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  const getScoreStats = () => {
    const validScores = Object.values(scores)
      .filter(score => score && !isNaN(Number(score)))
      .map(score => Number(score));
    
    if (validScores.length === 0) return { average: 0, highest: 0, lowest: 0, entered: 0 };
    
    return {
      average: Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length),
      highest: Math.max(...validScores),
      lowest: Math.min(...validScores),
      entered: validScores.length
    };
  };

  const stats = getScoreStats();

  const renderStudent = ({ item }: { item: any }) => {
    const score = scores[item.id];
    const numericScore = score ? Number(score) : 0;
    const grade = score && !isNaN(numericScore) ? getGrade(numericScore, assessmentInfo.total_marks) : '';

    return (
      <View style={styles.studentCard}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentId}>ID: {item.student_id}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <TextInput
            style={styles.scoreInput}
            placeholder="0"
            value={score || ''}
            onChangeText={(text) => handleScoreChange(item.id, text)}
            keyboardType="numeric"
            maxLength={3}
          />
          <Text style={styles.totalMarks}>/ {assessmentInfo.total_marks}</Text>
          {grade && (
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeText}>{grade}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Score Entry</Text>
        <Text style={styles.subtitle}>Enter student scores and grades</Text>
      </View>

      <View style={styles.assessmentInfo}>
        <View style={styles.assessmentHeader}>
          <BookOpen size={20} color="#007AFF" />
          <Text style={styles.assessmentName}>{assessmentInfo.name}</Text>
        </View>
        <Text style={styles.assessmentDetails}>
          {assessmentInfo.subject} • {assessmentInfo.class} • {assessmentInfo.date}
        </Text>
        <Text style={styles.totalMarksInfo}>Total Marks: {assessmentInfo.total_marks}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.average}</Text>
          <Text style={styles.statLabel}>Average</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.highest}</Text>
          <Text style={styles.statLabel}>Highest</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.lowest}</Text>
          <Text style={styles.statLabel}>Lowest</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.entered}/{students.length}</Text>
          <Text style={styles.statLabel}>Entered</Text>
        </View>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Enter scores out of {assessmentInfo.total_marks} marks. Grades will be calculated automatically.
        </Text>
      </View>

      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Users size={48} color="#ccc" />
            <Text style={styles.emptyText}>No students found</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveScores}>
          <Save size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save Scores</Text>
        </TouchableOpacity>
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
    backgroundColor: '#007AFF',
    paddingTop: 60,
    paddingBottom: 20,
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
  assessmentInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  assessmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  assessmentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  assessmentDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  totalMarksInfo: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
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
  },
  instructionsContainer: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0f0ff',
  },
  instructionsText: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#666',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    textAlign: 'center',
    minWidth: 60,
    backgroundColor: '#f9f9f9',
  },
  totalMarks: {
    fontSize: 16,
    color: '#666',
  },
  gradeBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  gradeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#34C759',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});