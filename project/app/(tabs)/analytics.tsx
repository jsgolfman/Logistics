import { View, Text, ScrollView, StyleSheet, Dimensions, Platform } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useEffect, useRef } from 'react';

const screenWidth = Dimensions.get('window').width;

let Chart;
if (Platform.OS === 'web') {
  const { Line, Bar, Pie } = require('react-chartjs-2');
  const { Chart: ChartJS } = require('chart.js/auto');
  Chart = { Line, Bar, Pie, ChartJS };
}

export default function Analytics() {
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const data = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [20, 45, 28, 80, 99, 43],
    daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    dailyValues: [20, 45, 28, 80, 99],
    distribution: [
      { name: 'Electronics', value: 45, color: '#2563eb' },
      { name: 'Accessories', value: 28, color: '#eab308' },
      { name: 'Peripherals', value: 27, color: '#22c55e' },
    ],
  };

  const webChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const renderCharts = () => {
    if (Platform.OS === 'web') {
      const lineData = {
        labels: data.months,
        datasets: [
          {
            label: 'Order Volume',
            data: data.values,
            fill: false,
            borderColor: '#2563eb',
            tension: 0.4,
          },
        ],
      };

      const barData = {
        labels: data.daily,
        datasets: [
          {
            label: 'Daily Shipments',
            data: data.dailyValues,
            backgroundColor: '#2563eb',
          },
        ],
      };

      const pieData = {
        labels: data.distribution.map(item => item.name),
        datasets: [
          {
            data: data.distribution.map(item => item.value),
            backgroundColor: data.distribution.map(item => item.color),
          },
        ],
      };

      return (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Volume Trends</Text>
            <View style={[styles.webChartContainer, { height: 220 }]}>
              <Chart.Line data={lineData} options={webChartOptions} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Shipments</Text>
            <View style={[styles.webChartContainer, { height: 220 }]}>
              <Chart.Bar data={barData} options={webChartOptions} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Inventory Distribution</Text>
            <View style={[styles.webChartContainer, { height: 220 }]}>
              <Chart.Pie data={pieData} options={webChartOptions} />
            </View>
          </View>
        </>
      );
    }

    // Native platform charts
    return (
      <>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Volume Trends</Text>
          <LineChart
            data={{
              labels: data.months,
              datasets: [{ data: data.values }],
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Shipments</Text>
          <BarChart
            data={{
              labels: data.daily,
              datasets: [{ data: data.dailyValues }],
            }}
            width={screenWidth - 32}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inventory Distribution</Text>
          <PieChart
            data={data.distribution.map(item => ({
              name: item.name,
              population: item.value,
              color: item.color,
              legendFontColor: '#1e293b',
            }))}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </View>
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Overview</Text>
        <Text style={styles.subtitle}>Last 6 months</Text>
      </View>

      {renderCharts()}

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Orders</Text>
          <Text style={styles.statValue}>1,234</Text>
          <Text style={styles.statChange}>+12.3%</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Revenue</Text>
          <Text style={styles.statValue}>$45.6K</Text>
          <Text style={styles.statChange}>+8.7%</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Avg Order Value</Text>
          <Text style={styles.statValue}>$123</Text>
          <Text style={styles.statChange}>+5.2%</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Return Rate</Text>
          <Text style={styles.statValue}>2.4%</Text>
          <Text style={[styles.statChange, styles.negativeChange]}>-1.1%</Text>
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
  webChartContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 4,
  },
  statChange: {
    fontSize: 14,
    color: '#22c55e',
    marginTop: 4,
  },
  negativeChange: {
    color: '#dc2626',
  },
});