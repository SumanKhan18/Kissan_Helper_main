import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/

export default defineConfig({

  // server: {
  //   port: 5173,
  //   strictPort: true // Prevents switching to another port
  // },

  plugins: [

    react(),

    tailwindcss()

  ],

  server: {

    allowedHosts: ['ea70403f43fd.ngrok-free.app', 'localhost']

}

})