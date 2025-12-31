import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  if (!value) return null;
  
  return (
    <View className='mb-5'>
      <Text className='text-gray-400 font-medium text-sm mb-1.5'>{label}</Text>
      <Text className='text-white font-semibold text-base leading-5'>{value}</Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading) {
    return (
      <View className="flex-1 bg-dark justify-center items-center">
        <LinearGradient
          colors={['#0F1B2F', '#131921']}
          className="absolute inset-0"
        />
        <ActivityIndicator size="large" color="#00A8E1" />
        <Text className="text-white mt-4">Loading movie details...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View className="flex-1 bg-dark justify-center items-center px-5">
        <LinearGradient
          colors={['#0F1B2F', '#131921']}
          className="absolute inset-0"
        />
        {/* <Image source={icons.error} className="w-16 h-16 mb-4" tintColor="#94A3B8" /> */}
        <Text className="text-white text-xl font-bold mb-2">Movie Not Found</Text>
        <Text className="text-gray-400 text-center mb-6">
          The movie you're looking for doesn't exist or is unavailable.
        </Text>
        <TouchableOpacity 
          onPress={router.back}
          className="px-6 py-3 bg-accent rounded-full"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-dark'>
      <LinearGradient
        colors={['#0F1B2F', '#131921']}
        className="absolute inset-0"
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Backdrop Image with Gradient Overlay */}
        <View className="relative">
          <Image 
            source={{ 
              uri: `https://image.tmdb.org/t/p/w780${movie?.backdrop_path || movie?.poster_path}`
            }} 
            className="w-full h-80"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(15,27,47,0.9)', 'rgba(15,27,47,0.3)', 'transparent', 'rgba(15,27,47,0.9)']}
            className="absolute inset-0"
          />
          
          <SafeAreaView className="absolute top-0 w-full z-10">
            <View className="flex-row items-center justify-between px-5">
              <TouchableOpacity 
                onPress={router.back}
                className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
              >
                <Image source={icons.arrow} className="w-5 h-5" tintColor="#fff" />
              </TouchableOpacity>
              
              <View className="flex-row space-x-3">
                <TouchableOpacity className="w-10 h-10 rounded-full bg-black/40 items-center justify-center">
                  <Image source={icons.save} className="w-5 h-5" tintColor="#fff" />
                </TouchableOpacity>
                {/* <TouchableOpacity className="w-10 h-10 rounded-full bg-black/40 items-center justify-center">
                  <Image source={icons.share} className="w-5 h-5" tintColor="#fff" />
                </TouchableOpacity> */}
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* Movie Content */}
        <View className="px-5 -mt-12">
          <View className="flex-row items-start">
            <Image 
              source={{ 
                uri: `https://image.tmdb.org/t/p/w342${movie?.poster_path}`
              }} 
              className="w-32 h-48 rounded-xl shadow-2xl"
              resizeMode="cover"
            />
            
            <View className="flex-1 ml-4 pt-8">
              <Text className="text-white text-2xl font-bold leading-tight mb-2">
                {movie?.title}
              </Text>
              
              {movie?.tagline && (
                <Text className="text-accent italic text-sm mb-3">
                  "{movie.tagline}"
                </Text>
              )}
              
              <View className="flex-row items-center mb-4">
                <Text className="text-gray-300 mr-4">
                  {movie?.release_date?.split('-')[0] || 'N/A'}
                </Text>
                <Text className="text-gray-300">
                  • {movie?.runtime || 'N/A'} min
                </Text>
                <Text className="text-gray-300 ml-4">
                  • {movie?.adult ? 'R' : 'PG-13'}
                </Text>
              </View>
              
              {/* Rating */}
              <View className="flex-row items-center bg-black/30 px-4 py-2 rounded-xl self-start">
                <Image source={icons.star} className="w-5 h-5 mr-2" tintColor="#FFD814" />
                <View>
                  <Text className="text-white font-bold text-lg">
                    {movie?.vote_average?.toFixed(1)}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {movie?.vote_count?.toLocaleString()} votes
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Genres */}
          {movie?.genres?.length > 0 && (
            <View className="flex-row flex-wrap mt-6 gap-2">
              {movie.genres.map((genre) => (
                <View 
                  key={genre.id} 
                  className="px-4 py-2 bg-accent/20 rounded-full"
                >
                  <Text className="text-accent text-sm font-medium">{genre.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Overview */}
          {movie?.overview && (
            <View className="mt-8">
              <Text className="text-white text-xl font-bold mb-4">Overview</Text>
              <Text className="text-gray-300 text-base leading-6">
                {movie.overview}
              </Text>
            </View>
          )}

          {/* Movie Info Grid */}
          <View className="mt-8">
            <Text className="text-white text-xl font-bold mb-5">Details</Text>
            
            <View className="bg-black/20 rounded-xl p-5">
              <View className="flex-row flex-wrap justify-between">
                <View className="w-1/2 mb-4">
                  <MovieInfo label="Original Language" value={movie?.original_language?.toUpperCase()} />
                </View>
                <View className="w-1/2 mb-4">
                  <MovieInfo label="Status" value={movie?.status} />
                </View>
                {movie?.budget > 0 && (
                  <View className="w-1/2 mb-4">
                    <MovieInfo 
                      label="Budget" 
                      value={`$${(movie.budget / 1_000_000).toFixed(1)}M`}
                    />
                  </View>
                )}
                {movie?.revenue > 0 && (
                  <View className="w-1/2 mb-4">
                    <MovieInfo 
                      label="Revenue" 
                      value={`$${(movie.revenue / 1_000_000).toFixed(1)}M`}
                    />
                  </View>
                )}
              </View>
              
              {movie?.production_companies?.length > 0 && (
                <View className="mt-2">
                  <Text className="text-gray-400 font-medium text-sm mb-2">
                    Production Companies
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {movie.production_companies.slice(0, 4).map((company) => (
                      <View 
                        key={company.id} 
                        className="px-3 py-1.5 bg-white/5 rounded-lg"
                      >
                        <Text className="text-gray-300 text-xs">{company.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Cast Section (Placeholder) */}
          <View className="mt-8">
            <Text className="text-white text-xl font-bold mb-4">Top Cast</Text>
            <View className="h-32 bg-black/20 rounded-xl items-center justify-center">
              <Text className="text-gray-400">Cast information coming soon</Text>
            </View>
          </View>

          {/* Similar Movies (Placeholder) */}
          <View className="mt-8 mb-10">
            <Text className="text-white text-xl font-bold mb-4">Similar Movies</Text>
            <View className="h-40 bg-black/20 rounded-xl items-center justify-center">
              <Text className="text-gray-400">Similar movies will appear here</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Watch Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark via-dark/95 to-transparent pt-8 pb-10 px-5">
        <LinearGradient
          colors={['#00A8E1', '#14C6FF']}
          className="rounded-2xl overflow-hidden"
        >
          <TouchableOpacity 
            className="py-4 flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            <View className="w-8 h-8 bg-white rounded-full items-center justify-center mr-3">
              <Image source={icons.play} className="w-4 h-4 ml-0.5" tintColor="#00A8E1" />
            </View>
            <Text className="text-white font-bold text-lg">Watch Now</Text>
          </TouchableOpacity>
        </LinearGradient>
        
        {/* <View className="flex-row justify-between mt-4">
          <TouchableOpacity className="flex-1 py-3 bg-white/10 rounded-xl mr-2 items-center">
            <Image source={icons.save} className="w-5 h-5 mb-1" tintColor="#fff" />
            <Text className="text-white text-xs">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3 bg-white/10 rounded-xl mr-2 items-center">
            <Image source={icons.share} className="w-5 h-5 mb-1" tintColor="#fff" />
            <Text className="text-white text-xs">Share</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3 bg-white/10 rounded-xl items-center">
            <Image source={icons.info} className="w-5 h-5 mb-1" tintColor="#fff" />
            <Text className="text-white text-xs">More Info</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default MovieDetails;