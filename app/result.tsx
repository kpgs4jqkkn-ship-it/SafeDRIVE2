import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const score = Number(params.score ?? 0);
  const timeInZone = Number(params.timeInZone ?? 0);
  const combo = Number(params.combo ?? 0);

  const getRank = () => {
    if (score >= 120) return 'Легенда дороги';
    if (score >= 80) return 'Профи';
    if (score >= 40) return 'Аккуратный пассажир';
    return 'Новичок';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Результат поездки</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Очки</Text>
        <Text style={styles.value}>{score}</Text>

        <Text style={styles.label}>Время в зелёной зоне</Text>
        <Text style={styles.value}>{timeInZone} сек</Text>

        <Text style={styles.label}>Макс. комбо</Text>
        <Text style={styles.value}>{combo}</Text>

        <Text style={styles.label}>Статус</Text>
        <Text style={styles.rank}>{getRank()}</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => router.replace('/')}>
        <Text style={styles.primaryButtonText}>На главный экран</Text>
      </Pressable>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#1f2937',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    color: '#94a3b8',
    marginTop: 10,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 4,
  },
  rank: {
    fontSize: 24,
    fontWeight: '800',
    color: '#84cc16',
    marginTop: 6,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#84cc16',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#374151',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});