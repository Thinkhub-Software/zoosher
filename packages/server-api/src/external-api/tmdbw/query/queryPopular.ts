import { gql } from "graphql-request";

export const fetchPopular = gql`
query fetchPopular {
  movies: popularMovies {
    id
    name
    overview
    releaseDate
    img: poster {
      url: custom(size: "w185_and_h278_bestv2")
    }
    reviews {
      id
      author
      content
      language {
        code
        name
      }
    }
  }
}`
