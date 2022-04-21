<template>
  <div>
    <div
      class="
        w-full
        bg-brand-blue
        flex
        shadow-sm
        text-light-100
        px-3
        lg:px-10
        py-3
        justify-between
        items-center
        fixed
        z-10
      "
    >
      <div
        class="
          text-xl
          uppercase
          font-bold
          flex
          items-center
          gap-3
          lg:order-first lg:mx-0
        "
      >
        <img src="../assets/CHED_logo.svg" class="h-8" alt="CHED Logo" />
        CHEDRO V
      </div>
      <div
        class="
          flex
          items-center
          gap-2
          lg:order-last lg:right-0 lg:absolute lg:pr-10
        "
      >
        <button><BellIcon class="h-6" /></button>
        <button class="gap-2 flex" @click="logout()">
          <LogoutIcon class="h-6" />
          <div class="hidden lg:block">Logout</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { BellIcon, LogoutIcon } from "@heroicons/vue/outline";
import Parse from "parse";

export default {
  name: "TopNavigation",
  components: {
    BellIcon,
    LogoutIcon,
  },
  methods: {
    async logout() {
      await Parse.User.logOut();
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        this.$router.push({ name: "landing" });
      }
    },
  },
};
</script>

