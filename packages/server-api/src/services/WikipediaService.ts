import axios from "axios";
import { QueryResult } from "../external-api/wikipedia/WikiTypes";
import { ConfigService } from "./ConfigService";

export class WikipediaService {

    constructor(private _configService: ConfigService) {
    }

    getWikiMovieArticleTitle(movieTitle: string) {

        return movieTitle.replaceAll(' ', '_');
    }

    getWikipediaMovieUrl(movieTitle: string) {

        return this
            ._configService
            .wikiMovieUrlTemplate
            .replace('{movie_title}', this.getWikiMovieArticleTitle(movieTitle));
    }

    async getWikipediaMovieDescriptionAsync(movieTitle: string): Promise<string | null> {

        const articleTitle = this
            .getWikiMovieArticleTitle(movieTitle);

        const queryUrl = this
            ._configService
            .wikiExplaintextQueryUrl
            .replace('{wiki_page_title}', articleTitle);

        const queryResult = await axios
            .get<QueryResult>(queryUrl);

        const explaintext = Object
            .values(queryResult.data.query.pages)
            .single()
            .extract;

        return explaintext;
    }
}