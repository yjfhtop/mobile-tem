import router from './router'
import store from './store'
import { getPageTitle } from '@/utils'

const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
    const User = store.getters.user
    // 暂时不对无token用户拦截---对必须token的页面（其实就是接口），具体查看utils/request.js
    const Token = store.getters.token
    // 每次路由切换修改title
    document.title = getPageTitle(to.meta.title ? to.meta.title : '')
    try {
        if (Token) {
            // 如果有token 判断用户信息存在吗
            if (User) {
                next()
            } else {
                // 不存在，拉取
                await store.dispatch('user/getInfo')
            }
        } else {
            if (whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                next(`/login?redirect=${to.path}`)
            }
        }
    } catch (e) {
        // 清空 用户信息
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
    }
})

router.afterEach(() => {
    // pass
})
