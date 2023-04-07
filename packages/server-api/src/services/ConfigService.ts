export class ConfigService {

    public tmdbwApiUrl: string;
    public odbmUrlTemplate: string;
    public imdbMovieUrlTemplate: string;
    public wikiMovieUrlTemplate: string;
    public trpcPort: number;
    public clientWebUrl: string;
    public wikiQueryUrl: string;

    constructor() {

        this.tmdbwApiUrl = "https://tmdb.sandbox.zoosh.ie/dev/graphql";
        this.odbmUrlTemplate = `https://www.omdbapi.com/?{params}&apikey=ee6dcd4d`;
        this.imdbMovieUrlTemplate = 'https://www.imdb.com/title/{id}/';
        this.wikiMovieUrlTemplate = 'https://en.wikipedia.org/wiki/{movie_title}';
        this.trpcPort = 5000;
        this.clientWebUrl = "http://localhost:3000";
        this.wikiQueryUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles={wiki_page_title}&formatversion=2&rvprop=content&rvslots=*";
    }
}