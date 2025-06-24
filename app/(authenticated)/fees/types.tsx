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
import { Search, Plus, DollarSign, Calendar, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function FeeTypesScreen() {
  const [feeTypes, setFeeTypes] = useState([
    {
      id: 'fee1',
      name: 'Tuition Fee',
      description: 'Monthly tuition fee for academic instruction',
      amount: 1500.00,
      frequency: 'monthly',
      is_mandatory: true,
      due_day: 1,
      late_fee: 50.00,
      is_active: true
    },
    {
      id: 'fee2',
      name: 'Transport Fee',
      description: 'Monthly transportation service fee',
      amount: 300.00,
      frequency: 'monthly',
      is_mandatory: false,
      due_day: 5,
      late_fee: 25.00,
      is_active: true
    },
    {
      id: 'fee3',
      name: 'Library Fee',
      description: 'Annual library access and maintenance fee',
      amount: 200.00,
      frequency: 'annual',
      is_mandatory: true,
      due_day: 1,
      late_fee: 20.00,
      is_active: true
    },
    {
      id: 'fee4',
      name: 'Sports Fee',
      description: 'Quarterly sports activities and equipment fee',
      amount: 150.00,
      frequency: 'quarterly',
      is_mandatory: false,
      due_day: 15,
      late_fee: 15.00,
      is_active: true
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFeeTypes = feeTypes.filter(feeType =>
    feeType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feeType.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateFeeType = () => {
    Alert.alert('Create Fee Type', 'This would open the create fee type form');
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'monthly':
        return '#007AFF';
      case 'quarterly':
        return '#34C759';
      case 'annual':
        return '#AF52DE';
      default:
        return '#FF9500';
    }
  };

  const renderFeeType = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.feeTypeCard}
      onPress={() => router.push(`/(authenticated)/fees/types/${item.id}`)}
    >
      <View style={styles.feeTypeHeader}>
        <View style={styles.feeTypeInfo}>
          <Text style={styles.feeTypeName}>{item.name}</Text>
          <View style={styles.badges}>
            <View style={[
              styles.frequencyBadge,
              { backgroundColor: getFrequencyColor(item.frequency) }
            ]}>
              <Text style={styles.frequencyText}>{item.frequency}</Text>
            </View>
            {item.is_mandatory && (
              <View style={styles.mandatoryBadge}>
                <Text style={styles.mandatoryText}>Mandatory</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
        </View>
      </View>
      
      <Text style={styles.feeTypeDescription}>{item.description}</Text>
      
      <View style={styles.feeTypeDetails}>
        <View style={styles.detailRow}>
          <Calendar size={14} color="#666" />
          <Text style={styles.detailText}>Due: {item.due_day} of each period</Text>
        </View>
        <View style={styles.detailRow}>
          <DollarSign size={14} color="#666" />
          <Text style={styles.detailText}>Late fee: ₹{item.late_fee}</Text>
        </View>
      </View>

      <View style={styles.feeTypeStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>₹{item.amount}</Text>
          <Text style={styles.statLabel}>Amount</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.frequency}</Text>
          <Text style={styles.statLabel}>Frequency</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[
            styles.statValue,
            { color: item.is_active ? '#34C759' : '#FF3B30' }
          ]}>
            {item.is_active ? 'Active' : 'Inactive'}
          </Text>
          <Text style={styles.statLabel}>Status</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fee Types</Text>
        <Text style={styles.subtitle}>Manage different fee categories</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search fee types..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateFeeType}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{feeTypes.length}</Text>
          <Text style={styles.statLabel}>Total Fee Types</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{feeTypes.filter(f => f.is_mandatory).length}</Text>
          <Text style={styles.statLabel}>Mandatory</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{feeTypes.filter(f => f.is_active).length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View>

      <FlatList
        data={filteredFeeTypes}
        renderItem={renderFeeType}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <DollarSign size={48} color="#ccc" />
            <Text style={styles.emptyText}>No fee types found</Text>
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
  feeTypeCard: {
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
  feeTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  feeTypeInfo: {
    flex: 1,
  },
  feeTypeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  frequencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  frequencyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  mandatoryBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mandatoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34C759',
  },
  feeTypeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  feeTypeDetails: {
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
  feeTypeStats: {
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
    fontSize: 16,
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