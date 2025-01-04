import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { StatusBar } from 'expo-status-bar';

const {width, height} = Dimensions.get('window');

const CategoryScreen = () => {
  const categories = [
    {
      id: 1,
      name: 'Kinh doanh',
      total: 150
    },
    {
      id: 2,
      name: 'Sách nói',
      total: 80
    },
    {
      id: 3,
      name: 'Truyện tranh',
      total: 200
    },
    {
      id: 4,
      name: 'Sách thiếu nhi',
      total: 120
    },
    {
      id: 5,
      name: 'Quản trị - Lãnh đạo',
      total: 90
    },
    {
      id: 6,
      name: 'Tài chính ngân hàng',
      total: 70
    },
    {
      id: 7,
      name: 'Tâm lý - Kỹ năng sống',
      total: 180
    },
    {
      id: 8,
      name: 'Ngoại ngữ',
      total: 100
    },
    {
      id: 9,
      name: 'Truyện - Tiểu thuyết',
      total: 250
    },
    {
      id: 10,
      name: 'Phát triển bản thân',
      total: 160
    },
    {
      id: 11,
      name: 'Văn học',
      total: 220
    },
    {
      id: 12,
      name: 'Chứng khoán',
      total: 50
    },
    {
      id: 13,
      name: 'Truyện ngắn',
      total: 130
    },
    {
      id: 14,
      name: 'Chính trị - Triết học',
      total: 85
    }
  ];

  const handleCategoryPress = (category) => {
    console.log('Selected category:', category.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <BackButton />
          <Text style={styles.headerTitle}>Thể loại</Text>
          <View style={{width: 40}} />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(category)}
            >
              <View style={styles.categoryContent}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.total} cuốn</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  header: {
    backgroundColor: '#1F1F1F',
    borderBottomWidth: 0.3,
    borderBottomColor: '#333',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  categoryItem: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  categoryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  categoryCount: {
    color: '#666',
    fontSize: 14,
  }
});

export default CategoryScreen;
