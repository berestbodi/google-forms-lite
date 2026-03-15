import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://127.0.0.1:4000",
  documents: ["src/**/*.graphql"],
  generates: {
    "src/api/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-rtk-query"],
      config: {
        importBaseApiFrom: "./baseApi",
        importBaseApiName: "api",
        exportHooks: true,
        // Ми вимикаємо складний режим
        documentMode: "string",
      },
    },
  },
};

export default config;
