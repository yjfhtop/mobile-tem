import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式全局导入， 组件局部导入
import './style/index.less'
import './permission'
import { Lazyload } from 'vant'
Vue.use(Lazyload)
// 全局混入
import * as mixinObj from '@/mixins/global'
Object.keys(mixinObj).forEach((item) => {
    Vue.mixin(mixinObj[item])
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
