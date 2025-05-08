import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), dts()],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "vscabbage-react",
			fileName: (format) => {
				if (format === "es") {
					return "index.mjs"; // Output file for ES module
				} else if (format === "cjs") {
					return "index.cjs"; // Output file for CommonJS module
				}
				return "index.js"; // Default fallback (for other formats if added in the future)
			},
			formats: ["es", "cjs"], // Both ESM and CommonJS
		},
		rollupOptions: {
			external: ["react"], // Exclude React from the bundle
			output: {
				globals: {
					react: "React", // Make sure React is available globally
				},
			},
		},
	},
});
