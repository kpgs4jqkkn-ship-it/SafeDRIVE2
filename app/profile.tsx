import { useRouter } from 'expo-router';
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

export default function ProfileScreen() {
  const router = useRouter();

  const closePanel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={closePanel} />

        <View style={styles.panel}>
          <Pressable
            style={styles.profileHeader}
            onPress={() => router.push('/account')}
          >
            <Image
              source={require('../assets/images/cat.png')}
              style={styles.avatar}
            />

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Харлампьева Элео...</Text>

              <View style={styles.ratingRow}>
                <Text style={styles.stars}>★★★★★</Text>
                <Text style={styles.ratingText}>5 (8)</Text>
              </View>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.menuScrollContent}
          >
            <Pressable style={[styles.menuItem, styles.menuItemActive]}>
              <Image
                source={require('../assets/images/car.png')}
                style={styles.menuIconImage}
              />
              <Text style={styles.menuText}>Город</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Image
                source={require('../assets/images/history.png')}
                style={styles.menuIconImage}
              />
              <Text style={styles.menuText}>История заказов</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Image
                source={require('../assets/images/globe.png')}
                style={styles.menuIconImage}
              />
              <Text style={styles.menuText}>Межгород</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Image
                source={require('../assets/images/shield.png')}
                style={styles.menuIconImage}
              />
              <Text style={styles.menuText}>Безопасность</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Image
                source={require('../assets/images/setting.png')}
                style={styles.menuIconImage}
              />
              <Text style={styles.menuText}>Настройки</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Image
                source={require('../assets/images/info.png')}
                style={styles.menuIconImage}
              />
              <Text style={styles.menuText}>Помощь</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Image
                source={require('../assets/images/chat.png')}
                style={styles.menuIconImage}
              />
              <Text style={styles.menuText}>Служба поддержки</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/shop')}
            >
              <Image
                source={require('../assets/images/shop.png')}
                style={styles.menuIconImage}
              />
              <Text style={styles.menuText}>Магазин</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => router.push('/gamework')}
            >
              <Image
                source={require('../assets/images/game.png')}
                style={styles.menuIconImage}
              />
              <Text style={styles.menuText}>Игровые задания</Text>
            </Pressable>
          </ScrollView>

          <View style={styles.bottomBlock}>
            <Pressable
              style={styles.driverButton}
              onPress={() => router.push('/driver-profile')}
            >
              <Text style={styles.driverButtonText}>Стать водителем</Text>
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  backdrop: {
    flex: 1,
  },
  panel: {
    width: '82%',
    backgroundColor: '#424758',
    paddingTop: 14,
    paddingBottom: 18,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
    backgroundColor: '#52b7ff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    color: '#f6d84f',
    fontSize: 16,
    marginRight: 6,
  },
  ratingText: {
    color: '#d7dce7',
    fontSize: 14,
  },
  arrow: {
    color: '#ffffff',
    fontSize: 32,
    lineHeight: 32,
  },
  menuScrollContent: {
    paddingTop: 6,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItemActive: {
    backgroundColor: '#576075',
  },
  menuIconImage: {
    width: 22,
    height: 22,
    marginRight: 12,
    resizeMode: 'contain',
  },
  menuText: {
    color: '#e7ebf3',
    fontSize: 17,
    fontWeight: '500',
  },
  bottomBlock: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 18,
    paddingHorizontal: 16,
  },
  driverButton: {
    height: 64,
    borderRadius: 18,
    backgroundColor: '#96eb1d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  driverButtonText: {
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
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#5e86c4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  telegramCircle: {
    backgroundColor: '#49a8f0',
  },
  socialText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});