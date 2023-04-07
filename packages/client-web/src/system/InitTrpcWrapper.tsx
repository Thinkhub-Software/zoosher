import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpLink } from '@trpc/client';
import { createTRPCReact } from "@trpc/react-query";
import { MainRouter } from "@zoosher/server-api";
import { PropsWithChildren, useState } from "react";
import { clientConfig } from './clientConfig';

export const trpc = createTRPCReact<MainRouter>();

export const InitTrpcWrapper = ({ children }: PropsWithChildren) => {

    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpLink({
                    url: `${clientConfig.SERVER_URL}/trpc`,
                }),
            ],
        }),
    );

    return (
        <trpc.Provider
            client={trpcClient}
            queryClient={queryClient}>

            <QueryClientProvider
                client={queryClient}>

                {children}

            </QueryClientProvider>
        </trpc.Provider>
    );
}