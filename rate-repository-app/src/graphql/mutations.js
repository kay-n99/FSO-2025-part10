import { gql } from '@apollo/client'

export const CREATE_REVIEW = gql`
    mutation createReview(
        $ownerName: String!
        $repositoryName: String!
        $rating: Int!
        $text: String
    ){
        createReview(
            review: {
                ownerName: $ownerName
                repositoryName: $repositoryName
                rating: $rating
                text: $text
            }
        ){
            repositoryId
        }
    
    }
`

export const CREATE_USER = gql`
    mutation createUser($user: CreateUserInput!){
        createUser(user: $user){
            id
            username        
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!){
        deleteReview(id: $id)
    }
`