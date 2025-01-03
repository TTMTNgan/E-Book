import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WritingPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontFamily, setFontFamily] = useState('default');
  
  // State cho nội dung và lịch sử
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [history, setHistory] = useState(['']); // Mảng lưu lịch sử các thay đổi
  const [currentIndex, setCurrentIndex] = useState(0); // Vị trí hiện tại trong lịch sử

  const fonts = [
    { label: 'Mặc định', value: 'default' },
    { label: 'Roboto', value: 'Roboto' },
    { label: 'Times New Roman', value: 'Times' },
  ];

  // Xử lý khi người dùng nhập text
  const handleContentChange = (text) => {
    setContent(text);
    
    // Chỉ thêm vào lịch sử nếu nội dung thực sự thay đổi
    if (text !== history[currentIndex]) {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(text);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    }
  };

  // Xử lý Undo
  const handleUndo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setContent(history[currentIndex - 1]);
    }
  }, [currentIndex, history]);

  // Xử lý Redo
  const handleRedo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setContent(history[currentIndex + 1]);
    }
  }, [currentIndex, history]);

  // Kiểm tra xem có thể Undo/Redo không
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Part 1 of 1</Text>
        <TouchableOpacity>
          <Text style={styles.publishButton}>ĐĂNG</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.mediaUpload}>
          <Ionicons name="image-outline" size={24} color="#666" />
          <Text style={styles.mediaText}>Nhấp để thêm media</Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.titleInput, { fontSize: fontSize }]}
          placeholder="Đặt Tiêu đề cho Chương Truyện của bạn"
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[
            styles.contentInput,
            {
              fontSize: fontSize,
              lineHeight: fontSize * lineHeight,
              fontFamily: fontFamily === 'default' ? undefined : fontFamily
            }
          ]}
          placeholder="Nhấp vào đây để bắt đầu viết"
          placeholderTextColor="#666"
          multiline
          value={content}
          onChangeText={handleContentChange}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navLeft}>
          <TouchableOpacity 
            style={[
              styles.navButton,
              !canUndo && styles.disabledButton
            ]}
            onPress={handleUndo}
            disabled={!canUndo}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={canUndo ? '#666' : '#333'} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.navButton,
              !canRedo && styles.disabledButton
            ]}
            onPress={handleRedo}
            disabled={!canRedo}
          >
            <Ionicons 
              name="arrow-forward" 
              size={24} 
              color={canRedo ? '#666' : '#333'} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.navRight}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => setShowSettings(true)}
          >
            <Text style={styles.formatText}>Aa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="image" size={24} color="#FFA500" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="play" size={24} color="#FFA500" />
          </TouchableOpacity>
        </View>
      </View>

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
                  <Text style={styles.controlButtonText}>A-</Text>
                </TouchableOpacity>
                <Text style={styles.settingValue}>{fontSize}</Text>
                <TouchableOpacity 
                  style={styles.controlButton}
                  onPress={() => setFontSize(prev => Math.min(24, prev + 2))}
                >
                  <Text style={styles.controlButtonText}>A+</Text>
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
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.settingValue}>{lineHeight.toFixed(1)}</Text>
                <TouchableOpacity 
                  style={styles.controlButton}
                  onPress={() => setLineHeight(prev => Math.min(2, prev + 0.1))}
                >
                  <Text style={styles.controlButtonText}>+</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
  },
  publishButton: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mediaUpload: {
    height: 200,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mediaText: {
    color: '#666',
    marginTop: 8,
  },
  titleInput: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contentInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  navLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  navRight: {
    flexDirection: 'row',
    gap: 16,
  },
  navButton: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  formatText: {
    color: '#FFA500',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingSection: {
    marginBottom: 20,
  },
  settingLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  settingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  controlButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
  },
  settingValue: {
    color: 'white',
    fontSize: 16,
    minWidth: 40,
    textAlign: 'center',
  },
  fontFamilyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  fontButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedFont: {
    backgroundColor: '#FFA500',
  },
  fontButtonText: {
    color: 'white',
    fontSize: 14,
  },
  selectedFontText: {
    color: 'black',
  },
  closeButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WritingPage;
