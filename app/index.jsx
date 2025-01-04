import { Button, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper';
import 'react-native-gesture-handler'
import 'react-native-reanimated';

const index = () => {
  const router = useRouter();
  console.log(router);
  return (
    <ScreenWrapper>
      <Text>index</Text>
      <Button title='welcome' onPress={()=>router.push('HomeScreens')} />
    </ScreenWrapper>
  )
}

export default index