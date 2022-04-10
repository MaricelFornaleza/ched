<!-- my-modal.vue -->
<template>
  <div class="modal fixed z-20 py-2 inset-0 overflow-y-auto overflow-visible" tabindex="-1" role="dialog" >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 " >
      
      <div class="fixed inset-0 bg-dark-400 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div role="document"
        class="
          p-4
          modal-dialog relative
          inline-block
          align-bottom
          bg-light-100
          rounded-md
          text-center
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-fit
        "
      >
        <div class="modal-content ">
          <div class="modal-header">
            <slot name="header"></slot>
            <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button> -->
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <!--
              using `v-bind` shorthand to pass the `closeModal` method
              to the component that will be in this slot
            -->
            <slot name="footer" :closeModal="closeModal"></slot>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  //...
  methods: {
    closeModal () {
      // Do what needs to be done to close the modal... and maybe remove it from the DOM
      
    }
  }
}
</script>
