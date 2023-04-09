import { SimpleMovieDTO } from "../dto/SimpleMovieDTO";
import { ConfigService } from "./ConfigService";
import { OMDBService } from "./OMDBService";
import { TmdbwService } from "./TmdbwService";
import { WikipediaService } from "./WikipediaService";

export class MovieService {

    constructor(
        private _tmdbwService: TmdbwService,
        private _omdbService: OMDBService,
        private _configService: ConfigService,
        private _wikipediaService: WikipediaService) {
    }

    async getMoviesAsync(title: string): Promise<SimpleMovieDTO[]> {

        /**
         * In case of empty search srtring, return the popular movies.
         * - don't let the user find an ugly blank screen
         */
        if (title.length <= 2) {

            const popMovies = await this
                ._tmdbwService
                .getPopularMoviesAsync();

            return popMovies
                .map(movie => ({
                    id: movie.id,
                    name: movie.name,
                    genres: movie.genres.map(x => x.name),
                    rating: movie.score
                } satisfies SimpleMovieDTO));
        }

        /**
         * Search for movies
         */
        const searchMovies = await this
            ._tmdbwService
            .searchMoviesAsync(title);

        return searchMovies
            .map(movie => ({
                id: movie.id,
                name: movie.name,
                genres: movie.genres.map(x => x.name),
                rating: movie.score
            } satisfies SimpleMovieDTO));
    }

    async getMovieDetailsAsync(id: string) {

        const { genres, rating, title } = await this
            ._tmdbwService
            .getMovieDetailsAsync(id);

        const { imdbID, Poster } = await this
            ._omdbService
            .getFirstMovieByTitleAsync(title);

        const imdbUrl = this
            ._configService
            .imdbMovieUrlTemplate
            .replace('{id}', imdbID);

        const wikiUrl = this
            ._wikipediaService
            .getWikipediaMovieUrl(title);

        const { description } = await this
            ._wikipediaService
            .getWikipediaMovieDescriptionAsync(title);

        const shortDescription = `${description.substring(0, 250)}[...]`;

        return {
            movieTitle: title,
            rating,
            imdbUrl,
            wikiUrl,
            description,
            shortDescription,
            genres,
            posterUrl: Poster
        }
    }
}