import { Indicator } from 'mint-ui'
/**
 *  开始加载
 * @param {*} Indicator
 */
export function startLoading () {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
}

/**
 *  结束加载
 * @param {*} Indicator
 */
export function endLoading () {
  Indicator.close()
}
