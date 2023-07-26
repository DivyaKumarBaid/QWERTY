import { defineConfig } from "vite@^3.1.3";
import react from "@vitejs/plugin-react@^2.1";

import "react@^18.2";
import "react-dom@^18.2/client";
import "react-router-dom@^6.4"; // Add this line

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});