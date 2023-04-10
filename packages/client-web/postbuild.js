const { readFileSync, writeFileSync, existsSync } = require('fs');

const [, , serverJsFilePath] = process.argv;

// read file
if (!existsSync(serverJsFilePath))
    throw new Error(`Provided serverjs filepath "${serverJsFilePath}" does not exist!`);

const fileContent = readFileSync(serverJsFilePath, 'utf-8');

// regexes
const exportedEnvJSONRegex = new RegExp(`"env":{.*},"webpack"`);
const serverPortConstRegex = new RegExp('const currentPort =.*');
const serverHostConstRegex = new RegExp('const hostname =.*');

// get env object
const match = fileContent.match(exportedEnvJSONRegex).toString().replace(',"webpack"', '');
const envObject = JSON.parse(`{${match}}`).env;

// get env port
const envPort = envObject.PORT;
if (!envPort)
    throw new Error(`Env does not export a required value: PORT!`);

// write file
const replaced = fileContent
    .replace(serverPortConstRegex, `const currentPort = ${envPort}`)
    .replace(serverHostConstRegex, `const hostname = "localhost"`);

writeFileSync(serverJsFilePath, replaced, 'utf-8');