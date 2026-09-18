import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: './',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifestFilename: 'manifest.webmanifest',
            devOptions: {
                enabled: true
            },
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                id: '/',
                name: 'Adarsh Shukla | Portfolio',
                short_name: 'Adarsh Portfolio',
                description: 'Portfolio of Adarsh Shukla - Data Analyst',
                theme_color: '#00ffcc',
                background_color: '#0a0a0a',
                display: 'standalone',
                start_url: '/',
                icons: [
                    {
                        src: 'images/pictures/circle.png',
                        sizes: '1032x1036', // Actual image size matching
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ],
                screenshots: [
                    {
                        src: 'images/pictures/circle.png',
                        sizes: '1032x1036',
                        type: 'image/png',
                        form_factor: 'wide',
                        label: 'Desktop View'
                    },
                    {
                        src: 'images/pictures/circle.png',
                        sizes: '1032x1036',
                        type: 'image/png',
                        form_factor: 'narrow',
                        label: 'Mobile View'
                    }
                ]
            }
        })
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('swiper'))
                            return 'swiper';
                        return;
                    }
                }
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import"],
            },
        },
    },
})


