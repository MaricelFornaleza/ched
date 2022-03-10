<template>
  <div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
    <LandingView/>
    

  </div>
  
</template>

<script>
import  LandingView  from '@/views/LandingView.vue'

export default{
  name: 'App',
  components:{
    LandingView
  }
}
</script>

<style>

</style>
