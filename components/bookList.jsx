import { View, Text, TouchableWithoutFeedback, ScrollView, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const BookList = ({ title, data }) => {
  const handleBookPress = (item) => {
    router.push({
      pathname: "/BookScreen",
      params: {
        id: item.id || 1,
        title: item.title || 'Tên sách',
        author: item.author || 'Tác giả',
        description: item.description || 'Mô tả sách'
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableWithoutFeedback>
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </TouchableWithoutFeedback>
      </View>
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleBookPress(item)}
            >
              <View style={styles.bookContainer}>
                <Image 
                  source={require('../assets/images/books/3.png')}
                  style={styles.bookImage}
                  resizeMode="cover"
                />
                <Text 
                  style={styles.bookTitle} 
                  numberOfLines={2}
                >
                  {item?.title || 'Tên sách'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    gap: 12,
  },
  headerContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
  },
  bookContainer: {
    marginRight: 12,
    width: width * 0.35,
  },
  bookImage: {
    width: '100%',
    height: height * 0.25,
    borderRadius: 12,
    marginBottom: 8,
  },
  bookTitle: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 4,
    marginTop: 4,
  }
});

export default BookList
