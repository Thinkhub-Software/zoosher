import { instantiateSingletonServices } from '../src/instantiation'
test('something', () => {

    const singletons = instantiateSingletonServices();

    expect(singletons.configService.trpcPort === 5002);
});