import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Warehouse Overview</Text>
        <Text style={styles.subtitle}>Main Facility</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="package-variant" size={24} color="#2563eb" />
          <Text style={styles.statNumber}>1,234</Text>
          <Text style={styles.statLabel}>Items in Stock</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="truck-delivery" size={24} color="#2563eb" />
          <Text style={styles.statNumber}>56</Text>
          <Text style={styles.statLabel}>Pending Orders</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="alert-circle" size={24} color="#dc2626" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Low Stock Items</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Operations</Text>
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <Pressable style={styles.actionButton}>
            <MaterialCommunityIcons name="barcode-scan" size={24} color="#2563eb" />
            <Text style={styles.actionText}>Scan Item</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <MaterialCommunityIcons name="clipboard-plus" size={24} color="#2563eb" />
            <Text style={styles.actionText}>New Order</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#2563eb" />
            <Text style={styles.actionText}>Find Item</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <MaterialCommunityIcons name="cog" size={24} color="#2563eb" />
            <Text style={styles.actionText}>Settings</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
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
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    color: '#1e293b',
    marginTop: 8,
  },
});