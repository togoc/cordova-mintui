import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import jquery from 'jquery'
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.config.productionTip = false

import MD5 from './md5'
Vue.prototype.$MD5 = MD5
Vue.prototype.$jquery = jquery

new Vue({
    render: h => h(App),
}).$mount('#app')