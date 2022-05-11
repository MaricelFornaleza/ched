<template>
  <div>
    <div class="relative">
      <button @click="viewNotifications" class="relative z-10 block">
        <BellIcon class="h-6" />
        <div
          class="
            absolute
            w-3
            h-3
            z-20
            rounded-full
            bg-error-dark
            top-0
            right-0
            border border-brand-blue
          "
        ></div>
      </button>
      <div
        v-show="show"
        class="
          absolute
          w-96
          right-0
          mt-2
          bg-light-100
          rounded
          shadow-xl
          z-20
          text-dark-300
          border border-light-400
        "
      >
        <ul
          class="
            flex flex-col
            divide-y divide-light-200
            max-h-[500px]
            overflow-y-auto
          "
        >
          <li class="notif-child text-center font-bold">Notifications</li>
          <li
            v-for="i in 10"
            :key="i"
            class="p-4 hover:bg-light-200 cursor-pointer"
          >
            Notif {{ i }}
          </li>
          <li class="notif-child text-center">See more</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { BellIcon } from "@heroicons/vue/outline";
export default {
  components: {
    BellIcon,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    viewNotifications() {
      this.show = !this.show;
    },
  },
};
</script>
<style>
.notif-child {
  padding: 10px;
}
</style>