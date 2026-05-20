import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function portfolioAssetResolver() {
  return {
    name: 'portfolio-asset-resolver',
    resolveId(id) {
      if (id.startsWith('portfolio:asset/')) {
        const filename = id.replace('portfolio:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  base: '/vnu-portfolio-25112107/',
  plugins: [
    portfolioAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
