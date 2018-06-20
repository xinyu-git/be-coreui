import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import router from './router/'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import filters from './filters/'


window.token_value = localStorage.getItem("token_value");
Axios.defaults.headers.common.Accept = 'application/json';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.common.Authorization = 'Bearer ' + (window.token_value || localStorage.getItem("token_value"));
Axios.interceptors.response.use(
    response => {
        // if (response && response.data && (response.data.errCode == "200002")) {
        //     console.error("axios response error token");
        //     console.log("we should re login", router, router.replace)
        //     localStorage.removeItem("token_value")
        //     window.location.href = '/';
        // }
        return response.data;
    },
    error => {
        console.error("axios error 异常：" + error);
        if (error && error.response) {
            switch (error.response.status) {
                case 401:
                    break
                case 500:
                    console.log(error)
                    break
                case 502:
                    console.log(error)
                    break
                case 404:
                    console.log(error)
                    break
                default:
                    console.log(error)
            }
        } else {
            console.log(error)
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
    }
);

Axios.defaults.timeout = 5000;
Vue.prototype.$http = Axios;
Vue.use(VueAxios, Axios);
Vue.use(BootstrapVue)
// 注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const FastClick = require('fastclick')
FastClick.attach(document.body)


const v = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
