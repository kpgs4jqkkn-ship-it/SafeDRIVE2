import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function WarningScreen() {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams<{ sessionId?: string }>();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/game');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.warning}>Warning</Text>
      <Text style={styles.text}>Пристегните ремень</Text>
      <ActivityIndicator size="large" color="#2ea8ff" style={styles.loader} />
      <Text style={styles.small}>
        Идёт подготовка игры...
      </Text>

      {sessionId ? (
        <Text style={styles.session}>Session: {sessionId}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  warning: {
    fontSize: 36,
    fontWeight: '800',
    color: '#dd0000',
    marginBottom: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  loader: {
    marginBottom: 18,
  },
  small: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  session: {
    marginTop: 18,
    fontSize: 13,
    color: '#94a3b8',
  },
});