import axios from "axios";
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

    async getWikipediaMovieDescriptionAsync(movieTitle: string) {

        const articleTitle = this
            .getWikiMovieArticleTitle(movieTitle);

        const wikiArticle = await axios
            .get(this._configService.wikiQueryUrl.replace('{wiki_page_title}', articleTitle));

        return '';
    }
}