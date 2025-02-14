import { View, Text, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

const mockInventory = [
  { id: '1', name: 'Laptop', sku: 'LAP001', quantity: 50, location: 'A1-B2', status: 'In Stock' },
  { id: '2', name: 'Smartphone', sku: 'PHN002', quantity: 75, location: 'A2-C3', status: 'Low Stock' },
  { id: '3', name: 'Headphones', sku: 'AUD003', quantity: 100, location: 'B1-D4', status: 'In Stock' },
  { id: '4', name: 'Tablet', sku: 'TAB004', quantity: 25, location: 'C2-E1', status: 'Critical' },
  { id: '5', name: 'Smart Watch', sku: 'WCH005', quantity: 60, location: 'D1-F2', status: 'In Stock' },
];

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }) => (
    <Pressable style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={[
          styles.statusBadge,
          item.status === 'Low Stock' && styles.lowStockBadge,
          item.status === 'Critical' && styles.criticalBadge,
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>SKU:</Text>
          <Text style={styles.detailValue}>{item.sku}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Quantity:</Text>
          <Text style={styles.detailValue}>{item.quantity}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{item.location}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search inventory..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.filterContainer}>
        <Pressable style={styles.filterButton}>
          <MaterialCommunityIcons name="filter-variant" size={20} color="#2563eb" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </Pressable>
        <Pressable style={styles.filterButton}>
          <MaterialCommunityIcons name="sort-variant" size={20} color="#2563eb" />
          <Text style={styles.filterButtonText}>Sort</Text>
        </Pressable>
      </View>
      <FlatList
        data={mockInventory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Pressable style={styles.fab}>
        <MaterialCommunityIcons name="plus" size={24} color="#ffffff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1e293b',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  filterButtonText: {
    marginLeft: 4,
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    padding: 16,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  statusBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lowStockBadge: {
    backgroundColor: '#eab308',
  },
  criticalBadge: {
    backgroundColor: '#dc2626',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  itemDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    color: '#64748b',
  },
  detailValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});