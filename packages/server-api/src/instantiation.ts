import { DependencyMapBuilder, instantiateInOrder } from "@thinkhub/x-injector";
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

export const buildTransientMap = ({ configService }: SingletonServicesType) => {

    const transientMap = new DependencyMapBuilder()
        .addClassInstance(ConfigService, configService)
        .addClass(TmdbwService, [ConfigService])
        .addClass(OMDBService, [ConfigService])
        .addClass(WikipediaService, [ConfigService])
        .addClass(MovieService, [TmdbwService, OMDBService, ConfigService, WikipediaService])
        .getContainer();

    return transientMap;
}

export const instantiateTransientServices = (singletons: SingletonServicesType) => {

    // const tmdbwService = new TmdbwService(configService);
    // const odbmService = new OMDBService(configService);
    // const wikipediaService = new WikipediaService(configService);
    // const movieService = new MovieService(tmdbwService, odbmService, configService, wikipediaService);

    // return {
    //     configService,
    //     tmdbwService,
    //     odbmService,
    //     movieService,
    //     wikipediaService
    // }

    const transientMap = buildTransientMap(singletons);

    const serviceContaienr = instantiateInOrder(transientMap);

    return serviceContaienr;
}