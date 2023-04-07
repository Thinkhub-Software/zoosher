import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { SingletonServicesType, instantiateTransientServices } from '../instantiation';

export const createTrpcContext = ({ req, res, }: trpcExpress.CreateExpressContextOptions) => {

    const singletonServices = (req as any).singletonServices as SingletonServicesType;
    const services = instantiateTransientServices(singletonServices);

    return ({
        services,
    })
};

export type TrpcContextType = inferAsyncReturnType<typeof createTrpcContext>;

const trpcInstance = initTRPC
    .context<TrpcContextType>()
    .create();

export const trpcRouter = trpcInstance.router;
export const trpcProcedure = trpcInstance.procedure;