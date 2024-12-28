import { Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
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


const Login = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Đăng nhập thất bại', "Vui lòng nhập đầy đủ thông tin")
      return;
    }
    //
  }

  return (
    <ScreenWrapper bg='white'>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
            Vui lòng đăng nhập để tiếp tục!
          </Text>
          <Input
            icon={<Icon name='mail' size={26} strokeWidth={1.6} />}
            placeholder='Nhập email'
            onChangeText={(value) =>{emailRef.current = value}}
          />
          <Input
            icon={<Icon name='lock' size={26} strokeWidth={1.6} />}
            placeholder='Nhập mật khẩu'
            secureTextEntry
            onChangeText={(value) =>{passwordRef.current = value}}
          />
          <Text style={styles.forgotPassword}>
            Quên mật khẩu?
          </Text>

          {/* Button */}

          <Button title={'Đăng nhập'} loading={loading} onPress={onSubmit} />
          
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Bạn chưa có tài khoản?
          </Text>
          <Pressable onPress={()=> router.push('signUp')}>
            <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Đăng ký</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}
export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText:{
    fontSize: hp(4),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  form:{
    gap: 25,
  },
  forgotPassword:{
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap: 5,
  },
  footerText:{
    textAlign: 'center',
    color: theme.colors.text,
    fontSizen: hp(1.6)
  }

})