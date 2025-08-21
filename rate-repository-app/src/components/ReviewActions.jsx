import React from 'react'
import { View, Button, Alert, StyleSheet} from 'react-native'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import { DELETE_REVIEW } from '../graphql/mutations'

const ReviewActions = ({ reviewId, repoId, refetch}) => {
    const [deleteReview] = useMutation(DELETE_REVIEW)
    const navigate = useNavigate()

    const handleViewRepo = () => {
        navigate(`/repository/${repoId}`)
    }

    const handleDeleteReview = () => {
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
                { text: "Cancel", style: "cancel"},
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async() => {
                        try{
                            await deleteReview({ variables: { id: reviewId }})
                            refetch()
                        }catch(e){
                            console.log(e)
                        }
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.actions}>
            <Button title="View repository" onPress={handleViewRepo} />
            <Button title="Delete review" color="red" onPress={handleDeleteReview} />
        </View>
    )
}

const styles = StyleSheet.create({
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
})

export default ReviewActions