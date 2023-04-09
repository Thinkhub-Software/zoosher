export interface QueryResult {
    batchcomplete: string;
    query: Query;
}

export interface Query {
    pages: Pages;
}

export type Pages = {
    [key: string]: PageData
}

export interface PageData {
    pageid: number;
    ns: number;
    title: string;
    extract: string;
}
