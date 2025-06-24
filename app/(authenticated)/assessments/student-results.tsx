import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, User, TrendingUp, TrendingDown, Award, BookOpen } from 'lucide-react-native';

export default function StudentResultsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const studentResults = [
    {
      id: 'result1',
      student_name: 'Alice Johnson',
      student_id: 'STU001',
      class: 'Grade 5A',
      overall_grade: 'A',
      overall_percentage: 92.5,
      subjects: [
        { name: 'Mathematics', grade: 'A+', percentage: 95, trend: 'up' },
        { name: 'English', grade: 'A', percentage: 88, trend: 'up' },
        { name: 'Science', grade: 'A', percentage: 94, trend: 'stable' },
        { name: 'History', grade: 'B+', percentage: 82, trend: 'down' }
      ],
      recent_assessments: [
        { name: 'Math Quiz 1', score: 48, total: 50, grade: 'A+' },
        { name: 'English Essay', score: 85, total: 100, grade: 'A' },
        { name: 'Science Lab Test', score: 70, total: 75, grade: 'A' }
      ]
    },
    {
      id: 'result2',
      student_name: 'Bob Smith',
      student_id: 'STU002',
      class: 'Grade 5B',
      overall_grade: 'B+',
      overall_percentage: 85.2,
      subjects: [
        { name: 'Mathematics', grade: 'B', percentage: 78, trend: 'up' },
        { name: 'English', grade: 'A-', percentage: 87, trend: 'up' },
        { name: 'Science', grade: 'B+', percentage: 83, trend: 'stable' },
        { name: 'History', grade: 'A', percentage: 92, trend: 'up' }
      ],
      recent_assessments: [
        { name: 'Math Quiz 1', score: 39, total: 50, grade: 'B' },
        { name: 'English Essay', score: 87, total: 100, grade: 'A-' },
        { name: 'Science Lab Test', score: 62, total: 75, grade: 'B+' }
      ]
    }
  ];

  const filteredResults = studentResults.filter(result =>
    result.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.student_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return '#34C759';
    if (grade.startsWith('B')) return '#007AFF';
    if (grade.startsWith('C')) return '#FF9500';
    return '#FF3B30';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} color="#34C759" />;
      case 'down':
        return <TrendingDown size={14} color="#FF3B30" />;
      default:
        return null;
    }
  };

  const renderStudentResult = ({ item }: { item: any }) => (
    <View style={styles.resultCard}>
      <View style={styles.studentHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.student_name}</Text>
          <Text style={styles.studentDetails}>{item.class} • {item.student_id}</Text>
        </View>
        <View style={styles.overallGrade}>
          <Text style={[styles.gradeText, { color: getGradeColor(item.overall_grade) }]}>
            {item.overall_grade}
          </Text>
          <Text style={styles.percentageText}>{item.overall_percentage}%</Text>
        </View>
      </View>

      <View style={styles.subjectsSection}>
        <Text style={styles.sectionTitle}>Subject Performance</Text>
        <View style={styles.subjectsGrid}>
          {item.subjects.map((subject: any, index: number) => (
            <View key={index} style={styles.subjectItem}>
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                {getTrendIcon(subject.trend)}
              </View>
              <View style={styles.subjectGrade}>
                <Text style={[styles.subjectGradeText, { color: getGradeColor(subject.grade) }]}>
                  {subject.grade}
                </Text>
                <Text style={styles.subjectPercentage}>{subject.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.assessmentsSection}>
        <Text style={styles.sectionTitle}>Recent Assessments</Text>
        {item.recent_assessments.map((assessment: any, index: number) => (
          <View key={index} style={styles.assessmentItem}>
            <View style={styles.assessmentInfo}>
              <Text style={styles.assessmentName}>{assessment.name}</Text>
              <Text style={styles.assessmentScore}>
                {assessment.score}/{assessment.total}
              </Text>
            </View>
            <View style={[styles.assessmentGrade, { backgroundColor: getGradeColor(assessment.grade) }]}>
              <Text style={styles.assessmentGradeText}>{assessment.grade}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Results</Text>
        <Text style={styles.subtitle}>View individual student academic performance</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.overallStats}>
        <View style={styles.overallStatCard}>
          <Award size={24} color="#34C759" />
          <Text style={styles.overallStatValue}>88.9%</Text>
          <Text style={styles.overallStatLabel}>Class Average</Text>
        </View>
        <View style={styles.overallStatCard}>
          <User size={24} color="#007AFF" />
          <Text style={styles.overallStatValue}>{studentResults.length}</Text>
          <Text style={styles.overallStatLabel}>Students</Text>
        </View>
      </View>

      <FlatList
        data={filteredResults}
        renderItem={renderStudentResult}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <BookOpen size={48} color="#ccc" />
            <Text style={styles.emptyText}>No student results found</Text>
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
  searchContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  overallStats: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  overallStatCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  overallStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  overallStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  resultCard: {
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
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  studentDetails: {
    fontSize: 14,
    color: '#666',
  },
  overallGrade: {
    alignItems: 'center',
  },
  gradeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  percentageText: {
    fontSize: 14,
    color: '#666',
  },
  subjectsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  subjectItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  subjectGrade: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectGradeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subjectPercentage: {
    fontSize: 12,
    color: '#666',
  },
  assessmentsSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  assessmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  assessmentInfo: {
    flex: 1,
  },
  assessmentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  assessmentScore: {
    fontSize: 12,
    color: '#666',
  },
  assessmentGrade: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  assessmentGradeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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