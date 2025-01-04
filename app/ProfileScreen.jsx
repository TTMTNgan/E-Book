import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';  // Add this import

const ProfileScreen = () => {
  const router = useRouter();  // Add this
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Hồ sơ cá nhân */}
        <TouchableOpacity style={styles.profileSection} onPress={() => router.push('/AccountInfoScreen')} >
          <View style={styles.profileInfo}>
            <Image 
              source={require('../assets/images/icon.png')}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Trần Thị Mộng Trúc Ngân</Text>
              <Text style={styles.userStatus}>Xem thông tin cá nhân</Text>
            </View>
          </View>
          <ChevronRightIcon size={20} color="#666"/>
        </TouchableOpacity>

        {/* Lịch sử đọc sách */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Lịch sử đọc sách</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Phút đọc hôm nay</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Phút nghe hôm nay</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Thông báo</Text>
            <ChevronRightIcon size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Cài đặt</Text>
            <ChevronRightIcon size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Trợ giúp & Phản hồi</Text>
            <ChevronRightIcon size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Điều khoản sử dụng</Text>
            <ChevronRightIcon size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userStatus: {
    color: '#666',
    fontSize: 14,
  },
  statsSection: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
  },
  menuSection: {
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  }
});

export default ProfileScreen;
