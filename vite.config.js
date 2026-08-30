import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  envDir: './conf',
  server: {
    host: '0.0.0.0', // Mengizinkan akses dari semua host di Docker
    port: 5173, // Port default Vite
    cors: true, // Mengaktifkan CORS (jika dibutuhkan)
  },
  preview: {
    host: '0.0.0.0', // Sama seperti di server, preview harus bisa diakses
    port: 4173, // Port preview default Vite
    allowedHosts: ['doubleyoupemuteran.com'], // Daftar host yang diperbolehkan
  },
})
