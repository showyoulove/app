import {ElLoading} from 'element-plus'

export const baseColorfulLoading = (index, text, time) => {
  let loading
  if (!index) {
    loading = ElLoading.service({
      lock: true,
      text: text || '正在加载中。。。',
      spinner: 'dots-loader',
      background: 'hsla(0,0%,100%,.8)',
    })
  } else {
    switch (index) {
      case 1:
        index = 'dots'
        break
      case 2:
        index = 'gauge'
        break
      case 3:
        index = 'inner-circles'
        break
      case 4:
        index = 'plus'
        break
    }
    loading = ElLoading.service({
      lock: true,
      text: text || '正在加载中。。。',
      spinner: index + '-loader',
      background: 'hsla(0,0%,100%,.8)',
    })
  }
  setTimeout(()=> {
    loading.close()
  }, time || 3000)
  return loading
}

export const baseLoading = (index, text, time) => {
  let loading
  if (!index) {
    loading = ElLoading.service({
      lock: true,
      text: text || '正在加载中。。。',
      background: 'hsla(0,0%,100%,.8)',
    })
  } else {
    loading = ElLoading.service({
      lock: true,
      text: text || '正在加载中。。。',
      spinner: 'vab-loading-type' + index,
      background: 'hsla(0,0%,100%,.8)',
    })
  }
  setTimeout(()=> {
    loading.close()
  }, time || 3000)
  return loading
}
