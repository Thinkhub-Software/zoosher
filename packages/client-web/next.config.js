const { existsSync, readFileSync } = require("fs");

const { getEnvVar } = (() => {

  // basics 
  const envName = process.env.NODE_ENV;
  if (!envName)
    throw new Error(`Env name is null or undefined!`);

  const rootDirectory = '.';

  // load env file fn
  const loadDotEnvFile = (fileName, optional) => {

    const filePath = `${rootDirectory}/config/${fileName}.env`;
    const fileExists = existsSync(filePath);

    if (!fileExists && !optional)
      throw new Error(`Dot env file does not exis: "${filePath}"!`);

    if (!fileExists && optional)
      return;

    const contents = readFileSync(filePath, 'utf-8');
    const lines = contents
      .split('\n')
      .filter(x => x.includes('='))
      .map(x => x
        .replace('\r', '')
        .trimStart()
        .trimEnd());

    const touples = lines
      .map(x => x.split('='))
      .map(([key, value]) => ({
        key: key
          .trimStart()
          .trimEnd(),
        value: value
          .trimStart()
          .trimEnd()
      }));

    touples
      .forEach(x => process.env[x.key] = x.value);
  }

  // load default 
  loadDotEnvFile('default');

  // overwrite with env specific
  loadDotEnvFile(envName, true);

  const getEnvVar = (key) => {

    const value = process.env[key];
    if (!value)
      throw new Error(`Value not found by key: "${key}"!`);

    return value;
  }

  return {
    getEnvVar
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "image.tmdb.org"
    ],
  },
  output: 'standalone',
  pageExtensions: [
    'page.tsx'
  ],
  env: {
    NEXT_PUBLIC_MY_CUSTOM_ENV_VAR_NAME_HEHEHEHHE: 'asd',
    PORT: 3002
  }
}

console.log('Exporting config...');
module.exports = nextConfig
