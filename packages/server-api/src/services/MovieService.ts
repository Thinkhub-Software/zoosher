import { SimpleMovieDTO } from "../dto/SimpleMovieDTO";
import { queryMoviesGql } from "../external-api/tmdbw/query/queryMovies";
import { QueryMoviesQuery, QueryMoviesQueryVariables } from "../external-api/tmdbw/schema";
import { ConfigService } from "./ConfigService";
import { OMDBService } from "./OMDBService";
import { TmdbwService } from "./TmdbwService";

export class MovieService {

    constructor(
        private _tmdbwService: TmdbwService,
        private _omdbService: OMDBService,
        private _configService: ConfigService) {
    }

    async getMoviesAsync(title: string): Promise<SimpleMovieDTO[]> {

        const { searchMovies } = await this
            ._tmdbwService
            .getGraphQLClient()
            .request<QueryMoviesQuery, QueryMoviesQueryVariables>(queryMoviesGql, { term: title });

        const mappedMovies = searchMovies
            .map(movie => ({
                id: movie.id,
                name: movie.name,
                genres: movie.genres.map(x => x.name),
                rating: movie.score
            } satisfies SimpleMovieDTO));

        return mappedMovies;
    }

    async getMovieDetailsAsync(title: string) {

        const { imdbID } = await this
            ._omdbService
            .getFirstMovieByTitleAsync(title);

        const imdbUrl = this
            ._configService
            .imdbMovieUrlTemplate
            .replace('{id}', imdbID);

        const wikiUrl = this
            ._configService
            .wikiMovieUrlTemplate
            .replace('{movie_title}', title.replaceAll(' ', '_'));

        return {
            imdbUrl,
            wikiUrl
        }
    }
}