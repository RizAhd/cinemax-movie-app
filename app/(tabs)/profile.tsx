import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function profile() {
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full h-full' />
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <SafeAreaView className='flex-1'>
          <View className='px-5 mt-5'>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center'>
                <View className='w-10 h-10 bg-primary rounded-full items-center justify-center mr-3'>
                  <Text className='text-white text-xl font-bold'>C</Text>
                </View>
                <Text className='text-white text-2xl font-bold tracking-tight'>CINEMAX</Text>
                <Text className='text-[#00A8E1] text-2xl font-bold'>+</Text>
              </View>
            </View>
          </View>
          
          <View className='items-center mt-10'>
            <View className='w-32 h-32 rounded-full border-4 border-[#00A8E1] p-1'>
              <Image 
                source={images.defaultPoster} 
                className='w-full h-full rounded-full' 
              />
            </View>
            <Text className='text-white text-2xl font-bold mt-4'>Movie Lover</Text>
            <Text className='text-gray-400 mt-1'>cinemax@user.com</Text>
            
            <TouchableOpacity className='mt-6 px-6 py-2 bg-[#00A8E1] rounded-full'>
              <Text className='text-white font-semibold'>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          
          <View className='mt-10 px-5'>
            <BlurView intensity={50} className='rounded-2xl overflow-hidden'>
              <View className='p-5 bg-white/5'>
                <Text className='text-white text-xl font-bold mb-5'>Account</Text>
                
                {['Subscription', 'Payment Methods', 'Notifications', 'Privacy'].map((item, index) => (
                  <TouchableOpacity 
                    key={item} 
                    className='flex-row items-center justify-between py-4 border-b border-white/10'
                  >
                    <Text className='text-white text-base'>{item}</Text>
                    <Image source={icons.arrow} className='w-5 h-5' tintColor='#9CA3AF' />
                  </TouchableOpacity>
                ))}
              </View>
            </BlurView>
            
            <BlurView intensity={50} className='rounded-2xl overflow-hidden mt-6'>
              <View className='p-5 bg-white/5'>
                <Text className='text-white text-xl font-bold mb-5'>App</Text>
                
                {['Language', 'Quality', 'Downloads', 'Help & Support'].map((item, index) => (
                  <TouchableOpacity 
                    key={item} 
                    className='flex-row items-center justify-between py-4 border-b border-white/10'
                  >
                    <Text className='text-white text-base'>{item}</Text>
                    <Image source={icons.arrow} className='w-5 h-5' tintColor='#9CA3AF' />
                  </TouchableOpacity>
                ))}
              </View>
            </BlurView>
            
            <TouchableOpacity className='mt-8 px-6 py-4 bg-red-500/20 rounded-2xl items-center'>
              <Text className='text-red-400 font-semibold text-base'>Sign Out</Text>
            </TouchableOpacity>
            
            <Text className='text-gray-500 text-center mt-8 mb-10'>CINEMAX v1.0.0</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})