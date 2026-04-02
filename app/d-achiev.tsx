import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DAchievScreen() {
  const router = useRouter();

  const achievements = [
    {
      id: '01',
      title: 'Первая смена',
      text: 'Выполнить 5 поездок без отмен.',
      points: '10 carcoin',
      done: true,
    },
    {
      id: '02',
      title: 'Настоящий герой',
      text: 'Соверши 3 поездки в час пик',
      points: '500 carcoin',
      done: true,
    },
    {
      id: '03',
      title: 'Надежный водитель',
      text: 'Выполнить 25 успешно завершенных поездок',
      points: '45 carcoin',
      done: false,
    },
    {
      id: '04',
      title: 'Любимец пассажиров',
      text: 'Сохранить рейтинг 5.0 в течение недели.',
      points: '40 баллов',
      done: false,
    },
    {
      id: '05',
      title: 'Я стальной!',
      text: 'Выехать в непогоду.',
      points: '50 баллов',
      done: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Достижения</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {achievements.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              item.done ? styles.cardDone : styles.cardLocked,
            ]}
          >
            <Text style={styles.cardTop}>
              ACHIEVEMENT № {item.id}
            </Text>

            <Text style={styles.cardTitle}>{item.title}</Text>

            <Text style={styles.cardText}>{item.text}</Text>

            <Text style={styles.cardPoints}>{item.points}</Text>

            {item.done && (
              <Text style={styles.doneText}>Собрано</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424758',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#58627a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  card: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 16,
    borderWidth: 2,
  },
  cardDone: {
    backgroundColor: '#5b849c',
    borderColor: '#c4f4ff',
    shadowColor: '#27d7ff',
  },
  cardLocked: {
    backgroundColor: '#2b3650',
    borderColor: '#0e90b3',
    opacity: 0.85,
  },
  cardTop: {
    color: '#b8ef52',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    color: '#d7e7f5',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },
  cardPoints: {
    color: '#c8e717',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  doneText: {
    color: '#96eb1d',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
  },
});