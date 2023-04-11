import { instantiateInOrder } from '@thinkhub/x-injector';
import { buildTransientMap, instantiateSingletonServices } from '../src/instantiation';
import { MovieService } from '../src/services/MovieService';

test('something', async () => {

    const singletons = instantiateSingletonServices();
    const transientMap = buildTransientMap(singletons);
    const serviceContaienr = instantiateInOrder(transientMap);

    const movies = await serviceContaienr
        .getInstance(MovieService)
        .getMoviesAsync('');

    expect(movies.length).toBeGreaterThan(0);
}, 20000);