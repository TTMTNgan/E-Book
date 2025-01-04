import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults] = useState([
    { id: 1, title: 'Tiếp đón năng lực của vũ trụ' },
    { id: 2, title: 'Tiếp đón năng lực của vũ trụ' },
    { id: 3, title: 'Tiếp đón năng lực của vũ trụ' },
    { id: 4, title: 'Tiếp đón năng lực của vũ trụ' },
    { id: 5, title: 'Tiếp đón năng lực của vũ trụ' },
    // Thêm kết quả tìm kiếm mẫu
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header Search Bar */}
      <View style={styles.searchHeader}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon size={28} color="white" />
        </TouchableOpacity>
        
        <View style={styles.searchInputContainer}>
          <MagnifyingGlassIcon size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Search Results */}
      <ScrollView style={styles.resultsContainer}>
        {searchResults.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.resultItem}
          >
            <View style={styles.resultIcon}>
              <MagnifyingGlassIcon size={20} color="#666" />
            </View>
            <Text style={styles.resultText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#333',
  },
  backButton: {
    marginRight: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  resultIcon: {
    marginRight: 12,
  },
  resultText: {
    color: 'white',
    fontSize: 16,
  }
});

export default SearchScreen;
