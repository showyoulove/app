import axios from 'axios'
import store from '@/store'
import router from "@/router";
import { HmacSHA256 } from 'crypto-js'
import mainMessage from '@/utils/resetMessage'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
  timeout: 30000
})

const requestList = new Set()
let cancel, hash = ''

// 请求拦截器
service.interceptors.request.use(
  config => {
    const key = process.env.VUE_APP_KEY
    let params = config.params || {}, sign_str = ''
    if (params.sign) params.sign = null
    // 插入版本号和时间戳
    params['version'] = '1'
    params['token'] = localStorage.getItem('token')
    params['timestamp'] = Math.round(new Date().getTime() / 1000).toString()
    //获取键
    let new_keys = Object.keys(params).sort()
    // 组装签名字符串
    for (let i = 0; i < new_keys.length; i++) {
      let v = params[new_keys[i]];
      if (v === undefined || v === 'undefined' || (v + '').trim() === '' || v === null || v === 'null' || new_keys[i] === undefined) {
        delete params[new_keys[i]]
        continue
      }
      sign_str += new_keys[i] + '=' + v + '&';
    }
    sign_str = sign_str.substr(0, sign_str.length - 1)
    // 签名
    const sign = params['sign'] = HmacSHA256(sign_str, key).toString()
    hash = config.url + sign
    config.cancelToken = new axios.CancelToken(function executor(e) {
      cancel = e
    })
    // 在这里阻止重复请求，上个请求未完成时，相同的请求不会再次执行
    if (requestList.has(hash)) {
      cancel(`${location.host}${hash}---重复请求被中断`)
    } else {
      requestList.add(hash)
    }
    // 重新赋值
    if (config.method.toLowerCase() === 'get') {
      config.params = params
    } else {
      config.headers['Content-Type'] = config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/json; charset=UTF-8'
      if (config.data) {
        config.params = params;
      } else {
        config.params = {}
        config.data = params
      }
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)


// 响应拦截器
service.interceptors.response.use(
  response => {
    setTimeout(() => {
      requestList.delete(hash)
    }, 60000)
    if (response.status === 200) {
      return response.data.data
    }
  }, error => { // 错误处理
    if (axios.isCancel(error)) {
      mainMessage.error('请勿频繁请求');
      return
    }else if (error && error.response) {
      switch (error.response.status) {
        case 400:
          mainMessage.error('请求错误，请勿频繁请求');
          break;
        case 401:
          mainMessage.warning('您的登录信息已过期，请重新登录')
          store.commit('user/CLEAR_STATE')
          router.push({path: '/'}).then()
          break;
        case 403:
          mainMessage.warning('服务器拒绝了你的访问');
          break;
        case 404:
          // router.push({path: '/404'},()=>{})
          // mainMessage.error('请求的资源不存在');
          break
        case 405:
          mainMessage.error('请求方法未允许');
          break
        case 408:
          mainMessage.error('请求超时');
          break
        case 413:
          mainMessage.warning('请勿频繁请求');
          break
        case 500:
          mainMessage.error('服务器错误，请稍候重试');
          break
        case 501:
          mainMessage.error('网络未实现');
          break
        case 502:
          mainMessage.error('网络错误');
          break
        case 503:
          mainMessage.error('服务不可用');
          break
        case 504:
          mainMessage.error('网络超时');
          break
        case 505:
          mainMessage.error('http版本不支持该请求');
          break
        default:
          mainMessage.error(`未知错误${error.response.status}`)
      }
    } else {
      mainMessage.error(`未知错误${JSON.stringify(error)}`)
    }
    return Promise.reject(error.response.data.msg)
  }
)

export default service
