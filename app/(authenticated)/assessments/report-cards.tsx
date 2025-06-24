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
import { Search, Download, Share, FileText, Calendar, Users, Award } from 'lucide-react-native';

export default function ReportCardsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('First Term');

  const reportCards = [
    {
      id: 'report1',
      student_name: 'Alice Johnson',
      student_id: 'STU001',
      class: 'Grade 5A',
      term: 'First Term',
      academic_year: '2024-2025',
      overall_grade: 'A',
      overall_percentage: 92.5,
      rank: 2,
      total_students: 28,
      subjects: [
        { name: 'Mathematics', grade: 'A+', marks: 95, total: 100 },
        { name: 'English', grade: 'A', marks: 88, total: 100 },
        { name: 'Science', grade: 'A', marks: 94, total: 100 },
        { name: 'History', grade: 'B+', marks: 82, total: 100 }
      ],
      attendance: 95,
      conduct: 'Excellent',
      generated_date: '2024-01-20',
      status: 'generated'
    },
    {
      id: 'report2',
      student_name: 'Bob Smith',
      student_id: 'STU002',
      class: 'Grade 5B',
      term: 'First Term',
      academic_year: '2024-2025',
      overall_grade: 'B+',
      overall_percentage: 85.2,
      rank: 8,
      total_students: 25,
      subjects: [
        { name: 'Mathematics', grade: 'B', marks: 78, total: 100 },
        { name: 'English', grade: 'A-', marks: 87, total: 100 },
        { name: 'Science', grade: 'B+', marks: 83, total: 100 },
        { name: 'History', grade: 'A', marks: 92, total: 100 }
      ],
      attendance: 88,
      conduct: 'Good',
      generated_date: '2024-01-20',
      status: 'generated'
    }
  ];

  const filteredReports = reportCards.filter(report =>
    report.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.student_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return '#34C759';
    if (grade.startsWith('B')) return '#007AFF';
    if (grade.startsWith('C')) return '#FF9500';
    return '#FF3B30';
  };

  const handleDownloadReport = (reportId: string, studentName: string) => {
    Alert.alert('Download Report', `Downloading report card for ${studentName}`);
  };

  const handleShareReport = (reportId: string, studentName: string) => {
    Alert.alert('Share Report', `Sharing report card for ${studentName}`);
  };

  const handleGenerateAllReports = () => {
    Alert.alert('Generate Reports', 'This would generate report cards for all students');
  };

  const renderReportCard = ({ item }: { item: any }) => (
    <View style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.student_name}</Text>
          <Text style={styles.studentDetails}>{item.class} • {item.student_id}</Text>
          <Text style={styles.termInfo}>{item.term} • {item.academic_year}</Text>
        </View>
        <View style={styles.gradeContainer}>
          <Text style={[styles.overallGrade, { color: getGradeColor(item.overall_grade) }]}>
            {item.overall_grade}
          </Text>
          <Text style={styles.percentage}>{item.overall_percentage}%</Text>
          <Text style={styles.rank}>Rank: {item.rank}/{item.total_students}</Text>
        </View>
      </View>

      <View style={styles.subjectsPreview}>
        <Text style={styles.subjectsTitle}>Subject Grades</Text>
        <View style={styles.subjectsGrid}>
          {item.subjects.slice(0, 4).map((subject: any, index: number) => (
            <View key={index} style={styles.subjectChip}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={[styles.subjectGrade, { color: getGradeColor(subject.grade) }]}>
                {subject.grade}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.additionalInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Attendance:</Text>
          <Text style={styles.infoValue}>{item.attendance}%</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Conduct:</Text>
          <Text style={styles.infoValue}>{item.conduct}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Generated:</Text>
          <Text style={styles.infoValue}>{item.generated_date}</Text>
        </View>
      </View>

      <View style={styles.reportActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDownloadReport(item.id, item.student_name)}
        >
          <Download size={16} color="#007AFF" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShareReport(item.id, item.student_name)}
        >
          <Share size={16} color="#007AFF" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Report Cards</Text>
        <Text style={styles.subtitle}>Generate and manage student report cards</Text>
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
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateAllReports}>
          <FileText size={20} color="#fff" />
          <Text style={styles.generateButtonText}>Generate All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.termSelector}>
        <Text style={styles.termLabel}>Term:</Text>
        <View style={styles.termButtons}>
          {['First Term', 'Second Term', 'Third Term'].map((term) => (
            <TouchableOpacity
              key={term}
              style={[
                styles.termButton,
                selectedTerm === term && styles.selectedTerm
              ]}
              onPress={() => setSelectedTerm(term)}
            >
              <Text style={[
                styles.termButtonText,
                selectedTerm === term && styles.selectedTermText
              ]}>
                {term}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Award size={20} color="#34C759" />
          <Text style={styles.statValue}>{reportCards.length}</Text>
          <Text style={styles.statLabel}>Reports Generated</Text>
        </View>
        <View style={styles.statCard}>
          <Users size={20} color="#007AFF" />
          <Text style={styles.statValue}>88.9%</Text>
          <Text style={styles.statLabel}>Class Average</Text>
        </View>
        <View style={styles.statCard}>
          <Calendar size={20} color="#FF9500" />
          <Text style={styles.statValue}>{selectedTerm}</Text>
          <Text style={styles.statLabel}>Current Term</Text>
        </View>
      </View>

      <FlatList
        data={filteredReports}
        renderItem={renderReportCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FileText size={48} color="#ccc" />
            <Text style={styles.emptyText}>No report cards found</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
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
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C759',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  termSelector: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  termLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  termButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  termButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  selectedTerm: {
    backgroundColor: '#007AFF',
  },
  termButtonText: {
    fontSize: 12,
    color: '#666',
  },
  selectedTermText: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
    marginBottom: 2,
  },
  termInfo: {
    fontSize: 12,
    color: '#999',
  },
  gradeContainer: {
    alignItems: 'center',
  },
  overallGrade: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  percentage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  rank: {
    fontSize: 12,
    color: '#999',
  },
  subjectsPreview: {
    marginBottom: 16,
  },
  subjectsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectChip: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subjectName: {
    fontSize: 12,
    color: '#666',
  },
  subjectGrade: {
    fontSize: 12,
    fontWeight: '600',
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f0f8ff',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
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