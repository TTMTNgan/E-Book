import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import SummaryModal from '../components/SummaryModal';
import React, { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cog6ToothIcon, BookmarkIcon as BookmarkOutline } from 'react-native-heroicons/outline';
import { BookmarkIcon as BookmarkSolid } from 'react-native-heroicons/solid';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Pdf from 'react-native-pdf'; 

// Components
import BackButton from '../components/BackButton';
import FloatingActionButton from '../components/FloatingActionButton';

export default function ReadBookScreen() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Black': require('../assets/fonts/Roboto-Black.ttf'),
  });

  const params = useLocalSearchParams();
  const { id } = params;
  const [bookContent, setBookContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const scrollViewRef = useRef(null);
  const [totalPages, setTotalPages] = useState(1);
  const [showSummary, setShowSummary] = useState(false);

  // Settings states
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontFamily, setFontFamily] = useState('System');

  const fonts = [
    { label: 'Mặc định', value: 'System' },
    { label: 'Mono', value: 'Mono' },
    { label: 'Black', value: 'Black' },
  ];

  useEffect(() => {
    loadBookmark();
  }, [id]);

  const toggleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    try {
      if (!isBookmarked) {
        await saveBookmark({
          bookId: id,
          page: currentPage,
          // Here you may want to fetch scroll position another way since Pdf doesn't have scroll position tracking like ScrollView
        });
      } else {
        await AsyncStorage.removeItem(`bookmark_${id}`);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const saveBookmark = async (bookmarkData) => {
    try {
      await AsyncStorage.setItem(
        `bookmark_${bookmarkData.bookId}`,
        JSON.stringify(bookmarkData)
      );
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const loadBookmark = async () => {
    try {
      const bookmark = await AsyncStorage.getItem(`bookmark_${id}`);
      if (bookmark) {
        const bookmarkData = JSON.parse(bookmark);
        setIsBookmarked(true);
        // Handle restoring bookmark
        setCurrentPage(bookmarkData.page);
      }
    } catch (error) {
      console.error('Error loading bookmark:', error);
    }
  };

  const handleAudioBook = () => {
    console.log('Audio Book pressed');
    // Implement audio book functionality
  };

  const handleAISummary = () => {
    if (!bookContent) {
      Alert.alert(
        "Thông báo",
        "Không thể tạo tóm tắt khi chưa có nội dung sách.",
        [{ text: "OK" }]
      );
      return;
    }
    setShowSummary(true);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <View style={styles.headerRight}>
            <TouchableOpacity 
              onPress={toggleBookmark}
              style={styles.headerButton}
            >
              {isBookmarked ? (
                <BookmarkSolid size={24} color="#3B82F6" />
              ) : (
                <BookmarkOutline size={24} color="black" />
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setShowSettings(true)}
              style={styles.headerButton}
            >
              <Cog6ToothIcon size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Page Indicator */}
        <View style={styles.pageIndicator}>
          <Text style={styles.pageText}>
            Trang {currentPage}/{totalPages}
          </Text>
        </View>

        {/* Content */}
        {/* <Pdf
          source={require('../filetest/BPTT.pdf')}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
            setTotalPages(numberOfPages);
          }}
          onPageChanged={(page, numberOfPages) => {
            setCurrentPage(page);
          }}
          style={styles.pdf}
        /> */}

        {/* Settings Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showSettings}
          onRequestClose={() => setShowSettings(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Cài đặt hiển thị</Text>
              
              {/* Font Size Settings */}
              <View style={styles.settingSection}>
                <Text style={styles.settingLabel}>Cỡ chữ</Text>
                <View style={styles.settingControls}>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={() => setFontSize(prev => Math.max(12, prev - 2))}
                  >
                    <Text>A-</Text>
                  </TouchableOpacity>
                  <Text>{fontSize}</Text>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={() => setFontSize(prev => Math.min(24, prev + 2))}
                  >
                    <Text>A+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Line Height Settings */}
              <View style={styles.settingSection}>
                <Text style={styles.settingLabel}>Khoảng cách dòng</Text>
                <View style={styles.settingControls}>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={() => setLineHeight(prev => Math.max(1, prev - 0.1))}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text>{lineHeight.toFixed(1)}</Text>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={() => setLineHeight(prev => Math.min(2, prev + 0.1))}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Font Family Settings */}
              <View style={styles.settingSection}>
                <Text style={styles.settingLabel}>Font chữ</Text>
                <View style={styles.fontFamilyContainer}>
                  {fonts.map((font) => (
                    <TouchableOpacity 
                      key={font.value}
                      style={[
                        styles.fontButton,
                        fontFamily === font.value && styles.selectedFont
                      ]}
                      onPress={() => setFontFamily(font.value)}
                    >
                      <Text style={[
                        styles.fontButtonText,
                        fontFamily === font.value && styles.selectedFontText
                      ]}>
                        {font.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowSettings(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Floating Action Button */}
        <FloatingActionButton 
          onAudioBook={handleAudioBook}
          onAISummary={handleAISummary}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  pdf: {
    flex: 1,
    padding: 16, // Adjust the padding as needed
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  pageText: {
    color: 'white',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingSection: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  settingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
  },
  controlButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    minWidth: 40,
    alignItems: 'center',
  },
  fontFamilyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  fontButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedFont: {
    backgroundColor: '#3B82F6',
  },
  fontButtonText: {
    color: 'black',
  },
  selectedFontText: {
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
