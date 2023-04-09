import { gql } from "graphql-request";

export const queryMoviesGql = gql`
query queryMovies ($term: String!) {
    searchMovies(query: $term) {
      id
      name
      overview
      releaseDate
      overview
      genres {
        name
      }
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
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