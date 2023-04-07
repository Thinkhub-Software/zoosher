import { z } from "zod";
import { trpcProcedure, trpcRouter } from "./trpc";

export const movieRouter = trpcRouter({
    getMovies: trpcProcedure
        .input(z
            .object({
                title: z.string()
            }))
        .query(async ({ ctx, input }) => {

            return await ctx
                .services
                .movieService
                .getMoviesAsync(input.title);
        })
});