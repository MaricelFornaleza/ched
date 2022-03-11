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
        flex
        items-center
        fixed
        z-10
      "
    >
      <button @click="toggleSideBar">
        <MenuIcon class="h-6 lg:order-2 lg:pl-20" />
      </button>
      <div
        class="
          text-xl
          uppercase
          font-bold
          flex
          items-center
          gap-3
          lg:order-first
          mx-auto
          lg:mx-0
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
        <button class="gap-2 flex">
          <LogoutIcon class="h-6" />
          <div class="hidden lg:block">Logout</div>
        </button>
      </div>

      <!-- Old  -->
      <!-- <div class="flex items-center">
        <img src="../assets/CHED_logo.svg" class="h-8 pr-5" alt="CHED Logo" />
        <div class="text-xl uppercase font-bold flex items-center gap-16">
          CHEDRO V
          <button @click="toggleSideBar">
            <MenuIcon class="h-6" />
          </button>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <button><BellIcon class="h-6" /></button>
        <button class="gap-2 flex">
          <LogoutIcon class="h-6" />
          <div class="hidden">Logout</div>
        </button>
      </div> -->
      <!-- Old  -->
    </div>
  </div>
</template>
<script>
import { MenuIcon, BellIcon, LogoutIcon } from "@heroicons/vue/outline";

export default {
  name: "TopNavigation",
  components: {
    MenuIcon,
    BellIcon,
    LogoutIcon,
  },
  methods: {
    toggleSideBar() {
      this.$emit("toggleSB");
    },
  },
};
</script>

