// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig } from "electron-vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
var __electron_vite_injected_dirname = "G:\\Programming\\lewiss\\LewissDesktop";
var sharedResolve = {
  alias: {
    "@": resolve(__electron_vite_injected_dirname, "src/renderer/src"),
    "@main": resolve(__electron_vite_injected_dirname, "./src/main"),
    "@renderer": resolve(__electron_vite_injected_dirname, "./src/renderer/src"),
    "@shared": resolve(__electron_vite_injected_dirname, "./src/shared")
  }
};
var electron_vite_config_default = defineConfig({
  main: {
    resolve: sharedResolve
  },
  preload: {},
  renderer: {
    resolve: sharedResolve,
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
        routesDirectory: resolve(__electron_vite_injected_dirname, "src/renderer/src/routes"),
        generatedRouteTree: resolve(__electron_vite_injected_dirname, "src/renderer/src/routeTree.gen.ts")
      }),
      react(),
      tailwindcss()
    ]
  }
});
export {
  electron_vite_config_default as default
};
