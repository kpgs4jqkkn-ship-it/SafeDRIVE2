import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TripScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://192.168.88.95:3001';

  const goBackHome = () => {
    router.replace('/');
  };

  const startGame = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      let sessionId = 'offline-mode';

      try {
        const response = await fetch(`${API_URL}/game/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: 1 }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          sessionId = String(data.sessionId ?? 'offline-mode');
        }
      } catch (error) {
        clearTimeout(timeoutId);
        console.log('Сервер недоступен, запуск в оффлайн режиме:', error);
      }

      router.push({
        pathname: '/warning',
        params: { sessionId },
      });
    } catch (error) {
      console.log('Ошибка запуска игры:', error);
      Alert.alert('Ошибка', 'Не удалось открыть игру');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../assets/images/car-drivee.png')}
        style={styles.map}
        resizeMode="cover"
      >
        <View style={styles.topOverlay}>
          <View style={styles.topRow}>
            <Pressable style={styles.topButton} onPress={goBackHome}>
              <Text style={styles.topButtonText}>Закрыть</Text>
            </Pressable>

            <Pressable style={styles.topButton} onPress={goBackHome}>
              <Text style={styles.cancelButtonText}>Отменить поездку</Text>
            </Pressable>
          </View>

          <View style={styles.arriveTopWrap}>
            <Text style={styles.arriveTopText}>Приедет через                                           6 мин</Text>
          </View>
        </View>

        <View style={styles.bottomSheet}>
          <View style={styles.carInfoBlock}>
            <Text style={styles.carTitle}>Серый Toyota Tank</Text>

            <View style={styles.plateBox}>
              <Text style={styles.plateText}>а111нм 14</Text>
            </View>
          </View>

          <View style={styles.driverRow}>
            <View style={styles.driverLeft}>
              <View style={styles.avatarWrap}>
                <Image
                  source={require('../assets/images/icon.png')}
                  style={styles.avatar}
                />
                <Image
                  source={require('../assets/images/android-icon-foreground.png')}
                  style={styles.avatarFrame}
                />
              </View>

              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>Александр</Text>

                <View style={styles.achievementRow}>
                  <Text style={styles.stars}>★ 5</Text>
                  <View style={styles.achievementBadge}>
                    <Text style={styles.achievementBadgeText}>Достижение</Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable style={styles.callButton}>
              <Text style={styles.callIcon}>📞</Text>
            </Pressable>
          </View>

          <View style={styles.gameRow}>
            <Pressable
              style={({ pressed }) => [
                styles.smallRoundButton,
                pressed && styles.smallRoundButtonPressed,
                loading && styles.smallRoundButtonDisabled,
              ]}
              onPress={startGame}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.smallRoundButtonText}>▶</Text>
              )}
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.playButton,
                pressed && styles.playButtonPressed,
                loading && styles.playButtonDisabled,
              ]}
              onPress={startGame}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#1f2530" />
              ) : (
                <Text style={styles.playButtonText}>играть в safedrivee</Text>
              )}
            </Pressable>

            <View style={styles.smallRoundButton}>
              <Text style={styles.smallRoundButtonText}>🛡</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414655',
  },
  map: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 14,
    paddingHorizontal: 14,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topButton: {
    minHeight: 46,
    paddingHorizontal: 20,
    borderRadius: 23,
    backgroundColor: 'rgba(75, 84, 108, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  cancelButtonText: {
    color: '#ff9cb2',
    fontSize: 17,
    fontWeight: '700',
  },

  arriveTopWrap: {
    marginTop: 18,
    backgroundColor: 'rgba(75, 84, 108, 0.92)',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  arriveTopText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },

  bottomSheet: {
    backgroundColor: '#4b546d',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 22,
    paddingHorizontal: 18,
    paddingBottom: 22,
  },

  carInfoBlock: {
    alignItems: 'center',
    marginBottom: 22,
  },
  carTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  plateBox: {
    borderWidth: 2,
    borderColor: '#8991ad',
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  plateText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },

  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
  },
  driverLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatarWrap: {
    width: 78,
    height: 78,
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#d9d9d9',
  },
  avatarFrame: {
    width: 78,
    height: 78,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.95,
  },

  driverInfo: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  driverName: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 8,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  stars: {
    color: '#ffd84d',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 10,
    letterSpacing: 1,
  },
  achievementBadge: {
    backgroundColor: '#5b6480',
    borderWidth: 1.5,
    borderColor: '#9aa4c4',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  achievementBadgeText: {
    color: '#f0f4ff',
    fontSize: 14,
    fontWeight: '700',
  },

  callButton: {
    width: 50,
    height: 50,
    borderRadius: 36,
    backgroundColor: '#99f122',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  callIcon: {
    fontSize: 30,
  },

  gameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  smallRoundButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#58627a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallRoundButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  smallRoundButtonDisabled: {
    opacity: 0.8,
  },
  smallRoundButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },

  playButton: {
    flex: 1,
    height: 50,
    marginHorizontal: 14,
    borderRadius: 24,
    backgroundColor: '#99f122',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonPressed: {
    transform: [{ scale: 0.99 }],
  },
  playButtonDisabled: {
    opacity: 0.85,
  },
  playButtonText: {
    color: '#1f2530',
    fontSize: 21,
    fontWeight: '800',
  },
});