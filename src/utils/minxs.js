import { MessageBox } from 'mint-ui'
export const mixin = {
  methods: {
    mtAlert (data) {
      MessageBox({
        title: '提示',
        message: data,
        showCancelButton: false
      })
    }
  }
}
