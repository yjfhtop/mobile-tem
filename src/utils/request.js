import axios from 'axios'
import { Dialog, Toast } from 'vant'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

// 一般处理方式
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000, // request timeout
    // 因为axios 过滤了 非200 的请求，导致不好判断是否显示错误
    validateStatus(status) {
        return true
    }
})

// custom = {loading: boole = f, useFormData: boole = f, hideErrInfo: bool = f, noCheckServerCode = f }
// loading 是否显示loading   def:f
// useFormData 是否显示是否使用表单上传 def: f
// hideErrInfo 请求错误是否隐藏 def: f
// baseURL 默认为 process.env.VUE_APP_BASE_API， 如果有本项，则使用本项的地址
// noCheckServerCode 不校验后台返回的状态码（非http状态码） def: f

// loading 控制器
let _LoadingController = null

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['token'] = getToken()
        }

        // 防止取值错误
        if (!config.custom) {
            config.custom = {}
        }
        // 请求地址出现不明字符
        config.url = decodeURI(encodeURI(config.url).replace(/%E2%80%8B/g, ''))
        // 如果有基础路径，就使用
        if (config.custom.baseURL) {
            config.baseURL = config.custom.baseURL
        }

        // 如果是使用使用表单上传， 对请求头 和 data 做处理
        if (config.custom.useFormData) {
            config.headers['Content-Type'] = 'multipart/form-data'
            const formData = new FormData()
            const data = config.data || {}
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key])
            })
            config.data = formData
        }

        // 判断是否 显示Loading
        if (config.custom.loading) {
            // login 显示代码
            _LoadingController = Toast.loading({
                message: '请求中...',
                forbidClick: true
            })
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        let errStr = ''
        const HttpCode = response.status
        const ServerCode = response.data && response.data.code ? response.data.code : ''
        const res = response.data
        // 判断是否 隐藏Loading
        if (response.config.custom.loading) {
            // 关闭 loading 代码
            _LoadingController && _LoadingController.clear()
        }
        if ((HttpCode >= 200 && HttpCode < 300) || HttpCode === 304) {
            if (ServerCode !== 200 && !response.config.custom.noCheckServerCode) { // 这里的200 是与后台 约定
                errStr = res.message || '服务器错误'
            }
        } else {
            switch (response.status) {
                case 500:
                    errStr = '服务器错误(500)'
                    break
                case 502:
                    errStr = '网关错误'
                    break
                case 503:
                    errStr = '服务器繁忙'
                    break
                case 504:
                    errStr = '网关超时'
                    break
                case 404:
                    errStr = '请求地址不存在'
                    break
                case 405:
                    errStr = '请求方法错误'
                    break
                default:
                    errStr = '未知错误'
                    break
            }
        }

        if (errStr) {
            // 判断是否弹出错误提示
            if (!response.config.custom.hideErrInfo) {
                // 1002 token过期
                if (ServerCode === 1002) {
                    removeToken()
                    Dialog.alert(
                        {
                            title: '提升',
                            message: '您的登录以过期，请重新登录！'
                        }
                    ).then(() => {
                        // 刷新页面， 在导航守卫的作用下回跳转至登录页
                        location.reload()
                    })
                } else {
                    Toast({
                        message: errStr,
                        type: 'fail',
                        duration: 5 * 1000
                    })
                }
            }
            return Promise.reject(errStr)
        } else {
            return res
        }
    },
    error => {
        // 这里应该不会进入了
        Toast({
            message: error.message,
            type: 'fail',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service

// jsonp 简单封装
export function jsonp(url, data) {
    return new Promise((resolve, reject) => {
        // 初始化url
        const dataString = url.indexOf('?') === -1 ? '?' : '&'
        const callbackName = `jsonpCB_${Date.now()}`
        url += `${dataString}callback=${callbackName}`
        if (data) {
            // 有请求参数，依次添加到url
            for (const k in data) {
                url += `&${k}=${data[k]}`
            }
        }
        const jsNode = document.createElement('script')
        jsNode.src = url
        // 触发callback，触发后删除js标签和绑定在window上的callback
        window[callbackName] = result => {
            delete window[callbackName]
            document.body.removeChild(jsNode)
            if (result) {
                resolve(result)
            } else {
                reject('没有返回数据')
            }
        }
        // js加载异常的情况
        jsNode.addEventListener('error', () => {
            delete window[callbackName]
            document.body.removeChild(jsNode)
            reject('JavaScript资源加载失败')
        }, false)
        // 添加js节点到document上时，开始请求
        document.body.appendChild(jsNode)
    })
}
