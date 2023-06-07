// vite.config.ts
import { defineConfig } from "file:///Users/andelarwanda/Desktop/LOGIN-AUTH/Team-Sostene-E-commerce-fe/node_modules/vite/dist/node/index.js";
import react from "file:///Users/andelarwanda/Desktop/LOGIN-AUTH/Team-Sostene-E-commerce-fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.tsx",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html", "lcov"],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
      all: true,
      exclude: ["**/*.storybook", "**/*.stories.{ts,tsx}"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYW5kZWxhcndhbmRhL0Rlc2t0b3AvTE9HSU4tQVVUSC9UZWFtLVNvc3RlbmUtRS1jb21tZXJjZS1mZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FuZGVsYXJ3YW5kYS9EZXNrdG9wL0xPR0lOLUFVVEgvVGVhbS1Tb3N0ZW5lLUUtY29tbWVyY2UtZmUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FuZGVsYXJ3YW5kYS9EZXNrdG9wL0xPR0lOLUFVVEgvVGVhbS1Tb3N0ZW5lLUUtY29tbWVyY2UtZmUvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgc2V0dXBGaWxlczogJy4vc3JjL3NldHVwVGVzdHMudHN4JyxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICdpc3RhbmJ1bCcsXG4gICAgICByZXBvcnRlcjogWyd0ZXh0JywgJ2pzb24nLCAnaHRtbCcsICdsY292J10sXG4gICAgICBsaW5lczogODAsXG4gICAgICBmdW5jdGlvbnM6IDgwLFxuICAgICAgYnJhbmNoZXM6IDgwLFxuICAgICAgc3RhdGVtZW50czogODAsXG4gICAgICBhbGw6IHRydWUsXG4gICAgICBleGNsdWRlOiBbJyoqLyouc3Rvcnlib29rJywgJyoqLyouc3Rvcmllcy57dHMsdHN4fSddLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVUsQ0FBQyxRQUFRLFFBQVEsUUFBUSxNQUFNO0FBQUEsTUFDekMsT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osS0FBSztBQUFBLE1BQ0wsU0FBUyxDQUFDLGtCQUFrQix1QkFBdUI7QUFBQSxJQUNyRDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
