import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const mockOrders = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customer: 'Tech Solutions Inc.',
    status: 'Processing',
    items: 5,
    date: '2024-02-20',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customer: 'Digital Dynamics',
    status: 'Shipped',
    items: 3,
    date: '2024-02-19',
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    customer: 'Smart Systems Ltd',
    status: 'Pending',
    items: 8,
    date: '2024-02-18',
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    customer: 'Global Electronics',
    status: 'Delivered',
    items: 2,
    date: '2024-02-17',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Processing':
      return '#eab308';
    case 'Shipped':
      return '#2563eb';
    case 'Delivered':
      return '#22c55e';
    case 'Pending':
      return '#64748b';
    default:
      return '#64748b';
  }
};

export default function Orders() {
  const renderItem = ({ item }) => (
    <Pressable style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customer}>{item.customer}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="package-variant" size={20} color="#64748b" />
          <Text style={styles.detailText}>{item.items} items</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={20} color="#64748b" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.actionButton}>
          <MaterialCommunityIcons name="eye" size={20} color="#2563eb" />
          <Text style={styles.actionText}>View Details</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <MaterialCommunityIcons name="truck-delivery" size={20} color="#2563eb" />
          <Text style={styles.actionText}>Track Order</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
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
      </View>
      <FlatList
        data={mockOrders}
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
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
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
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  customer: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    gap: 8,
  },
  actionText: {
    color: '#2563eb',
    fontSize: 14,
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