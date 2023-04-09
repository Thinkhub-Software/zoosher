import { gql } from "graphql-request";

  export const queryMovieGql = gql`
  query getMovie($id: ID!) {
    movie(id: $id) {
      name
      score
      genres {
        name
      }
      recommended {
        id
        name
        img: poster {
          url: custom(size: "w185_and_h278_bestv2")
        }
      }
    }
  }
  `