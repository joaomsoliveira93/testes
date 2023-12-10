//João Oliveira - MovieList.tsx
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

interface MovieListProps {
  navigation: any;
}

const MovieList: React.FC<MovieListProps> = ({navigation}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const flatListRef = useRef<FlatList<Movie>>(null);

  useEffect(() => {
    fetchMovies();
  }, [searchQuery,page]);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      let apiUrl =
        'https://api.themoviedb.org/3/movie/popular?api_key=c8e95bb558bace1aee216eb1a967fe63';

      if (searchQuery) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=c8e95bb558bace1aee216eb1a967fe63&query=${searchQuery}&page=${page}`;
      }

      const response = await axios.get(apiUrl);

      const newMovies =
        page === 1
          ? response.data.results
          : [...movies, ...response.data.results];
      setMovies(newMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const navigateToDetail = (movie: Movie) => {
    navigation.navigate('Detail', {movie});
  };

  navigation.setOptions({
    title: 'Movies List',
  });

  const renderMovieItem = ({item}: {item: Movie}) => (
    <TouchableOpacity onPress={() => navigateToDetail(item)}>
      <View style={styles.gridItem}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
          style={styles.posterImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.releaseDate}>{item.release_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    setPage(1);
    fetchMovies();
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const screenWidth = Dimensions.get('window').width;
  const numColumns = Math.floor(screenWidth / 160);

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'gray'}
        style={styles.searchInput}
        placeholder="Search for movies"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        ref={flatListRef}
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMovieItem}
        numColumns={numColumns}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="large" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 8,
    padding: 8,
    color: 'black',
  },
  gridItem: {
    flex: 1,
    margin: 8,
  },
  posterImage: {
    width: 150,
    height: 225,
  },
  textContainer: {
    marginTop: 8,
  },
  movieTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    width: 150,
  },
  releaseDate: {
    color: 'black',
    fontSize: 14,
  },
});

export default MovieList;
