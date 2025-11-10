import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"], // 👈 IMPORTANT
  outDir: "dist",
  sourcemap: true,
  clean: true,
});
