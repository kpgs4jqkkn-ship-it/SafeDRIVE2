import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType = 'daily' | 'weekly';

type Task = {
  title: string;
  reward: string;
  description: string;
  done: boolean;
};

export default function GameworkScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  const dailyTasks: Task[] = [
    {
      title: 'Сыграй 1 раз "SafeDrive"',
      reward: '+10 баллов',
      description: 'Заверши одну игру SafeDrivee во время поездки.',
      done: true,
    },
    {
      title: 'Закажи 2 раза такси',
      reward: '+25 баллов',
      description: 'Приезжай вовремя в необходимые места.',
      done: false,
    },
    {
      title: 'Помоги водителю выполнить миссию "час пик"',
      reward: '+20 баллов',
      description: 'Выбери водителя с миссией и получи бонус.',
      done: false,
    },
  ];

  const weeklyTasks: Task[] = [
    {
      title: 'Сыграй 5 раз "SafeDrive"',
      reward: '+80 баллов',
      description: 'Заверши пять игровых поездок за неделю.',
      done: false,
    },
    {
      title: 'Закажи такси 5 раз',
      reward: '+45 баллов',
      description: 'Заверши пять поездок.',
      done: false,
    },
    {
      title: 'Получи 1 достижение',
      reward: '+100 баллов',
      description: 'Выполни любое достижение, после которого получишь звание.',
      done: false,
    },
  ];

  const tasks = activeTab === 'daily' ? dailyTasks : weeklyTasks;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Игровые задания</Text>
      </View>

      <View style={styles.tabsRow}>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'daily' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('daily')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'daily' && styles.tabTextActive,
            ]}
          >
            Ежедневные
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'weekly' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('weekly')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'weekly' && styles.tabTextActive,
            ]}
          >
            Еженедельные
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {tasks.map((task, index) => (
          <View
            key={index}
            style={[
              styles.taskCard,
              task.done && styles.taskCardDone,
            ]}
          >
            <Text style={styles.taskTitle}>{task.title}</Text>

            <Text style={styles.taskDescription}>{task.description}</Text>

            <View style={styles.rewardRow}>
              <Text style={styles.rewardLabel}>
                {task.done ? 'Награда собрана' : 'Награда'}
              </Text>

              <Text
                style={[
                  styles.rewardValue,
                  task.done && styles.rewardDone,
                ]}
              >
                {task.reward}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414655',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  tabButton: {
    width: '47%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#5a6480',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#96eb1d',
  },
  tabText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#2f3442',
    fontWeight: '800',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  taskCard: {
    backgroundColor: '#d8d8d8',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  taskCardDone: {
    backgroundColor: '#b8f07a',
  },
  taskTitle: {
    color: '#1f2530',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  taskDescription: {
    color: '#4a4f5c',
    fontSize: 15,
    marginBottom: 14,
    lineHeight: 20,
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardLabel: {
    color: '#414655',
    fontSize: 15,
    fontWeight: '600',
  },
  rewardValue: {
    color: '#5da800',
    fontSize: 17,
    fontWeight: '800',
  },
  rewardDone: {
    color: '#2f6f00',
  },
});