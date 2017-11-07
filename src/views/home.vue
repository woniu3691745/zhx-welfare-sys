/*
 * @Author: lidongliang 
 * @Date: 2017-10-12 17:58:36 
 * @Last Modified by: lidongliang
 * @Last Modified time: 2017-11-07 16:22:24
 * home
 */
<template>
  <div class="home">
    <div>
        <z-navigation></z-navigation>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navigation from '../components/navigation'
export default {
  name: 'home-page',
  components: { 'z-navigation': navigation }
}
</script>