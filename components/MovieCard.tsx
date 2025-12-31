import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCard = ({ id, poster_path, title, vote_average }: Movie) => {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[31%] mb-6 mx-0.5">
                {/* Poster with Gradient Overlay */}
                <View className="relative">
                    <Image 
                        source={{
                            uri: poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : 'https://via.placeholder.com/300x450/1E293B/00A8E1?text=Movie'
                        }}
                        className="w-full h-52 rounded-lg"
                        resizeMode='cover'
                    />
                    
                    {/* Rating Badge */}
                    <View className="absolute top-2 right-2 bg-black/80 w-8 h-8 rounded-full items-center justify-center border border-accent/30">
                        <Text className="text-white text-xs font-bold">
                            {vote_average?.toFixed(1) || "0"}
                        </Text>
                    </View>
                    
                    {/* Gradient Overlay */}
                    <View className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-primary to-transparent rounded-b-lg" />
                </View>
                
                {/* Title Below Image */}
                <Text className="text-white text-xs font-semibold mt-2 px-1" numberOfLines={2}>
                    {title}
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;