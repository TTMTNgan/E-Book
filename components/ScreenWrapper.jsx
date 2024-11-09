import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';


const ScreenWrapper = ({ children, bg = 'white' }) => {
  
    const { top} = useSafeAreaInsets();
    const paddingTop = top>0 ? top + 5 : 30;

    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      {
        children
      }
    </SafeAreaView>
  )
}

export default ScreenWrapper