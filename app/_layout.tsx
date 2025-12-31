
import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from 'react';
import YourSplashScreen from '../components/SplashScreen';
import './global.css';

export default function RootLayout() {
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
 
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  if (isLoading) {
    return <YourSplashScreen />;
  }
  return(
  <>
    <StatusBar hidden={true} />
    <Stack >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="movies/[id]"
        options={{ headerShown: false, }} />
    </Stack>
    </>
  );
}