import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrenndingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Index() {
  const router = useRouter();
  const [activeTrendingIndex, setActiveTrendingIndex] = useState(0);

  const { data: trendingMovies, loading: trendingLoading } = useFetch(getTrenndingMovies);
  const { data: movies, loading: moviesLoading } = useFetch(() => fetchMovies({ query: "" }));

  useEffect(() => {
    if (!trendingMovies?.length) return;
    
    const interval = setInterval(() => {
      setActiveTrendingIndex(prev => 
        prev === trendingMovies.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [trendingMovies]);

  const renderHeader = () => (
    <LinearGradient
      colors={['#0F1B2F', '#0F1B2F', '#131921']}
      className="pb-6"
    >
      <SafeAreaView>
        <View className="px-5 pt-5">
          <View className="flex-row items-center justify-between mb-8">
            <View className="flex-row items-center">
              <LinearGradient
                colors={['#00A8E1', '#14C6FF']}
                className="w-12 h-12 rounded-xl items-center justify-center mr-3"
              >
                <Text className="text-white text-2xl font-bold">C</Text>
              </LinearGradient>
              <View>
                <Text className="text-white text-xl font-bold">Cinemax</Text>
                <Text className="text-accent-light text-sm font-medium">Premium</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              className="w-12 h-12 rounded-full border border-accent/30 items-center justify-center"
              onPress={() => router.push("/profile")}
            >
              <Image source={icons.person} className="w-6 h-6" tintColor="#fff" />
            </TouchableOpacity>
          </View>

          <Text className="text-white text-3xl font-bold mb-2">
            Welcome Back
          </Text>
          <Text className="text-accent text-2xl font-bold mb-6">
            Ready to watch?
          </Text>
          
          <TouchableOpacity 
            onPress={() => router.push("/search")}
            className="flex-row items-center bg-dark-200 px-5 py-4 rounded-2xl"
            activeOpacity={0.8}
          >
            <Image source={icons.search} className="w-5 h-5 mr-4" tintColor="#94A3B8" />
            <Text className="text-gray-400 text-base flex-1">Search movies, shows...</Text>
            <View className="bg-accent px-4 py-2 rounded-lg">
              <Text className="text-white text-sm font-semibold">Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderTrendingSection = () => {
    if (!trendingMovies?.length) return null;
    const activeMovie = trendingMovies[activeTrendingIndex];

    return (
      <View className="mt-8 px-5">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-white text-2xl font-bold">Trending Now</Text>
          <TouchableOpacity onPress={() => router.push("/trending")}>
            <Text className="text-accent text-sm font-semibold">See All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          activeOpacity={0.9} 
          className="relative rounded-2xl overflow-hidden"
          onPress={() => router.push(`/movie/${activeMovie.movie_id}`)}
        >
          {/* Main Trending Image - Fixed */}
          <Image 
            source={{ 
              uri: activeMovie.poster_url || activeMovie.poster || images.defaultPoster 
            }} 
            className="w-full h-64"
            resizeMode="cover"
          />
          
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
            className="absolute bottom-0 w-full h-1/2"
          />
          
          <View className="absolute bottom-0 left-0 right-0 p-5">
            <View className="flex-row items-center mb-2">
              <View className="px-3 py-1 bg-accent rounded">
                <Text className="text-white text-xs font-bold">TRENDING</Text>
              </View>
              <Text className="text-white/80 ml-3">#{activeTrendingIndex + 1} Today</Text>
            </View>
            
            <Text className="text-white text-xl font-bold mb-1">{activeMovie.title}</Text>
            <View className="flex-row items-center">
              <View className="flex-row items-center mr-4">
                <Image source={icons.star} className="w-4 h-4 mr-1" tintColor="#FFD700" />
                <Text className="text-white font-semibold">{activeMovie.rating || "8.5"}</Text>
              </View>
              <Text className="text-gray-400 text-sm">• {activeMovie.duration || "2h 15m"}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Thumbnail Carousel - Fixed */}
        <View className="mt-6">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trendingMovies}
            renderItem={({ item, index }) => (
              <TouchableOpacity 
                onPress={() => setActiveTrendingIndex(index)}
                className="mr-4"
                activeOpacity={0.7}
              >
                <Image 
                  source={{ 
                    uri: item.poster_url || item.poster || images.defaultPoster 
                  }} 
                  className={`w-28 h-40 rounded-xl ${activeTrendingIndex === index ? 'border-2 border-accent' : 'opacity-70'}`}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.movie_id?.toString() || item.id?.toString() || Math.random().toString()}
          />
        </View>

        {/* Dots Indicator */}
        <View className="flex-row justify-center mt-6">
          {trendingMovies.slice(0, 5).map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${index === activeTrendingIndex ? 'bg-accent' : 'bg-gray-600'}`}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderCategories = () => (
    <View className="mt-8 px-5">
      <Text className="text-white text-xl font-bold mb-4">Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {['Action', 'Drama', 'Comedy', 'Sci-Fi'].map((category) => (
          <TouchableOpacity 
            key={category}
            className="px-5 py-3 bg-dark-100 rounded-full mr-3"
            activeOpacity={0.7}
          >
            <Text className="text-white">{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
const renderLatestMovies = () => (
  <View className="mt-8 px-5 pb-20">
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-white text-xl font-bold">Latest Movies</Text>
      <TouchableOpacity onPress={() => router.push("/movies")}>
        <Text className="text-accent text-sm">View All</Text>
      </TouchableOpacity>
    </View>

    {moviesLoading ? (
      <ActivityIndicator size="large" color="#00A8E1" className="my-4" />
    ) : (
      <FlatList
        data={movies?.slice(0, 6)} // Show 6 items for 3x2 grid
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ 
          justifyContent: 'space-between',
          marginBottom: 12
        }}
        scrollEnabled={false}
      />
    )}
  </View>
);

  if (trendingLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#00A8E1" />
        <Text className="text-white mt-4">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {renderHeader()}
        {renderCategories()}
        {renderTrendingSection()}
        {renderLatestMovies()}
      </ScrollView>
    </View>
  );
}