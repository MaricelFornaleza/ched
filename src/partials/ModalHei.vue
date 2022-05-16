<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="fixed z-20 py-2 inset-0 overflow-y-auto overflow-visible"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <!--
			Background overlay, show/hide based on modal state.

			Entering: "ease-out duration-300"
				From: "opacity-0"
				To: "opacity-100"
			Leaving: "ease-in duration-200"
				From: "opacity-100"
				To: "opacity-0"
			-->
      <div
        class="fixed inset-0 bg-dark-400 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <!--
			Modal panel, show/hide based on modal state.

			Entering: "ease-out duration-300"
				From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				To: "opacity-100 translate-y-0 sm:scale-100"
			Leaving: "ease-in duration-200"
				From: "opacity-100 translate-y-0 sm:scale-100"
				To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			-->
      <div
        class="
          relative
          inline-block
          align-bottom
          bg-light-100
          rounded-md
          text-center
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
      >
        <div class="bg-light-100 border-b-2 border-light-300">
          <div class="mt-3 sm:mt-0">
            <div class="w-full bg-info p-5 flex justify-between items-center">
              <div class="text-left text-light-100">
                <h5 class="font-body font-bold" id="modal-title">Select HEI</h5>
              </div>
              <div class="text-light-100">
                <SearchCircleIcon class="h-10" />
              </div>
            </div>
            <div class="p-5">
              <Select2
                v-model="value"
                :options="sortHEIs"
                :settings="{ width: '100%', placeholder: 'Select' }"
              />
              <p class="text-xs text-error">{{ errorMsg }}</p>
              <!-- @change="myChangeEvent($event)" @select="mySelectEvent($event)" -->
            </div>
          </div>
        </div>
        <div class="bg-light-100 p-5 text-right sm:px-6">
          <button
            type="button"
            @click="close()"
            class="
              w-full
              justify-center
              inline-flex
              btn-sm btn-outline
              sm:mt-0 sm:ml-4 sm:w-auto sm:text-sm
            "
          >
            Cancel
          </button>
          <button
            type="button"
            @click="nextPage()"
            class="
              w-full
              inline-flex
              justify-center
              btn-sm btn-default
              bg-info
              border-0
              sm:ml-3 sm:w-auto sm:text-sm
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { SearchIcon } from "@heroicons/vue/outline";

import Select2 from "vue3-select2-component";
import { SearchCircleIcon } from "@heroicons/vue/outline";

export default {
  name: "ModalHei",
  data() {
    return {
      results: false,
      value: "",
      placeholder: "Select",
      errorMsg: null,
    };
  },
  props: {
    lists: Object,
    application_type: String,
  },
  components: {
    // SearchIcon,
    Select2,
    SearchCircleIcon,
  },

  computed: {
    sortHEIs() {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      function compare(a, b) {
        const heiA = a.text.toUpperCase(); // ignore upper and lowercase
        const heiB = b.text.toUpperCase(); // ignore upper and lowercase
        if (heiA < heiB) return -1;
        if (heiA > heiB) return 1;
        return 0;
      }
      var heiList = this.lists;
      return heiList.sort(compare);
    },
  },
  methods: {
    nextPage() {
      if (this.value == "") {
        this.errorMsg = "This field is required!";
      } else {
        this.$emit("createApplication", this.value);
      }
    },
    close() {
      (this.errorMsg = null), this.$emit("close");
    },
    myChangeEvent(val) {
      console.log(val);
    },
    mySelectEvent({ id, text }) {
      console.log({ id, text });
    },
  },
};
</script>

