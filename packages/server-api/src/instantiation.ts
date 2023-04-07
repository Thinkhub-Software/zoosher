import { ConfigService } from "./services/ConfigService";
import { MovieService } from "./services/MovieService";
import { OMDBService } from "./services/OMDBService";
import { TmdbwService } from "./services/TmdbwService";
import { WikipediaService } from "./services/WikipediaService";

export const instantiateSingletonServices = () => {

    const configService = new ConfigService();

    return {
        configService
    }
}

export type SingletonServicesType = ReturnType<typeof instantiateSingletonServices>;

export const instantiateTransientServices = ({ configService }: SingletonServicesType) => {

    const tmdbwService = new TmdbwService(configService);
    const odbmService = new OMDBService(configService);
    const wikipediaService = new WikipediaService(configService);
    const movieService = new MovieService(tmdbwService, odbmService, configService, wikipediaService);

    return {
        configService,
        tmdbwService,
        odbmService,
        movieService
    }
}