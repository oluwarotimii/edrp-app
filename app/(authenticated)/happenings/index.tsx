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
import { mockHappenings } from '@/data/mockData';
import { Search, Plus, Bell, Calendar, MapPin, Clock } from 'lucide-react-native';

export default function HappeningsScreen() {
  const [happenings, setHappenings] = useState(mockHappenings);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredHappenings = happenings.filter(happening => {
    const matchesSearch = happening.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         happening.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || happening.category.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'academic':
        return '#007AFF';
      case 'sports':
        return '#34C759';
      case 'cultural':
        return '#AF52DE';
      case 'announcement':
        return '#FF9500';
      default:
        return '#666';
    }
  };

  const handleCreateHappening = () => {
    router.push('/(authenticated)/happenings/create');
  };

  const renderHappening = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.happeningCard}
      onPress={() => router.push(`/(authenticated)/happenings/${item.id}`)}
    >
      <View style={styles.happeningHeader}>
        <View style={styles.happeningInfo}>
          <Text style={styles.happeningTitle}>{item.title}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: item.status === 'upcoming' ? '#FF9500' : '#34C759' 
        }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.happeningDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.happeningFooter}>
        <View style={styles.happeningDetail}>
          <Calendar size={14} color="#666" />
          <Text style={styles.happeningDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>School Happenings</Text>
        <Text style={styles.subtitle}>Events, announcements, and activities</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search happenings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateHappening}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by category:</Text>
        <View style={styles.filterButtons}>
          {['all', 'academic', 'sports', 'cultural', 'announcement'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                filter === category && styles.activeFilter
              ]}
              onPress={() => setFilter(category)}
            >
              <Text style={[
                styles.filterButtonText,
                filter === category && styles.activeFilterText
              ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{happenings.length}</Text>
          <Text style={styles.statLabel}>Total Events</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{happenings.filter(h => h.status === 'upcoming').length}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{happenings.filter(h => h.category === 'Academic').length}</Text>
          <Text style={styles.statLabel}>Academic</Text>
        </View>
      </View>

      <FlatList
        data={filteredHappenings}
        renderItem={renderHappening}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Bell size={48} color="#ccc" />
            <Text style={styles.emptyText}>No happenings found</Text>
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
  filterContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
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
  happeningCard: {
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
  happeningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  happeningInfo: {
    flex: 1,
    marginRight: 12,
  },
  happeningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
  happeningDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  happeningFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  happeningDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  happeningDate: {
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