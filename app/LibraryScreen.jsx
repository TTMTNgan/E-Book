import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LibraryScreen = () => {
  const categories = [
    { id: '1', title: 'Đang đọc', icon: 'book', color: '#4CAF50' },
    { id: '2', title: 'Muốn đọc', icon: 'bookmark', color: '#2196F3' },
    { id: '3', title: 'Đã đọc xong', icon: 'check-circle', color: '#9C27B0' },
    { id: '4', title: 'Bộ sưu tập', icon: 'collections-bookmark', color: '#FF9800' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thư viện của tôi</Text>
      </View>

      {categories.map((item) => (
        <TouchableOpacity key={item.id} style={styles.categoryItem}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={24} color={item.color} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <Text style={styles.bookCount}>0 cuốn sách</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      ))}

      <View style={styles.emptyStateContainer}>
        <Icon name="menu-book" size={48} color="#666" />
        <Text style={styles.emptyStateText}>
          Bạn chưa có sách nào trong thư viện
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1A1A1A',
    marginVertical: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bookCount: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default LibraryScreen;
