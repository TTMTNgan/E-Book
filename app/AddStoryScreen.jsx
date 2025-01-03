import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router'; // Chỉ import một lần
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const AddStoryScreen = () => {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log({ title, description, coverImage });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm Thông Tin Truyện</Text>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => router.push('/WritingPage')} // Chỉ giữ một onPress
        >
          <Text style={styles.skipText}>BỎ QUA</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Cover Image Picker */}
        <TouchableOpacity 
          style={styles.coverPickerContainer}
          onPress={pickImage}
        >
          {coverImage ? (
            <Image 
              source={{ uri: coverImage }} 
              style={styles.coverImage}
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="add" size={40} color="#666" />
              <Text style={styles.placeholderText}>Thêm một bìa</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Title Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Tiêu Đề Truyện"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.separator} />
        </View>

        {/* Description Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Mô Tả Truyện"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
          <View style={styles.separator} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  coverPickerContainer: {
    width: '100%',
    aspectRatio: 2/3,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    marginBottom: 24,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    marginTop: 8,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  titleInput: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 8,
  },
  descriptionInput: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 8,
    height: 100,
    textAlignVertical: 'top',
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginTop: 8,
  },
});

export default AddStoryScreen;
