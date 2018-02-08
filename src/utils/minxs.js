import { MessageBox } from 'mint-ui'
export const bymixin = {
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
