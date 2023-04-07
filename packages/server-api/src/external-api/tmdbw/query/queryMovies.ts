import { gql } from "graphql-request";

export const queryMoviesGql = gql`
query queryMovies ($term: String!) {
    searchMovies(query: $term) {
      id
      name
      overview
      releaseDate
      genres {
        name
      }
      score
      cast {
        id
        person {
          name
        }
        role {
          ... on Cast {
            character
          }
        }
      }
    }
  }
`