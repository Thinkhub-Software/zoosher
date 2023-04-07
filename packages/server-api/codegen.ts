import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: "./tmbw-api-graphql/tmdbw-api-schema.graphql",
    documents: ['./src/external-api/tmdbw/**/*.ts'],
    generates: {
        './src/external-api/tmdbw/schema.ts': {
            plugins: [
                "typescript",
                "typescript-operations"
            ]
        }
    }
}

export default config