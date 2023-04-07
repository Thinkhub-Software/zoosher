import { GraphQLClient } from "graphql-request";
import { ConfigService } from "./ConfigService";

export class TmdbwService {

    private _graphQlClient: GraphQLClient;

    constructor(configService: ConfigService) {

        this._graphQlClient = new GraphQLClient(configService.tmdbwApiUrl, {})
    }

    getGraphQLClient() {

        return this._graphQlClient;
    }
}