import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar';
import { wp, hp } from '../helpers/common';
import { theme } from '../constants/theme';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
 


const Welcome = () => {
    const router = useRouter();
    return (
    <ScreenWrapper>
        <StatusBar style='dark' />
        <ImageBackground 
          source={require('../assets/images/welcome.png')}
          style={styles.backgroundImage}
          resizeMode='cover'
        >
          <View style={styles.container}>
            {/* title */}
            <View style={{gap: 20}}>
              <Text style={styles.title}>LinkUp!</Text>
              <Text style={styles.punchline}>
                Bất cứ nơi đâu cũng có thể đọc sách
              </Text>

              {/* footer */}
              <View style={styles.footer}>
                <Button
                  title="Getting Started"
                  buttonStyle={{marginHorizontal: wp(3)}}
                  onPress={()=>router.push('signUp')}
                />
                <View style={styles.bottomTextContainer}>
                  <Text style={styles.loginText}>
                      Bạn đã có tài khoản!
                  </Text>
                  <Pressable onPress={()=> router.push('Login')}>
                    <Text style={[styles.loginText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
                       Login
                    </Text>
                  </Pressable>
                </View>
              </View>

            </View>
          </View>
        </ImageBackground>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: wp(4),
    },
    title: {
      fontSize: hp(4),
      fontWeight: theme.fonts.extrabold,
      color: theme.colors.text,
      textAlign: 'center',
    },
    punchline: {
      textAlign: 'center',
      fontSize: hp(1.7),
      color: theme.colors.text,
      fontWeight: theme.fonts.bold,
    },
    footer: {
      gap: 30,
      width: 'auto'
    },
    bottomTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    loginText: {
      textAlign: 'center',
      color: theme.colors.text,
      fontSize: hp(1.6),
    }
    
    
})