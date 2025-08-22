import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository'; 

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showGithubButton />;
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error, fetchMore } = useRepository(id, 3); 
  console.log(repository)
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text style={{ color: 'red' }}>Error: {error.message}</Text>;

  const reviews = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;
