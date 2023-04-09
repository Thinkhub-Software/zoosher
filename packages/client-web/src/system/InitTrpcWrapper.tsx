import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpLink } from '@trpc/client';
import { createTRPCReact } from "@trpc/react-query";
import { MainRouter } from "@zoosher/server-api";
import { PropsWithChildren, useState } from "react";
import { clientConfig } from './clientConfig';

export const TrpcReactQueryContext = createTRPCReact<MainRouter>();

export const InitTrpcWrapper = ({ children }: PropsWithChildren) => {

    /**
     * TRPC - react query
     */
    const [queryClient] = useState(() => new QueryClient());
    const [trpcRectQueryClient] = useState(() =>
        TrpcReactQueryContext.createClient({
            links: [
                httpLink({
                    url: clientConfig.TRPC_URL,
                }),
            ],
        }),
    );

    return (
        <TrpcReactQueryContext.Provider
            client={trpcRectQueryClient}
            queryClient={queryClient}>

            <QueryClientProvider
                client={queryClient}>

                {children}

            </QueryClientProvider>
        </TrpcReactQueryContext.Provider>
    );
}