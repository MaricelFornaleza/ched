<template>
  <div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
    <router-view />
  </div>
</template>
<script>
import Parse from "parse";
Parse.serverURL = "http://localhost:1337/api";
Parse.initialize("myAppId", "jskey", "masterKey");
export default {};
</script>
