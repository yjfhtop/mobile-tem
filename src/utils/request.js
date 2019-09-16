import { Dialog, Toast } from 'vant'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            // 让每个请求携带 token
            config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        const currentShopId = store.getters.clinicId
        if (currentShopId) {
            config.params = config.params || {}
            config.params['shop_id'] = currentShopId
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        if (res.status_code !== 2000) {
            Toast.fail(res.message || 'Error')

            // 3000: 用户不存在, 3001: token参数不存在, 3002: token过期, 3003: token无效
            if ([3000, 3001, 3002, 3003].includes(res.status_code)) {
                // 先要清除token
                store.dispatch('user/resetToken')
                Dialog.confirm({
                    title: '提示',
                    message: '你登录的账号已过期，请重新登录！'
                }).then(() => {
                    // on confirm
                    router.push({ path: '/login' })
                }).catch(() => {
                    // on cancel
                })
                // to re-login
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Toast.fail(error.message)
        return Promise.reject(error)
    }
)

export default service
