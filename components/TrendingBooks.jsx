// TrendingBooks.jsx
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const adjustedWidth = width * 0.6;
const height = adjustedWidth * 1.6;

const MovieCard = ({ item, handleClick }) => {
  if (!item) return null;
  
  return (
    <TouchableOpacity onPress={()=> handleClick(item)} style={styles.cardContainer}>
      <Image
        source={require('../assets/images/books/3.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const TrendingBooks = ({ data }) => {
  const handlePress = (item) => {
    router.push({
      pathname: '/BookScreen',
      params: {
        id: item.id,
        title: item.title,
        author: item.author,
        description: item.description
      }
    });
  };

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>No Trending Books Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Trending</Text>
      <Carousel
        loop
        width={adjustedWidth}
        height={height}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={() => handlePress(item)} />
        )}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 30,
        }}
        style={styles.carousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  carousel: {
    width: '100%',
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default TrendingBooks;