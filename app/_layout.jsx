import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Ngăn màn hình splash tự động ẩn
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // Thêm phần load fonts nếu cần
  const [fontsLoaded] = useFonts({
    // your fonts here
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      initialRouteName="index"  // Thêm route mặc định
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="BookScreen"
        options={{
          headerShown: false,
          presentation: 'modal'
        }}
      />
      <Stack.Screen 
        name="HomeScreens"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="signUp"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="welcome"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}