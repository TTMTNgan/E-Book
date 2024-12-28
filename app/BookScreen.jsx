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
  const bookCover = require('../assets/images/books/1.png');
  
  const handleReadBook = () => {
    router.push({
      pathname: "/ReadBookScreen",
      params: {
        id: params.id,
        title: params.title
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Background Image with Blur */}
      <Image 
        source={bookCover}
        style={styles.backgroundImage}
        blurRadius={5}
      />
      <View style={styles.gradientOverlay} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <SafeAreaView style={styles.header}>
          <BackButton style={styles.headerIcon} />
          <ShareIcon size={24} color="#FFF" style={styles.headerIcon} />
        </SafeAreaView>

        {/* Book Content */}
        <View style={styles.content}>
          {/* Cover Image */}
          <Image 
            source={bookCover}
            style={styles.coverImage}
            resizeMode="contain"
          />

          {/* Book Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Ai cũng đã từng</Text>
            <Text style={styles.author}>Lưu Quang Vũ</Text>

            {/* Rating Section */}
            <View style={styles.ratingSection}>
              <View style={styles.stars}>
                {[1,2,3,4,5].map((_, index) => (
                  <StarIcon key={index} size={16} color="#FFD700" />
                ))}
              </View>
              <Text style={styles.ratingText}>5.0</Text>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity 
              style={styles.readButton}
              onPress={handleReadBook}
            >
              <Text style={styles.readButtonText}>ĐỌC SÁCH</Text>
            </TouchableOpacity>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <HeartIcon size={24} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <ArrowDownTrayIcon size={24} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <EllipsisHorizontalIcon size={24} color="#FFF" />
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
              <Text style={styles.descriptionTitle}>Giới thiệu</Text>
              <Text style={styles.descriptionText}>
                Lưu Quang Vũ (1948-1988) là một trong những nhà thơ và tác giả kịch nổi bật của Việt Nam, được biết đến với phong cách thơ lãng mạn, sâu sắc và đậm chất nhân văn...
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Thêm dòng này
    width: width,
    height: height*1.2 , // Thay đổi từ height * 0.5 thành height
    opacity: 0.5,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject, // Thêm dòng này
    width: width,
    height: height*1.2, // Thay đổi từ height * 0.5 thành height
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: ios ? 0 : 16,
  },
  headerIcon: {
    padding: 8,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  coverImage: {
    width: width * 0.6,
    height: height * 0.35,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: '#999',
    marginTop: 8,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  readButton: {
    backgroundColor: '#00C853',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 24,
  },
  readButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginTop: 24,
  },
  iconButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 50,
  },
  categories: {
    flexDirection: 'row',
    marginTop: 24,
  },
  categoryTag: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 14,
  },
  description: {
    width: '100%',
    marginTop: 32,
    marginBottom: 32,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12,
  },
  descriptionText: {
    color: '#999',
    fontSize: 16,
    lineHeight: 24,
  }
});
