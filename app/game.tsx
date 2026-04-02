import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function GameScreen() {
  const router = useRouter();

  const [speed, setSpeed] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timeInZone, setTimeInZone] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [gasPressed, setGasPressed] = useState(false);
  const [brakePressed, setBrakePressed] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const targetMin = 35;
  const targetMax = 45;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSpeed((prev) => {
        let next = prev;

        if (gasPressed) next += 3;
        if (brakePressed) next -= 4;
        if (!gasPressed && !brakePressed) next -= 1;

        if (next < 0) next = 0;
        if (next > 100) next = 100;

        return next;
      });
    }, 200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gasPressed, brakePressed]);

  useEffect(() => {
    if (timeLeft <= 0) {
      router.replace({
        pathname: '/result',
        params: {
          score: String(score),
          timeInZone: String(timeInZone),
          combo: String(maxCombo),
        },
      });
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, score, timeInZone, maxCombo, router]);

  useEffect(() => {
    const inZone = speed >= targetMin && speed <= targetMax;

    if (inZone && timeLeft > 0) {
      setScore((prev) => prev + 2);
      setTimeInZone((prev) => prev + 1);
      setCombo((prev) => {
        const next = prev + 1;
        if (next > maxCombo) {
          setMaxCombo(next);
        }
        return next;
      });
    } else {
      setCombo(0);
    }
  }, [speed]);

  const inZone = speed >= targetMin && speed <= targetMax;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Режим безопасной скорости</Text>
      <Text style={styles.timer}>Осталось: {timeLeft} сек</Text>

      <View style={styles.speedBox}>
        <Text style={styles.speed}>{speed.toFixed(0)} км/ч</Text>
        <Text style={styles.zone}>Цель: {targetMin}–{targetMax} км/ч</Text>
        <Text style={[styles.status, inZone ? styles.good : styles.bad]}>
          {inZone ? 'В зелёной зоне' : 'Вне зоны'}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Очки</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Комбо</Text>
          <Text style={styles.statValue}>{combo}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={[styles.button, styles.gasButton]}
          onPressIn={() => setGasPressed(true)}
          onPressOut={() => setGasPressed(false)}
        >
          <Text style={styles.buttonText}>Газ</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.brakeButton]}
          onPressIn={() => setBrakePressed(true)}
          onPressOut={() => setBrakePressed(false)}
        >
          <Text style={styles.buttonText}>Тормоз</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.finishButton}
        onPress={() =>
          router.replace({
            pathname: '/result',
            params: {
              score: String(score),
              timeInZone: String(timeInZone),
              combo: String(maxCombo),
            },
          })
        }
      >
        <Text style={styles.finishButtonText}>Завершить игру</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  timer: {
    fontSize: 18,
    color: '#cbd5e1',
    marginBottom: 18,
  },
  speedBox: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  speed: {
    fontSize: 42,
    fontWeight: '800',
    color: '#ffffff',
  },
  zone: {
    fontSize: 18,
    color: '#cbd5e1',
    marginTop: 8,
  },
  status: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  good: {
    color: '#84cc16',
  },
  bad: {
    color: '#ef4444',
  },
  statsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 6,
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 18,
  },
  button: {
    minWidth: 140,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  gasButton: {
    backgroundColor: '#22c55e',
  },
  brakeButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  finishButton: {
    marginTop: 8,
    backgroundColor: '#334155',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});