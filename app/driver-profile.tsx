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

export default function DriverProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Профиль таксиста</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <Image
            source={require('../assets/images/cat.png')}
            style={styles.avatar}
          />

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Харлампьева Элеонора</Text>

            <View style={styles.ratingRow}>
              <Text style={styles.stars}>★★★★★</Text>
              <Text style={styles.ratingText}>5.0</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuBlock}>
          <Pressable style={[styles.menuItem, styles.menuItemActive]}>
            <Image
              source={require('../assets/images/car.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Заказы</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Image
              source={require('../assets/images/info.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Мой кабинет</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Image
              source={require('../assets/images/globe.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Межгород</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Image
              source={require('../assets/images/shield.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Безопасность</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Image
              source={require('../assets/images/setting.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Настройки</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Image
              source={require('../assets/images/chat.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Служба поддержки</Text>
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => router.push('/d-achiev')}
          >
            <Image
              source={require('../assets/images/game.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Достижения</Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Image
              source={require('../assets/images/coin.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Пополнить carcoin</Text>
          </Pressable>
        </View>

        <View style={styles.bottomBlock}>
          <Pressable
            style={styles.passengerButton}
            onPress={() => router.replace('/profile')}
          >
            <Text style={styles.passengerButtonText}>Стать пассажиром</Text>
          </Pressable>

          <View style={styles.socialRow}>
            <View style={styles.socialCircle}>
              <Text style={styles.socialText}>VK</Text>
            </View>

            <View style={[styles.socialCircle, styles.telegramCircle]}>
              <Text style={styles.socialText}>TG</Text>
            </View>
          </View>
        </View>
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
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#525969',
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
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 14,
    backgroundColor: '#52b7ff',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    color: '#f6d84f',
    fontSize: 18,
    marginRight: 10,
  },
  ratingText: {
    color: '#d7dce7',
    fontSize: 16,
  },
  menuBlock: {
    paddingTop: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  menuItemActive: {
    backgroundColor: '#2f3442',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 14,
    resizeMode: 'contain',
  },
  menuText: {
    color: '#e7ebf3',
    fontSize: 17,
    fontWeight: '500',
  },
  bottomBlock: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  passengerButton: {
    height: 55,
    borderRadius: 18,
    backgroundColor: '#96eb1d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22
  },
  passengerButtonText: {
    color: '#2f3442',
    fontSize: 18,
    fontWeight: '800',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
  },
  socialCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#5e86c4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  telegramCircle: {
    backgroundColor: '#49a8f0',
  },
  socialText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});