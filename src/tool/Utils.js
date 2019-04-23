/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 存储sessionStorage
 */
export const setSession = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
export const getSession = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * 删除sessionStorage
 */
export const removeSession = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}
// 获取定位
export const getLocation = callback => {
  // 定位失败
  const showError = error => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('定位失败,用户拒绝请求地理定位')
        break
      case error.POSITION_UNAVAILABLE:
        alert('定位失败,位置信息不可用')
        break
      case error.TIMEOUT:
        alert('定位失败,请求获取用户位置超时')
        break
      case error.UNKNOWN_ERROR:
        alert('定位失败,定位系统失效')
        break
    }
  }

  // 定位成功
  const showPosition = position => {
    const lat = position.coords.latitude // 纬度
    const lng = position.coords.longitude // 经度
    callback(lat, lng)
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError)
  } else {
    alert('浏览器不支持地理定位。')
  }
}
export const cumputeDistance = (lat1, lng1, lat2, lng2) => {
  const Rad = d => {
    return d * Math.PI / 180.0 // 经纬度转换成三角函数中度分表形式。
  }
  // 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  var radLat1 = Rad(lat1)
  var radLat2 = Rad(lat2)
  var a = radLat1 - radLat2
  var b = Rad(lng1) - Rad(lng2)
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    )
  s = s * 6378.137 // EARTH_RADIUS
  s = Math.round(s * 10000) / 10000 // 输出为公里
  s = s.toFixed(1)
  return s
}
// 比较大小
export const compare = property => {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}
// cookie
export const getCookie = name => {
  var v = window.document.cookie.match('(^|) ?' + name + '=([^]*)(|$)')
  return v ? v[2] : null
}
// url
export const getUrlParam = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
// 去重
export const removeDuplicate = arr => {
  var newArr = [] // 新建一个新数组
  // 遍历参数数组array
  for (var i = 0; i < arr.length; i++) {
    // 判断新数组是否有这个元素值，没有的话，就把arr[i]给push到新数组newArr中
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
// 根据权限隐藏按钮
export const judgeButton = (pageButtons, powerButtons) => {
  for (var item of pageButtons) {
    let dataCode = item.getAttribute('data-code')
    if (dataCode) {
      let hasCode = powerButtons.find(v => {
        return dataCode === v
      })
      if (!hasCode) {
        item.style.display = 'none'
      }
    }
  }
}
