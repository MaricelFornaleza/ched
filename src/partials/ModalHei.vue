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
        <div class="bg-light-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="mt-3 text-center sm:mt-0 sm:text-center">
            <h3 class="h1 leading-6 font-bold text-dark-400" id="modal-title">
              Select HEI
            </h3>
            <div class="mt-8">
              <Select2
                v-model="value"
                :options="sortHEIs"
                :settings="{ width: '100%', placeholder: 'Select' }"
              />
              <!-- @change="myChangeEvent($event)" @select="mySelectEvent($event)" -->
            </div>
          </div>
        </div>
        <div class="bg-light-100 px-4 mb-4 py-4 sm:px-6">
          <button
            type="button"
            @click="nextPage(application_type)"
            class="
              w-full
              inline-flex
              justify-center
              btn-sm btn-default
              sm:ml-3 sm:w-auto sm:text-sm
            "
          >
            Select
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="
              mt-3
              w-full
              justify-center
              inline-flex
              btn-sm btn-outline
              sm:mt-0 sm:ml-4 sm:w-auto sm:text-sm
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { SearchIcon } from "@heroicons/vue/outline";
import router from "../router";
import Select2 from "vue3-select2-component";
import Parse from "parse";

export default {
  name: "ModalHei",
  data() {
    return {
      results: false,
      value: "",
      placeholder: "Select",
      newSteps: [
				{ no: 1, title: "Enrollment for 1st Semester", completed: false },
				{ no: 2, title: "Enrollment for 2nd Semester", completed: false },
				{ no: 3, title: "List of Graduates", completed: false },
				{ no: 4, title: "Application for Approval", completed: false },
				{ no: 5, title: "Application Complete", completed: false },
			],
      additionalSteps: [
        { no: 1, title: "Notarized Transmittal Letter", completed: false },
        { no: 2, title: "Proof", completed: false },
        { no: 3, title: "List of Graduates", completed: false },
        { no: 4, title: "Application for Approval", completed: false },
        { no: 5, title: "Application Complete", completed: false },
      ],
    };
  },
  props: {
    lists: Object,
    application_type: String,
  },
  components: {
    // SearchIcon,
    Select2,
  },
  computed: {
    sortHEIs() {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      function compare(a, b) {
        const heiA = a.text.toUpperCase(); // ignore upper and lowercase
        const heiB = b.text.toUpperCase(); // ignore upper and lowercase
        if(heiA < heiB) return -1;
        if(heiA > heiB) return 1;
        return 0;
      }
      var heiList = this.lists;
      return heiList.sort(compare);
    },
  },
  methods: {
    async nextPage(application_type) {
      if (application_type == "new") {
        //new application
        let currentDate = new Date();
        // var currentDate = dateformat(now, "dddd, mmmm d, yyyy, h:MM TT");

        const Application = Parse.Object.extend("Application");
        const application = new Application();

        application.set("dateApplied", currentDate);
        application.set("status", "1 of 5");
        application.set("steps", this.newSteps);
        application.set("applicationType", "New Application");
        application.set("heiId", new Parse.User({ id: this.value }));

        application.save().then(
          (application) => {
            router.push({
              name: "1stStep",
              params: { step: 1, application: application.id },
            });
          },
          (error) => {
            alert(
              "Failed to create new object, with error code: " + error.message
            );
          }
        );
      
      } else if (application_type == "additional") {
        //for additional graduates
        // const dateformat = require("dateformat");
        let currentDate = new Date();
        // var currentDate = dateformat(now, "dddd, mmmm d, yyyy, h:MM TT");

        const Application = Parse.Object.extend("Application");
        const application = new Application();

        application.set("dateApplied", currentDate);
        application.set("status", "1 of 5");
        application.set("steps", this.additionalSteps);
        application.set("applicationType", "For Additional Graduates");
        application.set("heiId", new Parse.User({ id: this.value }));

        application.save().then(
          (application) => {
            router.push({
              name: "Step1",
              params: {
                application: application.id,
              },
            });
          },
          (error) => {
            alert(
              "Failed to create new object, with error code: " + error.message
            );
          }
        );
      }
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

