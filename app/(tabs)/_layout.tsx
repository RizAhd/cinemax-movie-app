import { icons } from '@/constants/icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <View className="flex-row w-full min-w-[120px] min-h-16 justify-center items-center rounded-full overflow-hidden bg-accent">
        <Image
          source={icon}
          className="size-5"
          style={{ tintColor: "#FFFFFF" }}
        />
        <Text className="text-white font-medium ml-2 text-sm">
          {title}
        </Text>
      </View>
    )
  }
  return (
    <View className="size-full justify-center items-center">
      <Image 
        source={icon} 
        tintColor='#CCCCCC' 
        className='size-5' 
      />
    </View>
  )
}

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          backgroundColor: '#0F1B2F', // primary color
          borderRadius: 16,
          marginHorizontal: 20,
          marginBottom: 24,
          height: 64,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 2,
          borderColor: '#232F3E', // secondary color
          shadowColor: '#00A8E1', // accent color
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon={icons.home} 
              title='Home' 
            />
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon={icons.search} 
              title='Search' 
            />
          )
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Watchlist',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon={icons.save} 
              title='Watchlist' 
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon={icons.person} 
              title='Profile' 
            />
          )
        }}
      />
    </Tabs>
  );
};

export default _layout;