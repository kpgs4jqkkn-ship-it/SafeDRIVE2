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

type Pack = {
  id: number;
  coins: number;
  price: string;
  bonus?: string;
};

export default function CarcoinPayScreen() {
  const router = useRouter();
  const [selectedPackId, setSelectedPackId] = useState<number>(2);

  const packs: Pack[] = [
    { id: 1, coins: 100, price: '99 ₽' },
    { id: 2, coins: 250, price: '199 ₽', bonus: '+25 бонус' },
    { id: 3, coins: 700, price: '499 ₽', bonus: '+100 бонус' },
    { id: 4, coins: 1500, price: '899 ₽', bonus: '+300 бонус' },
  ];

  const selectedPack = useMemo(
    () => packs.find((pack) => pack.id === selectedPackId) ?? packs[0],
    [packs, selectedPackId]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Пополнить carcoin</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.balanceLabel}>Ваш баланс</Text>
            <Text style={styles.balanceValue}>245 carcoin</Text>
          </View>

          <Image
            source={require('../assets/images/coin.png')}
            style={styles.balanceCoin}
          />
        </View>

        <Text style={styles.sectionTitle}>Выберите пакет</Text>

        {packs.map((pack) => {
          const isSelected = pack.id === selectedPackId;

          return (
            <Pressable
              key={pack.id}
              style={[
                styles.packCard,
                isSelected && styles.packCardSelected,
              ]}
              onPress={() => setSelectedPackId(pack.id)}
            >
              <View style={styles.packLeft}>
                <View style={styles.coinBadge}>
                  <Image
                    source={require('../assets/images/coin.png')}
                    style={styles.coinBadgeIcon}
                  />
                </View>

                <View>
                  <Text
                    style={[
                      styles.packCoins,
                      isSelected && styles.packCoinsSelected,
                    ]}
                  >
                    {pack.coins} carcoin
                  </Text>

                  {pack.bonus ? (
                    <Text style={styles.packBonus}>{pack.bonus}</Text>
                  ) : (
                    <Text style={styles.packBonusMuted}>Без бонуса</Text>
                  )}
                </View>
              </View>

              <View style={styles.packRight}>
                <Text
                  style={[
                    styles.packPrice,
                    isSelected && styles.packPriceSelected,
                  ]}
                >
                  {pack.price}
                </Text>

                <View
                  style={[
                    styles.radioOuter,
                    isSelected && styles.radioOuterSelected,
                  ]}
                >
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </View>
            </Pressable>
          );
        })}

        <View style={styles.paymentInfoCard}>
          <Text style={styles.paymentInfoTitle}>Способ оплаты</Text>
          <Text style={styles.paymentInfoText}>Банковская карта</Text>
          <Text style={styles.paymentInfoSubtext}>
            После нажатия откроется экран подтверждения оплаты.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>К оплате</Text>
          <Text style={styles.totalValue}>{selectedPack.price}</Text>
        </View>

        <Pressable style={styles.payButton}>
          <Text style={styles.payButtonText}>
            Купить {selectedPack.coins}
          </Text>
        </Pressable>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2c3443',
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
    fontSize: 22,
    fontWeight: '800',
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 120,
  },

  balanceCard: {
    backgroundColor: '#4b546d',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  balanceLabel: {
    color: '#d4d9e5',
    fontSize: 14,
    marginBottom: 4,
  },

  balanceValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
  },

  balanceCoin: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  packCard: {
    backgroundColor: '#4b546d',
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  packCardSelected: {
    borderColor: '#96eb1d',
    backgroundColor: '#556078',
  },

  packLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  coinBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2f3442',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  coinBadgeIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

  packCoins: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },

  packCoinsSelected: {
    color: '#ffffff',
  },

  packBonus: {
    color: '#96eb1d',
    fontSize: 14,
    fontWeight: '700',
  },

  packBonusMuted: {
    color: '#c7cfde',
    fontSize: 14,
  },

  packRight: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },

  packPrice: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },

  packPriceSelected: {
    color: '#ffffff',
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#cfd6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterSelected: {
    borderColor: '#96eb1d',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#96eb1d',
  },

  paymentInfoCard: {
    backgroundColor: '#4b546d',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginTop: 8,
  },

  paymentInfoTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },

  paymentInfoText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 6,
  },

  paymentInfoSubtext: {
    color: '#d4d9e5',
    fontSize: 14,
    lineHeight: 20,
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2f3442',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalLabel: {
    color: '#d4d9e5',
    fontSize: 14,
    marginBottom: 2,
  },

  totalValue: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },

  payButton: {
    minWidth: 160,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#96eb1d',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  payButtonText: {
    color: '#2f3442',
    fontSize: 18,
    fontWeight: '800',
  },
});