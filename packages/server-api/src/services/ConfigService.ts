import { InitializeXEnvLoader } from "@thinkhub/x-core";

export class ConfigService {

    public tmdbwApiUrl: string;
    public odbmUrlTemplate: string;
    public imdbMovieUrlTemplate: string;
    public wikiMovieUrlTemplate: string;
    public trpcPort: number;
    public clientWebUrl: string;
    public wikiExplaintextQueryUrl: string;

    constructor() {

        const { getEnvVar } = InitializeXEnvLoader({ envName: process.env.NODE_ENV ?? 'local' });

        this.tmdbwApiUrl = "https://tmdb.sandbox.zoosh.ie/dev/graphql";
        this.odbmUrlTemplate = `https://www.omdbapi.com/?{params}&apikey=ee6dcd4d`;
        this.imdbMovieUrlTemplate = 'https://www.imdb.com/title/{id}/';
        this.wikiMovieUrlTemplate = 'https://en.wikipedia.org/wiki/{movie_title}';
        this.wikiExplaintextQueryUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles={wiki_page_title}";
        this.trpcPort = 5002;
        this.clientWebUrl = getEnvVar('CLIENT_WEB_HOSTNAME');

        console.log(this.clientWebUrl);
    }
}