export const clientConfig = (() => {

    const SERVER_URL = "http://localhost:5000";
    const TRPC_URL = `${SERVER_URL}/trpc`;

    return {
        SERVER_URL,
        TRPC_URL
    }
})();