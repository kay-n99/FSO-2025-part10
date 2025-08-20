import { gql } from '@apollo/client';

export const REPOSITORIES_QUERY = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const ME = gql`
  query{
    me{
      id
      username
    }
  }
`

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!){
    repository(id: $id){
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url  
      reviews {
        edges{
          node {
            id
            text
            rating
            createdAt
            user{
              id
              username
            }
          }
        }
      }
    }
  }
`

