<template>
  <!-- ALERT-INFO -->
  <div id="alert-1" :class="className" role="alert" v-if="className == 'alert-info'">
    <InformationCircleIcon class="sm:h4 h-6 mr-2 text-info self-center" />
    <div class="sm:text-sm xs:text-xs">
        <slot></slot>
    </div>
    <button class="ml-2" data-dismiss-target="#alert-1" aria-label="Close">
    <XIcon class="h-4 text-info self-center" />
    </button> 
  </div>
  
  <!-- ALERT-SUCCESS -->
  <div id="alert-1" :class="className" role="alert" v-else-if="className == 'alert-success'">
    <CheckCircleIcon class="sm:h4 h-6 mr-2 text-success self-center" />
    <div class="sm:text-sm xs:text-xs">
        <slot></slot>
    </div>
    <button class="ml-2" data-dismiss-target="#alert-1" aria-label="Close">
    <XIcon class="h-4 text-success self-center" />
    </button> 
  </div>

  <!-- ALERT-WARNING -->
  <div id="alert-1" :class="className" role="alert" v-else-if="className == 'alert-warning'">
    <ExclamationCircleIcon class="sm:h4 h-6 mr-2 text-warning self-center" />
    <div class="sm:text-sm xs:text-xs">
        <slot></slot>
    </div>
    <button class="ml-2" data-dismiss-target="#alert-1" aria-label="Close">
    <XIcon class="h-4 text-warning self-center" />
    </button> 
  </div>

  <!-- ALERT-ERROR -->
  <div id="alert-1" :class="className" role="alert" v-else-if="className == 'alert-error'">
    <ExclamationCircleIcon class="sm:h4 h-6 mr-2 text-error self-center" />
    <div class="sm:text-sm xs:text-xs">
        <slot></slot>
    </div>
    <button class="ml-2" data-dismiss-target="#alert-1" aria-label="Close">
    <XIcon class="h-4 text-error self-center" />
    </button> 
  </div>

</template>

<script>
import { InformationCircleIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/outline";
export default {
  name: "AlertWidget",
  props: {
    className: String
  },
  components: {
    InformationCircleIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    XIcon
  },
};
</script>
