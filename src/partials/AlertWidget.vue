<template>
  <div id="alert-1" :class="className" role="alert">
        <InformationCircleIcon class="sm:h4 h-6 mr-2 text-info self-center" />
            <div class="sm:text-sm xs:text-xs">
                <slot></slot>
            </div>
            <button class="ml-2" data-dismiss-target="#alert-1" aria-label="Close">
            <XIcon class="h-4 text-info self-center" />
        </button>
    </div>
</template>

<script>
import { InformationCircleIcon } from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/outline";
export default {
  name: "AlertWidget",
  props: {
    className: String
  },
  components: {
    InformationCircleIcon,
    XIcon
  },
};
</script>
