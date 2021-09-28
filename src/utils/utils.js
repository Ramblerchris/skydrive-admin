const utils = {
  //  存储大小格式化
  formatDiskSize (limit) {
    var size = ''
    if (limit < 0.1 * 1024) {
      // 如果小于0.1KB转化成B
      size = limit.toFixed(2) + 'B'
    } else if (limit < 0.1 * 1024 * 1024) {
      // 如果小于0.1MB转化成KB
      size = (limit / 1024).toFixed(2) + 'KB'
    } else if (limit < 0.1 * 1024 * 1024 * 1024) {
      // 如果小于0.1GB转化成MB
      size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
    } else {
      // 其他转化成GB
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    }
    var sizestr = size + ''
    var len = sizestr.indexOf('\\.')
    var dec = sizestr.substr(len + 1, 2)
    if (dec === '00') {
      // 当小数点后为00时 去掉小数部分
      return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
    }
    return sizestr
  },
  //  时间加0
  timeAdd0 (str) {
    if (str.length <= 1) {
      str = '0' + str
    }
    return str
  },
  //  是否是数字
  isNumber (input) {
    if (input && typeof (input) === 'number') {
      return true
    }
    return false
  },
  //  日期格式化
  expretimeStr (datetime) {
    //  时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var date = new Date(datetime)
    var year = date.getFullYear()
    var month = ('0' + (date.getMonth() + 1)).slice(-2)
    var sdate = ('0' + date.getDate()).slice(-2)
    var hour = ('0' + date.getHours()).slice(-2)
    var minute = ('0' + date.getMinutes()).slice(-2)
    var second = ('0' + date.getSeconds()).slice(-2)
    // 拼接
    var result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute + ':' + second
    // 返回
    return result
  },
  isNndeNull (value) {
    if (typeof (value) === 'undefined' || value === 0) {
      return true
    }
    return false
  }
}
export default utils
