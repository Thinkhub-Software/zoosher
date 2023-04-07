import axios from "axios";
import { ConfigService } from "./ConfigService";
import { OMDBMovieData } from "../external-api/omdb/OMDBMovieData";

export class OMDBService {

    constructor(private _config: ConfigService) {
    }

    async getFirstMovieByTitleAsync(title: string): Promise<OMDBMovieData> {

        const url = this
            ._config
            .odbmUrlTemplate
            .replace('{params}', `t=${title}`);

        const { data: resultMovie } = await axios
            .get(url);

        return resultMovie;
    }
}