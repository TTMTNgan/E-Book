import { View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenWrapper = ({ children, bg = 'white' }) => {
  const { top, bottom } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  
  // Thêm paddingBottom để tránh content bị che bởi BottomNav
  const paddingBottom = bottom + 70; // 70 là chiều cao của BottomNav

  return (
    <SafeAreaView 
      style={{ 
        flex: 1, 
        backgroundColor: bg,
        paddingBottom: paddingBottom // Thêm padding bottom
      }}
    >
      <View style={{ 
        flex: 1,
        paddingTop: paddingTop
      }}>
        {children}
      </View>
    </SafeAreaView>
  )
}

export default ScreenWrapper
