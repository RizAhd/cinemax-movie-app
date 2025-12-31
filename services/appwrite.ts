import { Client, Databases, ID, Query } from 'appwrite';
import 'react-native-url-polyfill/auto';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_NAME = 'metrics';
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const databse = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const results = await databse.listDocuments(DATABASE_ID, TABLE_NAME, [
            Query.equal('searchTerm', query)
        ]);

        if (results.documents.length > 0) {
            const existingMovie = results.documents[0];
            await databse.updateDocument(
                DATABASE_ID,
                TABLE_NAME,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            );
        } else {
            await databse.createDocument(
                DATABASE_ID,
                TABLE_NAME,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    title : movie.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            );
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getTrenndingMovies = async (): Promise<TrendingMovie[] | undefined> => {
try {
      const results = await databse.listDocuments(DATABASE_ID, TABLE_NAME, [
            Query.limit(5),
            Query.orderDesc('count'),
        ]);


        return results.documents as unknown as TrendingMovie[];
} catch (error) {
    console.log(error);
    return undefined;
}
}