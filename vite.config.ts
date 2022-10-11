import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
    vueJsxPlugin({
      // options are passed on to @vue/babel-plugin-jsx
      transformOn:true,
      mergeProps:true
    })
  ]
})
