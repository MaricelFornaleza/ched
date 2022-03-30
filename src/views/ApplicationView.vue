<template>
  <div class="application">
    <!-- When application is empty -->
    <div v-if="empty == true">
      <EmptyState>
        <p class="text-4xl font-medium text-dark-300">No Applications</p>
        <p class="body-l text-dark-200">
          Get started by creating a new application
        </p>
        <div class="px-4 mb-4 py-3 sm:px-6 sm:grid sm:grid-cols-2 sm:gap-4">
          <button
            typ="button"
            @click="toggleModal('new')"
            class="
              inline-flex
              btn-sm btn-outline
              w-full
              justify-center
              items-center
              sm:mb-0
              mb-4
            "
          >
            New Application
          </button>
          <button
            typ="button"
            @click="toggleModal('additional')"
            class="
              inline-flex
              btn-sm btn-default
              w-full
              justify-center
              items-center
            "
          >
            For Additional Graduates
          </button>
        </div>
      </EmptyState>
    </div>

    <!-- When application is not empty -->
    <div class="hei h-full w-full flex flex-col" v-else>
      <!-- render empty state if there is no data found -->
      <!-- <EmptyState /> -->
      <div class="w-full text-center p-10">
        <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <simple-widget bgColor="bg-warning-light" textColor="text-warning">
            <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
            <template v-slot:count>123k</template>
            <template v-slot:label>For Approval</template>
          </simple-widget>
          <simple-widget bgColor="bg-info-light" textColor="text-info">
            <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
            <template v-slot:count>123k</template>
            <template v-slot:label>Approved</template>
          </simple-widget>
          <simple-widget bgColor="bg-success-light" textColor="text-success">
            <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
            <template v-slot:count>123k</template>
            <template v-slot:label>For Revision</template>
          </simple-widget>
          <simple-widget bgColor="bg-error-light" textColor="text-error">
            <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
            <template v-slot:count>123k</template>
            <template v-slot:label>Total Applications</template>
          </simple-widget>
        </div>
      </div>

      <!-- dataTables  -->
      <div>
        <ApplicationDataTable>
          <ul class="py-1" aria-labelledby="dropdownButton">
            <li>
              <div
                @click="toggleModal('new')"
                class="
                  block
                  cursor-pointer
                  py-2
                  px-4
                  text-sm
                  hover:bg-light-300
                "
              >
                New Application
              </div>
            </li>
            <li>
              <div
                @click="toggleModal('additional')"
                class="
                  block
                  cursor-pointer
                  py-2
                  px-4
                  text-sm
                  hover:bg-light-300
                "
              >
                For Additional Graduates
              </div>
            </li>
          </ul>
        </ApplicationDataTable>
      </div>
    </div>

    <ModalHei
      v-show="visible"
      :lists="lists"
      :application_type="application_type"
      @close="toggleModal('')"
    />
  </div>
</template>


<script>
// import Parse from 'parse';
import SimpleWidget from "@/partials/SimpleWidget.vue";
import EmptyState from "@/components/EmptyState.vue";
import { DocumentTextIcon } from "@heroicons/vue/solid";
import ApplicationDataTable from "@/partials/ApplicationDataTable.vue";
import ModalHei from "@/partials/ModalHei.vue";

export default {
  name: "ApplicationView",
  data() {
    return {
      empty: true,
      visible: false,
      lists: [
        "Ateneo de Naga University (ADNU)",
        "Bicol University (BU)",
        "University de Santa Isabel (USI)",
        "University of Nueve Caceres (UNC)",
      ],
      // file: "",
      // message: "",
      application_type: "",
    };
  },
  methods: {
    toggleModal(type) {
      this.visible = !this.visible;
      this.application_type = type;
    },
  },
  // methods: {
  // handleFileUpload( event ){
  // 		this.file = event.target.files[0];
  //     this.message= "IN!";
  // },
  // submitFile() {
  //   alert(`Submitted Files:\n${this.file.name}`);
  //   console.log(this.file);

  //   const Parse = require('parse');
  //   const parseFile = new Parse.File(this.file.name.toString(), this.file);
  //   parseFile.save().then(function() {
  //     // The file has been saved to Parse.
  //     console.log("File has been uploaded!");
  //   }, function(error) {
  //     // The file either could not be read, or could not be saved to Parse.
  //     console.log("Error: " + error);
  //   });
  // }
  // },
  components: {
    EmptyState,
    SimpleWidget,
    DocumentTextIcon,
    ApplicationDataTable,
    ModalHei,
  },
};
</script>