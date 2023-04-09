import { createTRPCProxyClient, httpLink } from "@trpc/client";
import { MainRouter } from "@zoosher/server-api";
import { clientConfig } from "./clientConfig";

export const trpcStaticClient = createTRPCProxyClient<MainRouter>({
    links: [
        httpLink({
            url: clientConfig.TRPC_URL,
        }),
    ],
});