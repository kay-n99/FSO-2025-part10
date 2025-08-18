import { ApolloClient, InMemoryCache } from '@apollo/client'

const createApolloClient = () => {
    return new ApolloClient({
        uri: 'http://172.27.14.18:4000/graphql',
        cache: new InMemoryCache(),
    })
}

export default createApolloClient