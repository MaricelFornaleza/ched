<!-- my-modal.vue -->
<template>
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
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
