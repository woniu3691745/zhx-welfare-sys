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
    onSlotValueChange (picker) {
      this.ind = Number(picker.className.replace('s', ''))
      this.objs = picker.currentValue || {}
    },
    handclickshow () {
      this.isShow = true
      if (this.flags) {
        this.getAddressDate(0).then((res) => {
          this.slots[0].values = res.data.bizData.Address
          this.flags = false
        }).catch((e) => { console.warn('初始网络错误') })
      }
    },
    onValuesChange (picker, values) {
      if (this.flags) return
      if (this.objs && this.objs.f === 'N') {
        while (this.ind + 1 < values.length) {
          this.ind++
          picker.setSlotValues(this.ind, '')
        }
        return
      }
      this.getAsyncData(picker).then(res => {
        let i = 0
        this.values = ''
        this.defaultArr = []
        while (i < values.length && values[i] != null) {
          this.values += values[i].v.length > 3 ? `${values[i].v.substring(0, 3)}...-` : `${values[i].v.substring(0, 3)}-`
          this.defaultArr[i] = values[i].k
          i++
        }
        this.values = this.values.slice(0, -1)
      })
    },
      // 获得联动数据
    getAddressDate (k) {
      let data = {
        'bizData': {
          'addrCode': k
        }
      }
      return this.$store.dispatch('ZHXGET_ADDRESS_LIST', data)
    },
    async getAsyncData (picker) {
      let Pk = this.objs.k
      let items = picker.$children[2 * (this.ind + 1)]
      if (!(Pk in this.addList)) {
        try {
          const res = await this.getAddressDate(Pk)
          let arr = res.data.bizData ? res.data.bizData.Address : ['']
          if (Pk != null) this.addList[Pk] = arr
          picker.setSlotValues(this.ind + 1, arr)
          if (items != null)items.currentValue = arr[0]
        } catch (e) {
          console.warn('请求错误', e)
        }
      } else {
        let arr = await this.addList[Pk]
        picker.setSlotValues(this.ind + 1, arr)
        if (items != null)items.currentValue = arr[0]
      }
    }
  }
}
