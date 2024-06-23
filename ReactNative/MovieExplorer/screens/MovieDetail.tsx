//João Oliveira - MovieDetail.tsx
import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface MovieDetailProps {
  route: any;
  navigation: any;
}
interface Genre {
  id: number;
  name: string;
}

const MovieDetail: React.FC<MovieDetailProps> = ({route, navigation}) => {
  const {movie} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites) as number[];
          setIsFavorite(parsedFavorites.includes(movie.id));
        }
        let apiUrl =
          'https://api.themoviedb.org/3/genre/movie/list?api_key=c8e95bb558bace1aee216eb1a967fe63';
        const response = await axios.get(apiUrl);
        const newGenres = [...genres, ...response.data.genres];
        setGenres(newGenres);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavoriteStatus();
  }, [genres, movie.id]);

  const toggleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);

      const favorites = await AsyncStorage.getItem('favorites');
      let parsedFavorites = favorites
        ? (JSON.parse(favorites) as number[])
        : [];

      if (isFavorite) {
        parsedFavorites = parsedFavorites.filter(id => id !== movie.id);
      } else {
        parsedFavorites.push(movie.id);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  navigation.setOptions({
    title: movie.title,
  });

  const getGenreNames = (genreIds: number[]): string => {
    const genreNames = genreIds.map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : '';
    });
    return genreNames.join(', ');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
        style={styles.image}
      />
      <Text style={styles.inputs}>Description: {movie.overview}</Text>
      <Text style={styles.inputs}>{`Rating: ${movie.vote_average}/10`}</Text>
      {movie.genre_ids && (
        <Text style={styles.inputs}>{`Genres: ${getGenreNames(
          movie.genre_ids,
        )}`}</Text>
      )}
      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={toggleFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: 200,
    height: 300,
  },
  inputs: {
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
export default MovieDetail;
