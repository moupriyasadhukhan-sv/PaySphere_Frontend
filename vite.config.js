// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from '@tailwindcss/vite'


// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   server: {
//     port: 5173,
//     proxy: {
//       "/auth": {
//         target: "http://localhost:5245",
//         changeOrigin: true,
//         cookieDomainRewrite: "localhost",
//       },
//       "/api": {
//         target: "http://localhost:5245",
//         changeOrigin: true,
//         cookieDomainRewrite: "localhost",
//       },
//     },
//   },
// });