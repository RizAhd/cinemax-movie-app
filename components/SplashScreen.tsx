import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Image, Text, View } from 'react-native';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo bounce animation
      Animated.spring(logoScaleAnim, {
        toValue: 1.1,
        tension: 150,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    // Fade in text and effects
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
        delay: 200,
      })
    ]).start();

    const timer = setTimeout(() => {
      // router.replace('/(tabs)');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#0F1B2F', '#131921']}
      className="flex-1 justify-center items-center"
    >
      {/* Logo Container */}
      <Animated.View 
        style={{ 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
        className="mb-8"
      >
        <View className="relative">
          {/* Glow effect */}
          <View className="absolute -inset-4 bg-accent/20 rounded-2xl blur-md" />
          
          {/* Logo background */}
          <LinearGradient
            colors={['#00A8E1', '#14C6FF']}
            className="w-32 h-32 rounded-2xl items-center justify-center shadow-xl"
          >
           
            <Animated.View 
              style={{ transform: [{ scale: logoScaleAnim }] }}
              className="w-24 h-24 rounded-lg items-center justify-center"
            >
              <Image 
                source={require('@/assets/images/logo1.png')}
                className="w-full h-full"
                resizeMode="contain"
              />
            </Animated.View>
          </LinearGradient>
        </View>
      </Animated.View>

      {/* App Name */}
      <Animated.View 
        style={{ opacity: fadeAnim }}
        className="items-center"
      >
        <Text className="text-white text-4xl font-bold mb-2 tracking-tight">
          Cinemax
        </Text>
        <Text className="text-gray-300 text-sm tracking-wider">
          Unlimited Entertainment
        </Text>
      </Animated.View>

      {/* Loading Animation */}
      <View className="absolute bottom-20">
        <View className="flex-row items-center justify-center mb-2">
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={{
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 0.3, 0.6, 1],
                  outputRange: [0.3, 0.8, 0.8, 0.3]
                }),
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, -4, 0]
                    })
                  }
                ]
              }}
              className="w-2 h-2 bg-accent rounded-full mx-1.5"
            />
          ))}
        </View>
        <Text className="text-gray-400 text-xs text-center">
          Loading your experience...
        </Text>
      </View>
    </LinearGradient>
  );
}