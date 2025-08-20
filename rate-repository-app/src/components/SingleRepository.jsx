import { View, ActivityIndicator } from 'react-native'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'

const SingleRepository = () => {
    const { id } = useParams()
    const { repository, loading, error } = useRepository(id)

    if (loading) return <ActivityIndicator />
    if (error) return <Text>Error: { error.message}</Text>

    return(
        <View>
            <RepositoryItem item={repository} showGithubLink />
        </View>
    )
}

export default SingleRepository