const title = process.env.VUE_APP_TITLE
/**
 * 手机区号与国家代码对应表
 */
const areaCode2CountryCode = {
    '+86': 'CN',
    '+852': 'HK',
    '+853': 'MO',
    '+886': 'TW'
}

/**
 * 国家代码与手机区号对应表
 */
const countryCode2AreaCode = {
    'CN': '+86',
    'HK': '+852',
    'MO': '+853',
    'TW': '+886'
}

export function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}

export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }

    const _search = '{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}'
    return JSON.parse(_search)
}

/**
 * 获取文件后缀名
 * @param path
 * @returns {string}
 */
export function getFileSuffixName(path) {
    if (!path || typeof path !== 'string') {
        return ''
    }
    const index = path.lastIndexOf('.')
    if (index <= -1) {
        return ''
    }
    return path.slice(index + 1, path.length).toLowerCase()
}

const randomStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789' // 随机所需的字符串
/**
 * 获取指定长度是字符串
 * @param len
 * @param str
 * @returns {string}
 */
export function randomStrLen(len = 30, str = randomStr) {
    const strArr = []
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor((Math.random() * str.length))
        strArr.push(str[randomIndex])
    }
    return strArr.join('')
}

/**
 * base64 转 blob 对象，用于兼容ie10的ajax 上传
 * @param base64
 * @returns {Blob}
 */
export function convertBase64ToBlob(base64) {
    const base64Arr = base64.split(',')
    let imgtype = ''
    let base64String = ''
    if (base64Arr.length > 1) {
        // 如果是图片base64，去掉头信息
        base64String = base64Arr[1]
        imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'))
    }
    // 将base64解码
    const bytes = atob(base64String)
    // var bytes = base64;
    const bytesCode = new ArrayBuffer(bytes.length)
    // 转换为类型化数组
    const byteArray = new Uint8Array(bytesCode)

    // 将base64转换为ascii码
    for (let i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i)
    }

    // 生成Blob对象（文件对象）
    return new Blob([bytesCode], { type: imgtype })
}

/**
 * 通过手机区号获取国家代码
 *
 * @param {string} areaCode 手机区号
 * @return {string}
 */
export function getCountryCodeByAreaCode(areaCode) {
    const result = areaCode2CountryCode[areaCode]
    return result || ''
}

/**
 * 通过国家代码获取手机区号
 *
 * @param {string} countryCode 国家代码
 * @return {string}
 */
export function getAreaCodeByCountryCode(countryCode) {
    const result = countryCode2AreaCode[countryCode.toUpperCase()]
    return result || ''
}

/**
 * 倒计时功能
 *
 * @param {object} data 设定参数
 * @param {number} data.timeout 倒计时时间，单位秒，默认 0
 * @param {number} data.duration 倒计时的步速，单位秒，默认 1
 * @param {function} data.callback 每倒计时一次后的回调
 * @param {function} data.done 倒计时完毕后的回调
 */
export function countDown(data) {
    const _default = {
        timeout: 0,
        duration: 1,
        callback: null,
        done: null
    }

    const options = Object.assign(_default, data)

    if (options.timeout > 0) {
        setTimeout(() => {
            options.timeout -= 1
            options.callback && options.callback(options.timeout)
            countDown(options)
        }, options.duration * 1000)
    } else {
        options.done && options.done()
    }
}

/**
 * 获取 url 的文件 后缀, 类型后缀
 * @param url
 * @returns {string}
 */
export function getUrlFileName(url) {
    if (!url || typeof url !== 'string') {
        return ''
    }
    const Index = url.lastIndexOf('?')
    let newUrl = url
    if (Index >= 0) {
        newUrl = url.slice(0, Index)
    }
    return getFileSuffixName(newUrl)
}

/**
 * 判断网络文件是否为 img 类型
 * @returns {boolean}
 */
export function httpFileIsImg(src) {
    const imgArr = ['jpg', 'jpeg', 'png', 'gif', 'webp']
    const name = getUrlFileName(src)
    return imgArr.includes(name)
}

/**
 * 将英文的星期转为中文
 * @param name
 * @returns {string}
 * @constructor
 */
export function ENWeekToCN(name) {
    if (!name) {
        return ''
    }
    let cn = ''
    switch (name) {
        case 'monday':
            cn = '周一'
            break
        case 'tuesday':
            cn = '周二'
            break
        case 'wednesday':
            cn = '周三'
            break
        case 'thursday':
            cn = '周四'
            break
        case 'friday':
            cn = '周五'
            break
        case 'saturday':
            cn = '周六'
            break
        case 'sunday':
            cn = '周日'
            break
        default:
            cn = ''
            break
    }
    return cn
}

// 格式化日期
export function formatDate(data) {
    let date = new Date(data)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    date = year + '-' + month + '-' + day
    return date
}
// 本周第一天
export function showWeekFirstDay() {
    const Nowdate = new Date()
    const WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000)
    let M = Number(WeekFirstDay.getMonth()) + 1
    let D = WeekFirstDay.getDate()
    M = M < 10 ? '0' + M : M
    D = D < 10 ? '0' + D : D
    return WeekFirstDay.getFullYear() + '-' + M + '-' + D
}
// 本周最后一天
export function showWeekLastDay() {
    const Nowdate = new Date()
    const WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000)
    const WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000)
    let M = Number(WeekLastDay.getMonth()) + 1
    let D = WeekLastDay.getDate()
    M = M < 10 ? '0' + M : M
    D = D < 10 ? '0' + D : D
    return WeekLastDay.getFullYear() + '-' + M + '-' + D
}
