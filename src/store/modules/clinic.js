// 这里是诊所信息非常重要， 每次切换路由都要将本页存储的诊所信息与导航路径参数进行匹配： 具体查看@/permission.js
import { getClinicInfo } from '@/api/clinic'
import { getClinicId, setClinicId, getRouteParameter, setRouteParameter } from '@/utils/clinic'

const Types = {
    'SET_ROUTE_PARAMETER': 'SET_ROUTE_PARAMETER',
    'SET_CLINIC_ID': 'SET_CLINIC_ID',
    'SET_CLINIC_INFO': 'SET_CLINIC_INFO'
}
const state = {
    routeParameter: getRouteParameter(), // 路径获取的参数， 现在阶段还不确定， 可能是诊所的id 或者 code, 用来标识诊所现在是哪家诊所
    clinicId: getClinicId(), // 诊所id
    clinicInfo: null // 诊所信息 {}
}

const mutations = {
    [Types.SET_ROUTE_PARAMETER](state, routeParameter) {
        state.routeParameter = routeParameter
    },
    [Types.SET_CLINIC_ID](state, clinicId) {
        state.clinicId = clinicId
    },
    [Types.SET_CLINIC_INFO](state, clinicInfo) {
        state.clinicInfo = clinicInfo
    }
}

const actions = {
    setRouteParameter({ commit }, routeParameter) {
        commit([Types.SET_ROUTE_PARAMETER], routeParameter)
        setRouteParameter(routeParameter)
    },
    setClinicId({ commit }, clinicId) {
        commit([Types.SET_CLINIC_ID], clinicId)
        setClinicId(clinicId)
    },
    getClinicInfo({ commit }, routeParameter) {
        // pass
        return new Promise((resolve, reject) => {
            getClinicInfo({ routeParameter }).then(res => {
                commit(Types.SET_CLINIC_INFO, res.data)
                commit([Types.SET_CLINIC_ID], res.data.id)
                commit([Types.SET_ROUTE_PARAMETER], routeParameter)
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

