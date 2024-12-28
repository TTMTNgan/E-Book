import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { SpeakerWaveIcon, SparklesIcon } from 'react-native-heroicons/solid';
import NetInfo from '@react-native-community/netinfo';
import { generateSummary } from '../services/geminiService';

const BUTTON_SIZE = 56;

const FloatingActionButton = ({ onAudioBook, currentText = "Đây là văn bản mẫu" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
    rotation.value = withSpring(isExpanded ? 0 : 45);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    },
  });

  const handleAISummary = async () => {
    try {
      // Kiểm tra kết nối mạng
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        Alert.alert('Lỗi', 'Vui lòng kiểm tra kết nối mạng');
        return;
      }

      setModalVisible(true);
      setIsLoading(true);
      setSummary('');

      const result = await generateSummary(currentText);
      setSummary(result);

    } catch (error) {
      let errorMessage = 'Đã có lỗi xảy ra';
      
      if (error.response) {
        errorMessage = `Lỗi server: ${error.response.status}`;
        console.error('API Error:', error.response.data);
      } else if (error.request) {
        errorMessage = 'Không thể kết nối tới server';
      } else {
        errorMessage = error.message;
      }

      setSummary(errorMessage);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const menuAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.floatingButtonContainer, animatedStyles]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={toggleMenu}
            activeOpacity={0.8}
          >
            <Animated.View style={menuAnimatedStyles}>
              <Text style={styles.plusIcon}>+</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>

      {isExpanded && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={onAudioBook}
            activeOpacity={0.8}
          >
            <SpeakerWaveIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleAISummary}
            activeOpacity={0.8}
          >
            <SparklesIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>AI Summary</Text>
            
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text style={styles.loadingText}>Đang tạo tóm tắt...</Text>
              </View>
            ) : (
              <Text style={[
                styles.summaryText,
                summary.includes('Lỗi') && styles.errorText
              ]}>
                {summary || 'Không có nội dung'}
              </Text>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setSummary('');
              }}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 999,
  },
  mainButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  plusIcon: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  menuContainer: {
    position: 'absolute',
    bottom: BUTTON_SIZE + 10,
    right: 0,
    alignItems: 'center',
  },
  menuButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1F2937',
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#374151',
    textAlign: 'left',
    width: '100%',
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#6B7280',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FloatingActionButton;
