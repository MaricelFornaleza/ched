<template>
  <view-layout>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </view-layout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ViewLayout from "@/layout/ViewLayout.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    ViewLayout,
  },
};
</script>
