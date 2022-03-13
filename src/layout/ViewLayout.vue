<template>
  <div>
    <TopNavigation @toggleSB="toggleSideBar" />
    <div class="flex">
      <SideNavigation ref="toggleSideNavigation" />
      <div class="flex-auto main-content pt-20 px-20 bg-light-200" ><slot /></div>
    </div>
  </div>
</template>
<script>
import TopNavigation from "@/components/TopNavigation.vue";
import SideNavigation from "@/components/SideNavigation.vue";

export default {
  name: "ViewLayout",
  components: {
    TopNavigation,
    SideNavigation,
  },

  methods: {
    toggleSideBar() {
      this.$refs.toggleSideNavigation.toggleSideNavigation();
    },
  },
};
</script>
