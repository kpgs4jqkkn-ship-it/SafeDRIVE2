import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ShopTab = 'frames' | 'merch';

type ShopItem = {
  id: number;
  title: string;
  image: any;
  price: number;
};

export default function ShopScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ShopTab>('frames');

  const carcoinBalance = 5200;

  const frameItems: ShopItem[] = [
    {
      id: 1,
      title: 'Рамка Neon',
      image: require('../assets/images/neonv.png'),
      price: 1200,
    },
    {
      id: 2,
      title: 'Рамка Frost',
      image: require('../assets/images/darkred.png'),
      price: 1800,
    },
    {
      id: 3,
      title: 'Рамка Cyber',
      image: require('../assets/images/picme.png'),
      price: 5000,
    },
  ];

  const merchItems: ShopItem[] = [
    {
      id: 4,
      title: 'Футболка SafeDrivee',
      image: require('../assets/images/merch-1.png'),
      price: 2500,
    },
    {
      id: 5,
      title: 'Худи SafeDrivee',
      image: require('../assets/images/merch-2.png'),
      price: 4200,
    },
  ];

  const items = useMemo(
    () => (activeTab === 'frames' ? frameItems : merchItems),
    [activeTab]
  );

  const formatPrice = (value: number) => {
    return value.toLocaleString('ru-RU');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Магазин</Text>

        <View style={styles.balanceBox}>
          <Text style={styles.balanceText}>{formatPrice(carcoinBalance)}</Text>
          <Image
            source={require('../assets/images/coin.png')}
            style={styles.coinIcon}
          />
        </View>
      </View>

      <View style={styles.tabsRow}>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'frames' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('frames')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'frames' && styles.tabTextActive,
            ]}
          >
            Рамки
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'merch' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('merch')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'merch' && styles.tabTextActive,
            ]}
          >
            Мерч
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.itemTitle}>{item.title}</Text>

            <View style={styles.imageWrap}>
              <Image source={item.image} style={styles.itemImage} />
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceText}>{formatPrice(item.price)}</Text>
              <Image
                source={require('../assets/images/coin.png')}
                style={styles.priceCoin}
              />
            </View>

            <Pressable style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Купить</Text>
            </Pressable>
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
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#58627a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  headerTitle: {
    flex: 1,
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
  },
  balanceBox: {
    minWidth: 96,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#58627a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  balanceText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 6,
  },
  coinIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  tabsRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  tabButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#5a6480',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tabButtonActive: {
    backgroundColor: '#96eb1d',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 17,
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
    paddingBottom: 26,
  },
  card: {
    backgroundColor: '#4b546d',
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
  },
  itemTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  imageWrap: {
    height: 210,
    borderRadius: 18,
    backgroundColor: '#555f78',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    overflow: 'hidden',
  },
  itemImage: {
    width: '92%',
    height: '92%',
    resizeMode: 'contain',
  },
  priceRow: {
    height: 42,
    borderRadius: 12,
    backgroundColor: '#3e4659',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  priceText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 6,
  },
  priceCoin: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  buyButton: {
    alignSelf: 'center',
    minWidth: 140,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#96eb1d',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buyButtonText: {
    color: '#2f3442',
    fontSize: 18,
    fontWeight: '800',
  },
});