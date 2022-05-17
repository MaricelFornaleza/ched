<template>
  <div
    class="
      w-full
      h-screen
      flex flex-col
      items-center
      justify-center
      text-center
    "
  >
    <img :src="img" alt="" class="mb-10" />
    <h2
      class="
        font-body
        text-[45px]
        lg:text-[66px]
        font-light
        tracking-widest
        text-info-dark
        uppercase
      "
    >
      Page not found
    </h2>
    <p class="my-3 text-[19px] tracking-wider text-dark-200">
      We are sorry, but the page you were looking for can’t be found.
    </p>
    <button @click="goToHome()" class="btn-sm btn-default my-8">
      Back to Home
    </button>
  </div>
</template>
<script>
import img from "@/assets/img/404.svg";
import router from "@/router";
export default {
  data() {
    return {
      img,
    };
  },
  methods: {
    goToHome() {
      router.push({ name: "home" });
    },
  },
};
</script>