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

