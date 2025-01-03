import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';  // Add this import

const WriteScreen = () => {
    const router = useRouter();  // Add this
  
    return (
      <View style={styles.container}>
        {/* Header with user info */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.avatar}
                defaultSource={require('../assets/images/favicon.png')}
              />
            </View>
            <Text style={styles.username}>Trần Thị Mộng Trúc Ngân</Text>
          </View>
          <Text style={styles.headerTitle}>Viết</Text>
        </View>
  
        {/* Writing options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => router.push('/AddStoryScreen')}  // Add this
          >
            <Ionicons name="add-outline" size={24} color="white" />
            <Text style={styles.optionText}>Viết một truyện mới</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="create-outline" size={24} color="white" />
            <Text style={styles.optionText}>Chỉnh sửa một truyện khác</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    color: 'white',
    fontSize: 14,
  },
  headerTitle: {
    color: 'white',
    fontSize: 14,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WriteScreen;