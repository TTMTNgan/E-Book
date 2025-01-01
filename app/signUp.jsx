import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import Icon from '../assets/icons';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import Input from '../components/Input';
import Button from '../components/Button';
import { auth } from '../src/config/FirebaseConfig';  // Ensure you import auth from your FirebaseConfig file
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef('');
  const nameRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Đăng ký thất bại', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    try {
      // Firebase Email Sign-Up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // After creating the user, you can update the user profile with their name
      await user.updateProfile({
        displayName: name,
      });

      setLoading(false);
      Alert.alert('Đăng ký thành công', 'Tài khoản của bạn đã được tạo');
      console.log('User:', user);
      // Redirect to another screen after successful sign-up
      router.push('Login');
    } catch (error) {
      setLoading(false);
      Alert.alert('Đăng ký thất bại', error.message);
      console.log('Error during sign-up:', error.message);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Hãy,</Text>
          <Text style={styles.welcomeText}>Bắt đầu</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Vui lòng điền thông tin để đăng ký
          </Text>
          <Input
            icon={<Icon name="user" size={26} strokeWidth={1.6} />}
            placeholder="Nhập tên của bạn"
            onChangeText={(value) => {
              nameRef.current = value;
            }}
          />
          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Nhập email"
            onChangeText={(value) => {
              emailRef.current = value;
            }}
          />
          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Nhập mật khẩu"
            secureTextEntry
            onChangeText={(value) => {
              passwordRef.current = value;
            }}
          />

          {/* Button */}
          <Button title="Đăng ký" loading={loading} onPress={onSubmit} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Bạn đã có tài khoản?</Text>
          <Pressable onPress={() => router.push('Login')}>
            <Text
              style={[
                styles.footerText,
                { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold },
              ]}
            >
              Đăng nhập
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});