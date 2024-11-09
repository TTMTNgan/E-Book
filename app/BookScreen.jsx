import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon, ArrowDownTrayIcon, EllipsisHorizontalIcon, ShareIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import BackButton from '../components/BackButton';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function BookScreen() {
  const params = useLocalSearchParams();
  const { id, title, author, description } = params;
  
  return (
    <View style={styles.container}>
      {/* Header với nút back và share */}
      <SafeAreaView style={styles.header}>
        <BackButton size={24} />
        <ShareIcon size={24} color="black" />
      </SafeAreaView>

      {/* Book Cover và thông tin cơ bản */}
      <View style={styles.bookInfo}>
        <Image 
          source={require('../assets/images/books/1.png')}
          style={styles.coverImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>{title || "Tên sách"}</Text>
        <TouchableOpacity style={styles.authorButton}>
          <Text style={styles.authorText}>Tác giả: {author || "Tác giả"}</Text>
        </TouchableOpacity>

        {/* Ratings và Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingNumber}>5.0/5</Text>
            <View style={styles.stars}>
              {[1,2,3,4,5].map((_, index) => (
                <StarIcon key={index} size={16} color="#FFD700" />
              ))}
            </View>
          </View>
          <View style={styles.viewsContainer}>
            <Text style={styles.viewsNumber}>4,123</Text>
            <Text style={styles.viewsText}>lượt xem</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.readButton}>
          <Text style={styles.readButtonText}>ĐỌC SÁCH</Text>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <HeartIcon size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <ArrowDownTrayIcon size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <EllipsisHorizontalIcon size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryTag}>
            <Text style={styles.categoryText}>Thơ - Tản văn</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {description || "Lưu Quang Vũ (1948-1988) là một trong những nhà thơ và tác giả kịch nổi bật của Việt Nam, được biết đến với phong cách thơ lãng mạn, sâu sắc và đậm chất nhân văn..."}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: ios ? 0 : 16,
  },
  bookInfo: {
    alignItems: 'center',
    padding: 16,
  },
  coverImage: {
    width: width * 0.5,
    height: height * 0.3,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  authorButton: {
    marginTop: 8,
  },
  authorText: {
    color: 'gray',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginTop: 16,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
  },
  viewsContainer: {
    alignItems: 'center',
  },
  readButton: {
    backgroundColor: '#00C853',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 24,
  },
  readButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginTop: 16,
  },
  categories: {
    flexDirection: 'row',
    marginTop: 16,
  },
  categoryTag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  description: {
    marginTop: 24,
  },
  descriptionText: {
    color: 'gray',
    lineHeight: 24,
  },
});