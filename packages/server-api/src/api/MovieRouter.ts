import { z } from "zod";
import { trpcProcedure, trpcRouter } from "./trpc";
import { MovieService } from "../services/MovieService";

export const movieRouter = trpcRouter({
    getMovies: trpcProcedure
        .input(z
            .object({
                title: z.string()
            }))
        .query(async ({ ctx, input }) => {

            return await ctx
                .services
                .getInstance(MovieService)
                .getMoviesAsync(input.title);
        }),

    getMovieDetails: trpcProcedure
        .input(z
            .object({
                movieId: z.string()
            }))
        .query(async ({ ctx, input }) => {

            return await ctx
                .services
                .getInstance(MovieService)
                .getMovieDetailsAsync(input.movieId);
        })
});