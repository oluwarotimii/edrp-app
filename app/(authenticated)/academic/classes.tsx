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
import { mockClasses } from '@/data/mockData';
import { Search, Plus, Users, User, MapPin, Clock } from 'lucide-react-native';

export default function ClassesScreen() {
  const [classes, setClasses] = useState(mockClasses);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClass = () => {
    Alert.alert('Create Class', 'This would open the create class form');
  };

  const renderClass = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.classCard}
      onPress={() => router.push(`/(authenticated)/academic/classes/${item.id}`)}
    >
      <View style={styles.classHeader}>
        <View style={styles.classIcon}>
          <Users size={24} color="#34C759" />
        </View>
        <View style={styles.classInfo}>
          <Text style={styles.className}>{item.name}</Text>
          <View style={styles.classDetails}>
            <User size={14} color="#666" />
            <Text style={styles.classTeacher}>{item.teacher}</Text>
          </View>
        </View>
        <View style={styles.studentCount}>
          <Text style={styles.studentCountNumber}>{item.student_count}</Text>
          <Text style={styles.studentCountLabel}>Students</Text>
        </View>
      </View>
      
      <View style={styles.classFooter}>
        <View style={styles.classDetail}>
          <MapPin size={14} color="#666" />
          <Text style={styles.classDetailText}>{item.room}</Text>
        </View>
        <View style={styles.classDetail}>
          <Clock size={14} color="#666" />
          <Text style={styles.classDetailText}>{item.schedule}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Classes</Text>
        <Text style={styles.subtitle}>Manage academic classes</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search classes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateClass}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{classes.length}</Text>
          <Text style={styles.statLabel}>Total Classes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {classes.reduce((sum, cls) => sum + cls.student_count, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Students</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {Math.round(classes.reduce((sum, cls) => sum + cls.student_count, 0) / classes.length)}
          </Text>
          <Text style={styles.statLabel}>Avg per Class</Text>
        </View>
      </View>

      <FlatList
        data={filteredClasses}
        renderItem={renderClass}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Users size={48} color="#ccc" />
            <Text style={styles.emptyText}>No classes found</Text>
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
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    marginLeft: 12,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  listContainer: {
    padding: 20,
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  classIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0fff4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classTeacher: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  studentCount: {
    alignItems: 'center',
  },
  studentCountNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34C759',
  },
  studentCountLabel: {
    fontSize: 12,
    color: '#666',
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  classDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
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