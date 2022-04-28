<template>
  <div class="time lg:block text-center flex-col flex gap-2 mb-10 lg:mb-15">
    <div class="uppercase text-sm font-semibold tracking-wider">
      Philippine Standard Time
    </div>
    <div class="text-4xl font-bold uppercase tracking-wider">{{ time }}</div>
    <div class="text-sm font-light tracking-wider">
      {{ date }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      interval: null,
      time: null,
      date: null,
    };
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  created() {
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format();
    }, 1000);
    this.date = new Date().toLocaleDateString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    });
  },
};
</script>