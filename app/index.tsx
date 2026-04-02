import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://192.168.88.95:3001';

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
          body: JSON.stringify({
            userId: 1,
          }),
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

  const goToTrip = () => {
    router.push('/trip');
  };

  const openProfile = () => {
    router.push('/profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../assets/images/car-drivee.png')}
        style={styles.map}
        resizeMode="cover"
      >
        <View style={styles.topButtons}>
          <Pressable style={styles.roundButton} onPress={openProfile}>
            <Text style={styles.roundButtonText}>☰</Text>
          </Pressable>

          <Pressable style={styles.roundButton}>
            <Text style={styles.roundButtonText}>↪</Text>
          </Pressable>
        </View>

        <View style={styles.mapLayer} />

        <Pressable
          style={({ pressed }) => [
            styles.gameButton,
            pressed && styles.gameButtonPressed,
            loading && styles.gameButtonDisabled,
          ]}
          onPress={startGame}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.gameButtonText}>▶</Text>
          )}
        </Pressable>

        <View style={styles.rightFloatingButtonWrap}>
          <Pressable style={styles.roundButton}>
            <Text style={styles.roundButtonText}>◎</Text>
          </Pressable>
        </View>

        {loading && (
          <View style={styles.loadingBox}>
            <Text style={styles.loadingText}>Запуск игры...</Text>
          </View>
        )}

        <View style={styles.bottomPanel}>
          <View style={styles.serviceRow}>
            <View style={[styles.serviceCard, styles.serviceCardActive]}>
              <Text style={styles.serviceEmoji}>🚗</Text>
              <Text style={styles.serviceTextActive}>Поездка</Text>
            </View>

            <View style={styles.serviceCard}>
              <Text style={styles.serviceEmoji}>🧑‍🦽</Text>
              <Text style={styles.serviceText}>Курьер</Text>
            </View>

            <View style={styles.serviceCard}>
              <Text style={styles.serviceEmoji}>🎒</Text>
              <Text style={styles.serviceText}>Пригород</Text>
            </View>

            <View style={styles.serviceCard}>
              <Text style={styles.serviceEmoji}>🧳</Text>
              <Text style={styles.serviceText}>Межгород</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <View style={styles.blueCircle} />
            <Text style={styles.locationText}>Ищем ваше местоположение</Text>
          </View>

          <View style={styles.destinationBox}>
            <View style={styles.destinationLeft}>
              <View style={styles.greenCircle} />
              <Text style={styles.destinationPlaceholder}>Куда</Text>
            </View>

            <View style={styles.chipsRow}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>Соснов...ия детей</Text>
              </View>

              <View style={styles.chip}>
                <Text style={styles.chipText}>улица Н...</Text>
              </View>
            </View>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.priceText}>₽ Предложите цену</Text>
          </View>

          <View style={styles.orderRow}>
            <Pressable style={styles.iconSideButton}>
              <Text style={styles.iconSideText}>₽</Text>
            </Pressable>

            <Pressable style={styles.orderButton} onPress={goToTrip}>
              <Text style={styles.orderButtonText}>Заказать</Text>
            </Pressable>

            <Pressable style={styles.iconSideButton}>
              <Text style={styles.iconSideText}>⚙</Text>
            </Pressable>
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
    justifyContent: 'space-between',
  },
  topButtons: {
    position: 'absolute',
    top: 14,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  roundButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(55, 61, 75, 0.96)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButtonText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '600',
  },
  mapLayer: {
    flex: 1,
    position: 'relative',
  },
  gameButton: {
    position: 'absolute',
    left: 16,
    bottom: 355,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(55, 61, 75, 0.96)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 25,
  },
  gameButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  gameButtonDisabled: {
    opacity: 0.8,
  },
  gameButtonText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 2,
  },
  rightFloatingButtonWrap: {
    position: 'absolute',
    right: 16,
    bottom: 355,
    zIndex: 25,
  },
  loadingBox: {
    position: 'absolute',
    left: 84,
    bottom: 365,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 25,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPanel: {
    backgroundColor: '#424758',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  serviceCard: {
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  serviceCardActive: {
    backgroundColor: '#566178',
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  serviceEmoji: {
    fontSize: 30,
    marginBottom: 4,
  },
  serviceTextActive: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  serviceText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  blueCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 6,
    borderColor: '#2fa5ff',
    marginRight: 12,
  },
  locationText: {
    color: '#c2c8d5',
    fontSize: 18,
    fontWeight: '500',
  },
  destinationBox: {
    minHeight: 18,
    borderRadius: 18,
    backgroundColor: '#546075',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  destinationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  greenCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 9,
    borderColor: '#92e51e',
    marginRight: 12,
  },
  destinationPlaceholder: {
    color: '#d8dde7',
    fontSize: 20,
    fontWeight: '500',
  },
  chipsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    backgroundColor: '#d8efac',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8,
  },
  chipText: {
    color: '#1f2530',
    fontSize: 16,
    fontWeight: '500',
  },
  priceBox: {
    height: 50,
    borderRadius: 18,
    backgroundColor: '#546075',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  priceText: {
    color: '#d8dde7',
    fontSize: 22,
    fontWeight: '400',
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconSideButton: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSideText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '600',
  },
  orderButton: {
    flex: 1,
    height: 65,
    marginHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#96eb1d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#2f3442',
    fontSize: 28,
    fontWeight: '700',
  },
});