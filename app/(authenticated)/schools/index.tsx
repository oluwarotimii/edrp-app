import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { mockSchools } from '@/data/mockData';
import { Search, Plus, School, MapPin, Phone, Mail } from 'lucide-react-native';

export default function SchoolsListScreen() {
  const [schools, setSchools] = useState(mockSchools);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSchool = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.schoolCard}
      onPress={() => router.push(`/(authenticated)/schools/${item.id}`)}
    >
      <Image
        source={{ uri: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400' }}
        style={styles.schoolImage}
      />
      <View style={styles.schoolInfo}>
        <View style={styles.schoolHeader}>
          <Text style={styles.schoolName}>{item.name}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: item.status === 'active' ? '#34C759' : '#FF9500' }
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.schoolType}>{item.type}</Text>
        <View style={styles.schoolDetails}>
          <View style={styles.detailRow}>
            <MapPin size={14} color="#666" />
            <Text style={styles.detailText}>{item.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Phone size={14} color="#666" />
            <Text style={styles.detailText}>{item.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Mail size={14} color="#666" />
            <Text style={styles.detailText}>{item.email}</Text>
          </View>
        </View>
        <Text style={styles.establishedText}>Established: {item.established}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>School Management</Text>
        <Text style={styles.subtitle}>Manage all schools in the system</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search schools..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/(authenticated)/schools/create')}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{schools.length}</Text>
          <Text style={styles.statLabel}>Total Schools</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{schools.filter(s => s.status === 'active').length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{schools.filter(s => s.type === 'Elementary').length}</Text>
          <Text style={styles.statLabel}>Elementary</Text>
        </View>
      </View>

      <FlatList
        data={filteredSchools}
        renderItem={renderSchool}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <School size={48} color="#ccc" />
            <Text style={styles.emptyText}>No schools found</Text>
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
  schoolCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  schoolImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  schoolInfo: {
    padding: 16,
  },
  schoolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  schoolType: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 12,
  },
  schoolDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  establishedText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
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