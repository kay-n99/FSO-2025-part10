import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flexShrink: 1,
  },
  language: {
    margin: 2,
    padding: 4,
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 4,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: theme.fontWeights.bold,
  },
})

const formatCount = (count) => {
  if (count >= 1000){
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text style={{ fontWeight: 'bold' }}>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatCount(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatCount(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatCount(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatCount(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
