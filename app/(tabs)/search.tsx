// app/search.tsx - Remove the problematic useEffect
import MovieCard from '@/components/MovieCard';
import SearchBar from "@/components/SearchBar";
import { icons } from '@/constants/icons';
import { fetchMovies } from "@/services/api";
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchMovies = async () => {
      if (!searchQuery.trim()) {
        setMovies([]);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchMovies({ query: searchQuery });
        setMovies(data);
      } catch (err) {
        setError('Failed to search movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchMovies();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Load popular movies when no search query
  useEffect(() => {
    const loadPopularMovies = async () => {
      if (!searchQuery.trim()) {
        setLoading(true);
        try {
          const data = await fetchMovies({ query: "" });
          setMovies(data);
        } catch (err) {
          console.error('Error loading movies:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPopularMovies();
  }, []);

  return (
    <View className='flex-1 bg-primary px-5 pt-16'>
      {/* Search Header */}
      <View className='mb-6'>
        <Text className='text-white text-2xl font-bold mb-2'>Search</Text>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search movies..."
        />
      </View>

      {/* Loading State */}
      {loading && (
        <ActivityIndicator size='large' color='#00A8E1' className='my-10' />
      )}

      {/* Error State */}
      {error && (
        <Text className='text-red-500 text-center my-10'>
          Error: {error}
        </Text>
      )}

      {/* Search Results */}
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ 
          justifyContent: 'space-between',
          marginBottom: 16
        }}
        ListHeaderComponent={
          searchQuery.trim() && movies.length > 0 ? (
            <View className='mb-4'>
              <Text className='text-white text-lg font-bold'>
                Results for "{searchQuery}"
              </Text>
              <Text className='text-gray-400 text-sm'>
                {movies.length} {movies.length === 1 ? 'movie' : 'movies'} found
              </Text>
            </View>
          ) : !searchQuery.trim() && movies.length > 0 ? (
            <View className='mb-4'>
              <Text className='text-white text-lg font-bold'>
                Popular Movies
              </Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          !loading && !error && searchQuery.trim() ? (
            <View className='flex-1 justify-center items-center my-20'>
              <Image 
                source={icons.search} 
                className='w-16 h-16 mb-4 opacity-50'
                tintColor='#94A3B8'
              />
              <Text className='text-gray-400 text-center text-lg'>
                No movies found for "{searchQuery}"
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}