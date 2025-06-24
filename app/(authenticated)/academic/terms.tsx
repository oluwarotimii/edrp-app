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
import { Search, Plus, Calendar, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function TermsScreen() {
  const [terms, setTerms] = useState([
    {
      id: 'term1',
      name: 'First Term',
      session: '2024-2025 Academic Year',
      start_date: '2024-09-01',
      end_date: '2024-12-15',
      status: 'active',
      weeks: 16,
      holidays: 2
    },
    {
      id: 'term2',
      name: 'Second Term',
      session: '2024-2025 Academic Year',
      start_date: '2025-01-08',
      end_date: '2025-04-15',
      status: 'upcoming',
      weeks: 14,
      holidays: 1
    },
    {
      id: 'term3',
      name: 'Third Term',
      session: '2024-2025 Academic Year',
      start_date: '2025-04-22',
      end_date: '2025-06-30',
      status: 'upcoming',
      weeks: 10,
      holidays: 0
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTerms = terms.filter(term =>
    term.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.session.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTerm = () => {
    Alert.alert('Create Term', 'This would open the create term form');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#34C759';
      case 'upcoming':
        return '#007AFF';
      case 'completed':
        return '#666';
      default:
        return '#FF9500';
    }
  };

  const renderTerm = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.termCard}
      onPress={() => router.push(`/(authenticated)/academic/terms/${item.id}`)}
    >
      <View style={styles.termHeader}>
        <View style={styles.termInfo}>
          <Text style={styles.termName}>{item.name}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) }
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.sessionName}>{item.session}</Text>
      </View>
      
      <View style={styles.termDetails}>
        <View style={styles.detailRow}>
          <Calendar size={14} color="#666" />
          <Text style={styles.detailText}>
            {item.start_date} to {item.end_date}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={14} color="#666" />
          <Text style={styles.detailText}>{item.weeks} weeks</Text>
        </View>
      </View>

      <View style={styles.termStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.weeks}</Text>
          <Text style={styles.statLabel}>Weeks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.holidays}</Text>
          <Text style={styles.statLabel}>Holidays</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.weeks * 5 - item.holidays}</Text>
          <Text style={styles.statLabel}>School Days</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Academic Terms</Text>
        <Text style={styles.subtitle}>Manage academic terms and semesters</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search terms..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateTerm}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{terms.length}</Text>
          <Text style={styles.statLabel}>Total Terms</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{terms.filter(t => t.status === 'active').length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{terms.filter(t => t.status === 'upcoming').length}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
      </View>

      <FlatList
        data={filteredTerms}
        renderItem={renderTerm}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Calendar size={48} color="#ccc" />
            <Text style={styles.emptyText}>No terms found</Text>
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
  termCard: {
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
  termHeader: {
    marginBottom: 12,
  },
  termInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  termName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sessionName: {
    fontSize: 14,
    color: '#666',
  },
  termDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  termStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
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