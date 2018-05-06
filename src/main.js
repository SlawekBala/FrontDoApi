// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import axios from './axios'

// window.axios = axios
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
//
// let interval = 0;
//
// axios.interceptors.request.use(config => {
//     if (interval) {
//         interval = setInterval(() => {
//             store.state.loading = true
//         }, 1000) //tu ustawiam czas do uruchomienia gifa z loaderem
//     }
//
//     const  token = localStorage.getItem('token')
//     if(token) {
//         config.headers.common['Authorization'] = `Bearer ${token}`
//     } else {
//       router.push({path: '/login'})
//     }
//
//     return config;
// })
// axios.interceptors.response.use(config => {
//     if (interval) {
//         clearInterval(interval)
//     }
//     interval = 0
//     store.state.loading = false
//
//     return config;
// }, error => {
//
//     if (error.response.status === 401){
//         router.push({path: '/login'})
//     }
// })

Vue.use(Vuetify, { theme: {
  primary: '#003bfa',
  secondary: '#424242',
  accent: '#58f8ff',
  error: '#ff0504',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
