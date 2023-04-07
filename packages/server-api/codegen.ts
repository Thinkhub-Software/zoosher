import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: "./tmbw-api-graphql/tmdbw-api-schema.graphql",
    documents: ['./src/tmdbw-api/**/*.ts'],
    generates: {
        './src/tmdbw-api/schema.ts': {
            plugins: [
                "typescript",
                "typescript-operations"
            ]
        }
    }
}

export default config