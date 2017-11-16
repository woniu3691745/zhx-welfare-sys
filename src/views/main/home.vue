/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-15 19:59:43
 * 主页
 */
<template>
  <div class="home">
    <z-navigation></z-navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import navigation from '../../components/navigation'
export default {
  name: 'home-page',
  data () {
    return {}
  },
  mounted () {},
  methods: {},
  components: { 'z-navigation': navigation }
}
</script>