<template>
  <div>
    <div
      class="
        w-full
        bg-brand-blue
        flex
        justify-between
        shadow-sm
        text-light-100
        px-10
        py-3
        flex
        items-center
        fixed
        z-10
      "
    >
      <div class="flex items-center">
        <img src="../assets/CHED_logo.svg" class="h-8 pr-5" alt="CHED Logo" />
        <div class="text-xl uppercase font-bold flex items-center gap-16">
          CHEDRO V
          <button @click="toggleSideBar"><MenuIcon class="h-6" /></button>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <button><BellIcon class="h-6" /></button>
        <button class="gap-2 flex"><LogoutIcon class="h-6" /> Logout</button>
      </div>
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

