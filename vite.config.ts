import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { vite as vidstack } from 'vidstack/plugins'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                isCustomElement: (tag) => tag.startsWith('media-'),
            },
        },
    }),
    // vidstack({ include: /player\// })
    ],
    base: "/demo-vue-player"
})
