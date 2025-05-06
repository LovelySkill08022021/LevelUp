import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {

        host: '0.0.0.0', // Access your development server from any IP on the network [3, 5, 10]
        hmr: {
            host: '10.10.50.60',  // Replace with your actual local network IP  // Optional: Ensure it matches the server port
        }
      }
});
