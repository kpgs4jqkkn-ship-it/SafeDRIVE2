import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <View style={styles.header}>
        <Pressable
          style={styles.headerCircleButton}
          onPress={() => router.back()}
        >
          <Text style={styles.headerCircleButtonText}>☰</Text>
        </Pressable>

        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Аватар */}
        <View style={styles.topProfileRow}>
          <Image
            source={require('../assets/images/cat.png')}
            style={styles.avatar}
          />

          <View style={styles.photoActions}>
            <Pressable style={styles.photoActionButton}>
              <Text style={styles.photoActionText}>Сделать снимок</Text>
            </Pressable>

            <Pressable style={styles.photoActionButton}>
              <Text style={styles.photoActionText}>Выбрать из галереи</Text>
            </Pressable>
          </View>
        </View>

        {/* Инфа */}
        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⌇</Text>
            <Text style={styles.infoValue}>Элеонора</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⌇</Text>
            <Text style={styles.infoValue}>Харлампьева</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>✉</Text>
            <Text style={styles.infoValueMuted}>Email</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>▦</Text>
            <Text style={styles.infoValue}>Якутск</Text>
          </View>
        </View>

        {/* Звание */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Звание</Text>
          <Text style={styles.sectionValue}>Неопоздалкин</Text>
        </View>

        {/* Достижения */}
        <Pressable
          style={styles.sectionCard}
          onPress={() => router.push('/c-achiev')}
        >
          <Text style={styles.sectionTitle}>Мои достижения</Text>
          <Text style={styles.sectionSubtext}>
            Открыть список наград
          </Text>
        </Pressable>

        {/* Carcoin */}
        <Pressable
          style={styles.sectionCard}
          onPress={() => router.push('/carcoinpay')}
        >
          <Text style={styles.sectionTitle}>Пополнить carcoin +</Text>
          <Text style={styles.sectionSubtext}>
            Купить валюту для рамок и мерча
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414655',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },

  headerCircleButton: {
    width: 40,
    height: 40,
    borderRadius: 35,
    backgroundColor: '#2c3443',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerCircleButtonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },

  saveButton: {
    height: 40,
    borderRadius: 38,
    backgroundColor: '#1f2530',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 39,
  },

  topProfileRow: {
    flexDirection: 'row',
    marginBottom: 26,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginRight: 18,
    backgroundColor: '#52b7ff',
  },

  photoActions: {
    flex: 1,
    justifyContent: 'center',
  },

  photoActionButton: {
    paddingVertical: 6,
  },

  photoActionText: {
    color: '#ffffff',
    fontSize: 18,
  },

  infoList: {
    marginBottom: 24,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  infoIcon: {
    width: 34,
    color: '#d6dbe7',
    fontSize: 20,
    marginRight: 12,
    textAlign: 'center',
  },

  infoValue: {
    color: '#ffffff',
    fontSize: 18,
  },

  infoValueMuted: {
    color: '#8d94a5',
    fontSize: 18,
  },

  sectionCard: {
    backgroundColor: '#4b546d',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },

  sectionValue: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },

  sectionSubtext: {
    color: '#d4d9e5',
    fontSize: 14,
  },
});