const bodyScroll = function (event) {
  event.preventDefault()
}
export const addMixin = {
  mounted () {
    this.time = setTimeout(() => {
      document.body.addEventListener('touchmove', bodyScroll, { passive: false })
    }, 20)
  },
  beforeDestroy () {
    document.body.removeEventListener('touchmove', bodyScroll, { passive: false })
    clearTimeout(this.time)
  },
  methods: {
    getAsyncData () {
      return async(picker, values) => {
        const OldDataArr = this.defaultArr
        for (let i = 0; i < values.length; i++) {
          let val = values[i]
          if (val != null && val.k !== OldDataArr[i]) {
            OldDataArr[i] = val.k
            if (val.f === 'Y') {
              if (!((`${val.k}`) in this.addList)) {
                try {
                  const res = await this.getAddressDate(val.k, i)
                  let arr = res.data.bizData.Address
                  this.addList[val.k] = arr
                  picker.setSlotValues(i + 1, arr)
                } catch (err) {}
              } else {
                let arr = this.addList[`${val.k}`]
                picker.setSlotValues(i + 1, arr)
              }
            } else if (val.f === 'N') {
              let ln = values.length
              if (ln > i) {
                for (let j = i; j < ln; j++) {
                  if (j + 1 === ln) {
                    return
                  }
                  OldDataArr[j + 1] = ''
                  picker.setSlotValues(j + 1, '')
                }
              }
            }
          }
        }
      }
    }
  }
}
