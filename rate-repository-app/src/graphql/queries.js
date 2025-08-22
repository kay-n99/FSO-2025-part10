import { gql } from '@apollo/client';

export const REPOSITORIES_QUERY = gql`
  query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          ratingAverage
          forksCount
          reviewCount
          ownerAvatarUrl
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false){
    me{
      id
      username
      reviews @include(if: $includeReviews){
        edges{
          node{
            id
            text
            rating
            createdAt
            repository{
              id
              fullName
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $first: Int, $after: String){
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo{
          endCursor
          hasNextPage
        }
      }
    }
  }
`
