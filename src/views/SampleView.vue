<template >
  <div @click="notify()">Click me!</div>
</template>
<script>
import Parse from "parse";

export default {
  data() {
    return {
      name: null,
    };
  },
  methods: {
    notify() {
      const params = {};
      Parse.Cloud.run("approveRequest", params);
    },
  },
};
</script>
<style>
</style>