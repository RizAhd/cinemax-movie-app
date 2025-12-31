// app/saved.tsx
import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { getSavedMovies, removeSavedMovie } from '@/services/appwrite';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SavedMovie {
    id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    documentId: string;
}

export default function Saved() {
    const router = useRouter();
    const [savedMovies, setSavedMovies] = useState<SavedMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadSavedMovies = async () => {
        try {
            setError(null);
            const movies = await getSavedMovies();
            setSavedMovies(movies);
        } catch (err) {
            setError('Failed to load saved movies');
            console.error(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadSavedMovies();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadSavedMovies();
    };

    const handleRemoveMovie = (documentId: string, title: string) => {
        Alert.alert(
            'Remove Movie',
            `Remove "${title}" from saved?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await removeSavedMovie(documentId);
                            setSavedMovies(prev => 
                                prev.filter(movie => movie.documentId !== documentId)
                            );
                        } catch (err) {
                            Alert.alert('Error', 'Failed to remove movie');
                        }
                    }
                }
            ]
        );
    };

    const renderMovieItem = ({ item }: { item: SavedMovie }) => (
        <View className="w-[48%] mb-5">
            <MovieCard 
                id={item.id}
                poster_path={item.poster_path}
                title={item.title}
                vote_average={item.vote_average}
                release_date={item.release_date}
            />
            <TouchableOpacity
                onPress={() => handleRemoveMovie(item.documentId, item.title)}
                className="mt-2 px-3 py-1.5 bg-red-500/20 rounded-lg flex-row items-center justify-center"
                activeOpacity={0.7}
            >
                <Image 
                    source={icons.close} 
                    className="w-3 h-3 mr-1" 
                    tintColor="#ef4444" 
                />
                <Text className="text-red-500 text-xs font-medium">Remove</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading && !refreshing) {
        return (
            <View className="flex-1 bg-primary justify-center items-center">
                <Image source={icons.save} className="w-12 h-12 mb-4" tintColor="#00A8E1" />
                <Text className="text-white">Loading saved movies...</Text>
            </View>
        );
    }

    return (
        <View className='flex-1 bg-primary'>
            <Image 
                source={images.bg} 
                className='flex-1 absolute w-full h-full' 
                blurRadius={5}
            />
            
            <SafeAreaView className='flex-1'>
                <View className='px-5 pt-5'>
                    {/* Header */}
                    <View className='flex-row items-center justify-between mb-6'>
                        <View className='flex-row items-center'>
                            <View className='w-10 h-10 bg-accent rounded-full items-center justify-center mr-3'>
                                <Text className='text-white text-xl font-bold'>C</Text>
                            </View>
                            <Text className='text-white text-xl font-bold'>Saved Movies</Text>
                        </View>
                        
                        <TouchableOpacity 
                            className='w-10 h-10 rounded-full bg-white/10 items-center justify-center'
                            onPress={() => router.push('/profile')}
                        >
                            <Image source={icons.person} className='w-5 h-5' tintColor='#fff' />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Title */}
                    <Text className='text-white text-2xl font-bold mb-1'>My Watchlist</Text>
                    <Text className='text-gray-400 text-sm mb-6'>
                        {savedMovies.length} {savedMovies.length === 1 ? 'movie' : 'movies'} saved
                    </Text>
                </View>
                
                {/* Content */}
                {error ? (
                    <View className='flex-1 justify-center items-center px-10'>
                        <Image source={icons.error} className='w-16 h-16 mb-4' tintColor='#ef4444' />
                        <Text className='text-white text-lg font-bold mb-2'>Error Loading</Text>
                        <Text className='text-gray-400 text-center mb-6'>
                            {error}
                        </Text>
                        <TouchableOpacity 
                            onPress={loadSavedMovies}
                            className='px-6 py-3 bg-accent rounded-full'
                        >
                            <Text className='text-white font-semibold'>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                ) : savedMovies.length === 0 ? (
                    <View className='flex-1 items-center justify-center px-10'>
                        <View className='w-24 h-24 bg-white/10 rounded-full items-center justify-center mb-6'>
                            <Image source={icons.save} className='w-12 h-12' tintColor='#00A8E1' />
                        </View>
                        <Text className='text-white text-xl font-bold text-center mb-3'>
                            No Saved Movies Yet
                        </Text>
                        <Text className='text-gray-400 text-center text-sm mb-8'>
                            Save your favorite movies to watch them later
                        </Text>
                        <TouchableOpacity 
                            onPress={() => router.push('/(tabs)')}
                            className='px-6 py-3 bg-accent rounded-full'
                        >
                            <Text className='text-white font-semibold text-base'>Browse Movies</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={savedMovies}
                        renderItem={renderMovieItem}
                        keyExtractor={(item) => item.documentId || item.id}
                        numColumns={2}
                        columnWrapperStyle={{ 
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginBottom: 16
                        }}
                        contentContainerStyle={{ 
                            paddingTop: 10,
                            paddingBottom: 100 
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#00A8E1']}
                                tintColor="#00A8E1"
                            />
                        }
                    />
                )}
            </SafeAreaView>
        </View>
    );
}