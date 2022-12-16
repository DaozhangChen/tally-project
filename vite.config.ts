import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    rollupOptions:{
      output:{
        manualChunks(id:any){
          if (id.includes('echarts')){
            return 'echarts';
          }
          if (id.includes('vant')){
            return 'vant';
          }
          if(id.includes('node_modules')){
            return 'vendor';
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsxPlugin({
      // options are passed on to @vue/babel-plugin-jsx
      transformOn:true,
      mergeProps:true
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server:{
    proxy:{
      '/api/v1':{
        target:'http://121.196.236.94:3000/'
      }
    }
  }
})
