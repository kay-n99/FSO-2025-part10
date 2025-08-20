import { View, Text, StyleSheet } from 'react-native'
import { format } from 'date-fns'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
    },
    ratingContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#0366d6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    ratingText: {
        color: '#0366d6',
        fontWeight: 'bold',
        fontSize: 16,
    },
    reviewContent: {
        flexShrink: 1,
    },
    username: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    date: {
        color: '#586069',
        marginBottom: 6,
    },
})

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.reviewContent}>
                <Text style={styles.username}>{review.user.username}</Text>
                <Text style={styles.date}>
                    {format(new Date(review.createdAt), 'dd.MM.yyyy')}
                </Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
}

export default ReviewItem