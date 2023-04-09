export type SimpleMovieDTO = {
    id: string;
    name: string;
    rating: number;
    genres: string[];
    posterUrl: string | null;
    overview: string;
}