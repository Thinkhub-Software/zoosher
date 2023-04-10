export const clientConfig = (() => {

    if (!process.env.NEXT_PUBLIC_SERVER_URL)
        throw new Error('NEXT_PUBLIC_SERVER_URL is null or undefined!');

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const trpcUrl = `${serverUrl}/trpc`;

    return {
        SERVER_URL: serverUrl,
        TRPC_URL: trpcUrl
    }
})();