import request from '@/utils/request'

/**
 * 客户端获取诊所信息
 * @param data
 */
export function getClinicInfo(data) {
    return request({
        url: '',
        method: 'get',
        params: data
    })
}
