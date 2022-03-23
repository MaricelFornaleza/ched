<template>
  <div id="alert-1" :class="className" role="alert">
        <InformationCircleIcon class="sm:h4 h-6 mr-2 text-info self-center" />
            <div class="sm:text-sm xs:text-xs">
                {{ msg }} Follow the format provided in the Template.&nbsp;
                <a :href="href.link" class="font-bold underline"> Download Template </a>
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
    msg: String,
    className: String,
    href: Object,
  },
  components: {
    InformationCircleIcon,
    XIcon
  },
};
</script>
