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
import {ChevronRightIcon } from 'react-native-heroicons/outline';
import BackButton from '../components/BackButton';

const AccountInfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton/>
        <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={require('../assets//images/icon.png')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Trần Thị Mộng Trúc Ngân</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>0342***085</Text>
            <ChevronRightIcon size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>trucngan****@il.com</Text>
            <ChevronRightIcon size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>trucngan***@il.com</Text>
            <ChevronRightIcon size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Đổi mật khẩu</Text>
            <ChevronRightIcon size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Xóa tài khoản</Text>
            <ChevronRightIcon size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuSection: {
    marginTop: 8,
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
  },
  logoutButton: {
    alignItems: 'center',
    padding: 16,
    marginTop: 24,
  },
  logoutText: {
    color: '#3498db',
    fontSize: 16,
  }
});

export default AccountInfoScreen;
