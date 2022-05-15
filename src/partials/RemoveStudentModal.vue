<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="fixed z-[800] py-2 inset-0 overflow-y-auto overflow-visible"
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
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
      >
        <div class="bg-light-100">
          <div class="mt-3 sm:mt-0">
            <div class="w-full bg-error p-5 flex justify-between items-center">
              <div class="text-left text-light-100">
                <h5 class="font-body font-bold" id="modal-title">
                  Remove a Student?
                </h5>
                <p class="text-sm">This action cannot be undone!</p>
              </div>
              <div class="text-light-100">
                <ExclamationCircleIcon class="h-10" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-light-100 p-5 text-right">
          <button
            type="button"
            @click="$emit('toggleDeleteModal')"
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
          <button
            type="button"
            @click="confirm()"
            class="
              w-full
              inline-flex
              justify-center
              btn-sm btn-default
              bg-error
              border-0
              sm:ml-3 sm:w-auto sm:text-sm
            "
          >
            Yes, proceed.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ExclamationCircleIcon } from "@heroicons/vue/outline";
import Parse from "parse";
export default {
  components: {
    ExclamationCircleIcon,
  },

  methods: {
    async confirm() {
      this.$emit("confirmDeleteStudent");
    },
  },
};
</script>


