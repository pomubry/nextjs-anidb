import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.anilist.co",
  documents: ["lib/**/*.{ts,tsx}", "!lib/gql/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "lib/gql/": {
      preset: "client",
      plugins: [],
      config: {
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
