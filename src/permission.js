import router from './router'
import store from './store'
import { getPageTitle } from '@/utils'

router.beforeEach(async(to, from, next) => {
    const RouteParameter = store.getters.routeParameter
    const ClinicId = store.getters.clinicId
    const ClinicInfo = store.getters.clinicInfo
    const User = store.getters.user
    // 暂时不对无token用户拦截---对必须token的页面（其实就是接口），具体查看utils/request.js
    const Token = store.getters.token
    if (Token) {
        // 如果有token 判断用户信息存在吗
        if (User) {
            // pass
        } else {
            // 不存在，拉取
            try {
                await store.dispatch('user/getInfo')
            } catch (e) {
                console.log(e)
            }
        }
    }
    // 对 诊所 routeParameter 和 clinicId 进行判断 ---start
    const NowRouteParameter = to.params.routeParameter
    // 只有能够匹配到NowRouteParameter 才是诊所界面，才需要进行判断
    if (NowRouteParameter) {
        if (!RouteParameter || !ClinicId || !ClinicInfo) {
            // 如果RouteParameter 或者 ClinicId  或者 ClinicInfo 任意一个不存在，用路由参数换取 诊所id， 拉取诊所信息
            try {
                await store.dispatch('clinic/getClinicInfo', RouteParameter)
            } catch (e) {
                console.log(e)
            }
        } else {
            // 都存在，使用vuex存在的 RouteParameter 与 NowRouteParameter对比
            if (NowRouteParameter === RouteParameter) {
                // 如果相等，说明没有切换诊所
            } else {
                // 如果不相等，说明切换了诊所，需要重新拉取诊所信息
                try {
                    await store.dispatch('clinic/getClinicInfo', RouteParameter)
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
    // 每次路由切换修改title
    const ClinicName = ClinicInfo && ClinicInfo.name ? ClinicInfo.name + '-' : ''
    document.title = getPageTitle(ClinicName + to.meta.title ? to.meta.title : '')
    next()
})

router.afterEach(() => {
    // pass
})
