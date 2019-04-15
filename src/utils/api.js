import util from './httppost' // 此处，引入存放对promise处理的文件

const host = 'http://10.220.98.168:8080' // 后台的ip地址
const getRequest = util.httpsPromisify(wx.request)

const request = (method, url, data = {}) => { // method为请求方法，url为接口路径，data为传参
  return getRequest({
    url: host + url,
    data: data,
    method: method,
    header: {
      'content-type': 'application/json',
      'user_id': '1'
    }
  })
}

export default {
  // 接口
  // [自定义名字]: params => request([请求方法], [接口路径], params),
  // 例子
  postRequest: params => request('POST', 'urlRequest', params),
  getRequest: params => request('GET', 'urlPost', params)
}
