echo "Building..."
yarn build

echo "Copying files..."
Copy-Item -Path ./.next/standalone/* -Destination ./dist -Force -Recurse
Copy-Item -Path ./.next/static -Destination ./dist/packages/client-web/.next -Force -Recurse
Copy-Item -Path ./public -Destination ./dist/packages/client-web -Force -Recurse

echo "Running postbuild..."
node ./postbuild.js ./dist/packages/client-web/server.js

echo "Next build done."