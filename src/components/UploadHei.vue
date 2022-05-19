<template>
  <div>
    <div
      v-if="!completed"
      class="
        m-auto
        mt-20
        border border-1 border-light-300
        shadow-sm
        px-20
        py-10
        bg-light-100
        w-4/5
        xl:w-4/12
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

      <div v-if="dropzoneFile === ''" class="mt-10 w-full">
        <DropZone
          @drop.prevent="drop"
          @change="selectedFile"
          fileType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          <span class="body-m">
            Must be .xlsx file using this
            <a
              :href="templateUrl"
              class="font-bold underline hover:text-brand-blue"
              download
              >template</a
            >.
          </span>
        </DropZone>
      </div>

      <div
        v-else
        class="my-20 w-full flex justify-between p-5 border border-light-300"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-5">
            <img
              src="@/assets/img/xls.png"
              class="h-8"
              alt="PDF Icon by Dimitry Miroliubov"
            />
            <div class="text-base">{{ dropzoneFile.name }}</div>
          </div>

          <XCircleIcon
            @click="removeFile()"
            class="h-5 text-error cursor-pointer"
            title="Remove File"
          />
        </div>
      </div>

      <div class="flex items-center justify-center space-x-5 mt-5">
        <button
          @click="goToHei()"
          class="btn-sm btn-default btn-outline"
          type="button"
        >
          Cancel
        </button>
        <button
          v-if="!completed"
          class="btn-sm btn-default"
          type="submit"
          @click="upload()"
        >
          Upload
        </button>
      </div>
    </div>
    <div
      v-else
      class="container w-fit mx-auto flex flex-col items-center justify-center"
    ></div>
    <ModalWidget v-show="visible">
      <template #body>
        <div
          class="
            inline-flex
            items-center
            px-4
            py-4
            font-semibold
            leading-6
            text-sm
            shadow
            rounded-md
            text-light-100
            bg-brand-blue
            hover:bg-brand-blue
            transition
            ease-in-out
            duration-150
            cursor-progress
          "
          disabled
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-light-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </div>
      </template>
    </ModalWidget>
  </div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
//import AlertWidget from "@/partials/AlertWidget.vue";
import ModalWidget from "@/partials/ModalWidget.vue";
import { ref } from "vue";
import Worker from "@/assets/js/parseHei.worker.js";
import { LibraryIcon } from "@heroicons/vue/solid";
import { XCircleIcon } from "@heroicons/vue/outline";
import Parse from "parse";

export default {
  data() {
    return {
      templateUrl: "/files/NSTP-LIST-OF-HEI-TEMPLATE.xlsx", //may switch to file-loader package to load files
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
    XCircleIcon,
    // AlertWidget,
    DropZone,
    ModalWidget,
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
              var heis = event.data.rows;

              if (event.data.complete) {
                _this.storeHeis(heis);
                _this.visible = false;
                //_this.$emit("complete", step);
                _this.completed = !_this.completed;
                _this.$router.push({
                  name: "hei",
                  query: {
                    status: "success",
                    msg: "The HEIs were successfully added.",
                  },
                });
              } else {
                _this.visible = false;
              }
            };
          }
        };
        reader.readAsArrayBuffer(this.dropzoneFile);
      } else {
        alert("Please upload a .xlsx file!");
      }
    },
    storeHeis(data) {
      for (let i = 1; i < data.length; i++) {
        const user = new Parse.User();
        const password = Math.random().toString(36).slice(-12);
        user.set("institutionalCode", data[i].A);
        user.set("name", data[i].B.toUpperCase());
        user.set("address", {
          barangay: data[i].C,
          city: data[i].D,
          province: data[i].E,
          regionNo: data[i].F.toString(),
          regionName: data[i].G,
        });
        user.set("email", data[i].H);
        user.set("contactNumber", data[i].I);
        user.set("type", data[i].J.toUpperCase());
        user.set("userType", "hei");
        user.set("password", password);
        user.set("username", data[i].K);
        console.log(data[i].K);

        const ACL = new Parse.ACL();
        ACL.setReadAccess(Parse.User.current(), true);
        ACL.setWriteAccess(Parse.User.current(), true);
        user.setACL(ACL);

        user.save().then(() => {
          const params = {
            email: data[i].I,
            name: data[i].B,
            password: password,
            type: "Account",
            approved: true,
          };
          Parse.Cloud.run("sendEmailNotification", params);
        });
      }
    },
    removeFile() {
      this.dropzoneFile = "";
    },
    goToHei() {
      this.$router.push({ name: "hei" });
    },
  },
};
</script>
