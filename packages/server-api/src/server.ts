import { initJsExtensions } from "@thinkhub/x-core";
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from "cors";
import express from "express";
import { mainRouter } from "./api/MainRouter";
import { createTrpcContext } from "./api/trpc";
import { instantiateSingletonServices, instantiateTransientServices } from "./instantiation";

initJsExtensions();

(async () => {

    const singletonServices = instantiateSingletonServices();

    await instantiateTransientServices(singletonServices).wikipediaService.getWikipediaMovieDescriptionAsync('Fight Club');

    // console.log(await instantiateTransientServices(singletonServices).movieService.getMoviesAsync('Fight Club'));

    const expressInstance = express();

    const corsSettings = cors({
        origin: (origin, callback) => callback(null, [
            singletonServices.configService.clientWebUrl
        ])
    });

    expressInstance
        .use((req, res, next) => {

            /**
             * Inject singleton services trough the req object - ugly but sort of necessary since tRPC enforces 
             * us to export types derived from functions with pre-defined parameter sets,
             * and that won't work if the function is wrapped, and instantiated in a 
             * socpe that's not in a file root level. 
             */
            (req as any).singletonServices = singletonServices;
            next();
        });

    expressInstance
        .use(corsSettings);

    expressInstance
        .use('/trpc', trpcExpress
            .createExpressMiddleware({
                router: mainRouter,
                createContext: createTrpcContext,
            }));

    expressInstance
        .listen(singletonServices.configService.trpcPort);
})();