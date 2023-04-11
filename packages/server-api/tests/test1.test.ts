import { instantiateSingletonServices, instantiateTransientServices } from '../src/instantiation'

test('something', async () => {

    const singletons = instantiateSingletonServices();
    const transientServices = instantiateTransientServices(singletons);

    const movies = transientServices
        .movieService
        .getMoviesAsync('');

    expect(singletons.configService.trpcPort === 5002);
});