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
import { Search, Plus, MapPin, Settings, Edit, Trash2 } from 'lucide-react-native';

export default function LocationManagementScreen() {
  const [locations, setLocations] = useState([
    {
      id: 'loc1',
      name: 'Main Campus',
      address: '123 Education Street, Learning City',
      latitude: 40.7128,
      longitude: -74.0060,
      radius: 100,
      is_active: true,
      description: 'Primary school building and administrative offices'
    },
    {
      id: 'loc2',
      name: 'Sports Complex',
      address: '456 Athletic Avenue, Learning City',
      latitude: 40.7130,
      longitude: -74.0065,
      radius: 150,
      is_active: true,
      description: 'Gymnasium, sports fields, and recreational facilities'
    },
    {
      id: 'loc3',
      name: 'Science Laboratory',
      address: '789 Research Road, Learning City',
      latitude: 40.7125,
      longitude: -74.0055,
      radius: 75,
      is_active: false,
      description: 'Advanced science labs and research facilities'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateLocation = () => {
    Alert.alert('Create Location', 'This would open the create location form');
  };

  const handleEditLocation = (locationId: string) => {
    Alert.alert('Edit Location', `This would edit location ${locationId}`);
  };

  const handleDeleteLocation = (locationId: string, locationName: string) => {
    Alert.alert(
      'Delete Location',
      `Are you sure you want to delete "${locationName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setLocations(prev => prev.filter(loc => loc.id !== locationId));
            Alert.alert('Success', 'Location deleted successfully');
          }
        }
      ]
    );
  };

  const handleToggleStatus = (locationId: string) => {
    setLocations(prev => prev.map(loc => 
      loc.id === locationId 
        ? { ...loc, is_active: !loc.is_active }
        : loc
    ));
  };

  const renderLocation = ({ item }: { item: any }) => (
    <View style={styles.locationCard}>
      <View style={styles.locationHeader}>
        <View style={styles.locationInfo}>
          <Text style={styles.locationName}>{item.name}</Text>
          <View style={styles.locationMeta}>
            <MapPin size={14} color="#666" />
            <Text style={styles.locationAddress}>{item.address}</Text>
          </View>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.is_active ? '#34C759' : '#FF9500' }
        ]}>
          <Text style={styles.statusText}>
            {item.is_active ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <Text style={styles.locationDescription}>{item.description}</Text>

      <View style={styles.locationDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Coordinates:</Text>
          <Text style={styles.detailValue}>
            {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Check-in Radius:</Text>
          <Text style={styles.detailValue}>{item.radius}m</Text>
        </View>
      </View>

      <View style={styles.locationActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditLocation(item.id)}
        >
          <Edit size={16} color="#007AFF" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.toggleButton]}
          onPress={() => handleToggleStatus(item.id)}
        >
          <Settings size={16} color={item.is_active ? '#FF9500' : '#34C759'} />
          <Text style={[styles.actionButtonText, { color: item.is_active ? '#FF9500' : '#34C759' }]}>
            {item.is_active ? 'Deactivate' : 'Activate'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteLocation(item.id, item.name)}
        >
          <Trash2 size={16} color="#FF3B30" />
          <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Management</Text>
        <Text style={styles.subtitle}>Manage attendance check-in locations</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateLocation}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{locations.length}</Text>
          <Text style={styles.statLabel}>Total Locations</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{locations.filter(l => l.is_active).length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {Math.round(locations.reduce((sum, l) => sum + l.radius, 0) / locations.length)}m
          </Text>
          <Text style={styles.statLabel}>Avg Radius</Text>
        </View>
      </View>

      <FlatList
        data={filteredLocations}
        renderItem={renderLocation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MapPin size={48} color="#ccc" />
            <Text style={styles.emptyText}>No locations found</Text>
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
  locationCard: {
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
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  locationInfo: {
    flex: 1,
    marginRight: 12,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  locationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  locationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  locationDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  locationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f0f8ff',
    gap: 4,
  },
  toggleButton: {
    backgroundColor: '#fff7ed',
  },
  deleteButton: {
    backgroundColor: '#fff5f5',
  },
  actionButtonText: {
    fontSize: 12,
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