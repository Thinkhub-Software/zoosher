import { movieRouter } from "./MovieRouter";
import { trpcRouter } from "./trpc";

export const mainRouter = trpcRouter({
    movieRouter
})

export type MainRouter = typeof mainRouter;