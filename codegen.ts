import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.anilist.co",
  documents: ["lib/query/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "lib/gql/": {
      preset: "client",
      plugins: [],
      config: {
        enumsAsTypes: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
