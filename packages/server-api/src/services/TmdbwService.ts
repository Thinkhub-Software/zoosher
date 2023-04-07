import { GraphQLClient } from "graphql-request";
import { title } from "process";
import { queryMoviesGql } from "../external-api/tmdbw/query/queryMovies";
import { FetchPopularQuery, FetchPopularQueryVariables, GetMovieQuery, GetMovieQueryVariables, QueryMoviesQuery, QueryMoviesQueryVariables } from "../external-api/tmdbw/schema";
import { ConfigService } from "./ConfigService";
import { queryMovieGql } from "../external-api/tmdbw/query/queryMovie";
import { fetchPopular } from "../external-api/tmdbw/query/queryPopular";

export class TmdbwService {

    private _graphQlClient: GraphQLClient;

    constructor(configService: ConfigService) {

        this._graphQlClient = new GraphQLClient(configService.tmdbwApiUrl, {})
    }

    async getPopularMoviesAsync() {

        const { movies } = await this
            ._graphQlClient
            .request<FetchPopularQuery, FetchPopularQueryVariables>(fetchPopular);

        return movies;
    }

    async searchMoviesAsync(title: string) {

        const { searchMovies } = await this
            ._graphQlClient
            .request<QueryMoviesQuery, QueryMoviesQueryVariables>(queryMoviesGql, { term: title });

        return searchMovies;
    }

    async getMovieTitleAsync(id: string) {

        const { movie: { name } } = await this
            ._graphQlClient
            .request<GetMovieQuery, GetMovieQueryVariables>(queryMovieGql, { id });

        return name;
    }
}