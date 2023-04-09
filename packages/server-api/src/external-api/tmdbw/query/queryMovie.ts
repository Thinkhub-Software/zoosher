import { gql } from "graphql-request";

  export const queryMovieGql = gql`
  query getMovie($id: ID!) {
    movie(id: $id) {
      name
      genres {
        name
      }
      score
    }
  }
  `