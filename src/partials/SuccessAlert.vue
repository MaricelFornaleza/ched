<template>
  <div id="alert-1" :class="className" role="alert">
    <CheckCircleIcon class="sm:h4 h-6 mr-2 text-success self-center" />
    <div class="sm:text-sm xs:text-xs">
      <slot></slot>
    </div>
    <button class="ml-2" data-dismiss-target="#alert-1" aria-label="Close">
      <XIcon class="h-4 text-success self-center" />
    </button>
  </div>
</template>

<script>
import { CheckCircleIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";
export default {
  name: "SuccessAlert",
  props: {
    className: String,
  },
  components: {
    CheckCircleIcon,
    XIcon,
  },
};
</script>
