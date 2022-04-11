
<template>
  <div>
    <div
      class="
        m-auto
        mt-20
        border border-1 border-light-300
        shadow-sm
        px-20
        py-10
        bg-light-100
        w-4/5
        lg:w-4/12
      "
    >
      <div
        class="
          border-b-2
          text-center
          flex flex-col
          justify-center
          items-center
          space-y-3
          w-full
          pb-3
          border-dark-100
          mb-4
        "
      >
        <div class="rounded-full bg-warning-light h-fit w-fit p-4 text-warning">
          <LibraryIcon class="h-10" />
        </div>
        <p class="uppercase font-bold label-sm">Higher Education Institution</p>
      </div>
      <div>
        <DropZone @drop.prevent="drop" @change="selectedFile" />
        <span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span>
      </div>
      <div class="flex items-center justify-center space-x-5 mt-10">
        <button class="btn-sm bg-light-300 font-bold" type="button">
          Cancel
        </button>
        <button
          class="btn-sm bg-brand-blue text-light-100 font-bold"
          type="submit"
          @click="upload()"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
//import AlertWidget from "@/partials/AlertWidget.vue";
// import heisData from "@/assets/json/heis.json";
//import HeiDataTable from "@/partials/HeiDatatable.vue";
//import ModalWidget from "@/partials/ModalWidget.vue";
import { ref } from "vue";
import Worker from "@/assets/js/parseHei.worker.js";
import { LibraryIcon } from "@heroicons/vue/solid";
export default {
  data() {
    return {
      visible: false,
      completed: false,
      className: "alert-info",
      table_headers: { A: "NO.", B: "NAME" },
      heis: [],
      excelData: [],
      worker: undefined,
    };
  },
  components: {
    LibraryIcon,
    // AlertWidget,
    DropZone,
    //HeiDataTable,
    //ModalWidget,
  },
  setup() {
    let dropzoneFile = ref("");
    const drop = (e) => {
      dropzoneFile.value = e.dataTransfer.files[0];
    };
    const selectedFile = () => {
      dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
    };

    return { dropzoneFile, drop, selectedFile };
  },
  methods: {
    upload() {
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

      if (this.dropzoneFile === "") {
        this.className = "alert-error";
      } else if (regex.test(this.dropzoneFile.name)) {
        // alert(`Submitted Files:\n${this.dropzoneFile.name}`);
        this.visible = true;
        let _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;

          if (typeof Worker !== "undefined") {
            if (typeof _this.worker == "undefined") {
              _this.worker = new Worker();
            }
            _this.worker.postMessage({
              d: data,
            });

            //can be improved by abstraction
            _this.worker.onmessage = function (event) {
              _this.table_headers = event.data.headers;
              _this.heis = event.data.rows;
              console.log(_this.heis);

              if (event.data.complete) {
                _this.visible = false;
                //_this.$emit("complete", step);
                _this.completed = !_this.completed;
              }
            };
          }
        };
        reader.readAsArrayBuffer(this.dropzoneFile);
      } else {
        alert("Please upload a .xlsx file!");
      }
    },
  },
};
</script>
