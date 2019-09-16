import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const Types = {
    'SET_TOKEN': 'SET_TOKEN',
    'SET_USER': 'SET_USER'
}

const state = {
    token: getToken(),
    user: null // 用户信息
}

const mutations = {
    [Types.SET_TOKEN]: (state, token) => {
        state.token = token
    },
    [Types.SET_USER]: (state, user) => {
        state.user = user
    }
}

const actions = {
    login({ commit }, userInfo) {
        const data = {
            account: userInfo.account,
            password: userInfo.password,
            ticket: userInfo.ticket,
            randstr: userInfo.randstr
        }

        return new Promise((resolve, reject) => {
            login(data).then(res => {
                const { data } = res

                commit([Types.SET_TOKEN], data.token)
                setToken(data.token)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit([Types.SET_TOKEN], '')
                commit([Types.SET_USER], null)
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo().then(res => {
                commit([Types.SET_USER], res.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit([Types.SET_TOKEN], '')
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

