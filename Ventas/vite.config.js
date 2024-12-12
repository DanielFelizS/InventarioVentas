/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
      "@CrudPages": path.resolve(__dirname, "src/components/pages/CrudPages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/components/hooks"),
      "@templates": path.resolve(__dirname, "src/components/templates"),
      "@reducers": path.resolve(__dirname, "src/reducers"),
      "@actions": path.resolve(__dirname, "src/actions"),
      "@root": path.resolve(__dirname, "./")

    }
  }
})
