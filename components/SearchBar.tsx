import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className='flex-row items-center bg-gray-900 rounded-lg px-4 py-3'>
      <Image 
        source={icons.search} 
        className='size-5 mr-3' 
        tintColor='#8C8C8C' 
      />
      <TextInput 
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor='#8C8C8C'
        className='flex-1 text-white text-base'
        editable={!onPress}
      />
    </View>
  );
};

export default SearchBar;