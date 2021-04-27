import request from '@/utils/request'

// 登录
export function login(data) {
    return request({
        url: '',
        method: 'post',
        data
    })
}

// 登出
export function logout(data) {
    return request({
        url: '',
        method: 'post',
        data
    })
}

// 获取用户信息
export function getUserInfo(data) {
    return request({
        url: '',
        method: 'get',
        data
    })
}
