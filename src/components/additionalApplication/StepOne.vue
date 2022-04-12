<template>
  <div>
    <div
      v-if="!isCompleted"
      class="container w-fit mx-auto flex flex-col items-center justify-center"
    >
      <AlertWidget className="alert-info">
        Please Upload a Notarized Transmittal Letter.
      </AlertWidget>

      <div v-if="dropzoneFile === ''" class="mt-10 w-full">
        <DropZone @drop.prevent="drop" @change="selectedFile" />
        <!-- <span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span> -->
      </div>
      <div
        v-else
        class="my-20 w-full flex justify-between p-5 border border-light-300"
      >
        <div class="flex space-x-5">
          <img
            src="@/assets/img/pdf.png"
            class="h-8"
            alt="PDF Icon by Dimitry Miroliubov"
          />
          <div class="text-base">{{ dropzoneFile.name }}</div>
        </div>
      </div>

      <div class="flex items-center justify-center space-x-5 mt-5">
        <button
          @click="goToApplication()"
          class="btn-sm btn-default btn-outline"
          type="button"
        >
          Cancel
        </button>
        <button
          v-if="!isCompleted"
          @click="upload(1)"
          class="btn-sm btn-default"
          type="submit"
        >
          Upload
        </button>
      </div>
    </div>
    <div
      v-else
      class="container w-fit mx-auto flex flex-col items-center justify-center"
    >
      <SuccessAlert className="alert-success">
        The Notarized Transmittal Letter was successfully uploaded.
      </SuccessAlert>

      <div
        class="
          my-20
          w-full
          flex
          justify-between
          items-center
          p-5
          border border-light-300
        "
      >
        <div class="flex items-center space-x-5">
          <img
            src="@/assets/img/pdf.png"
            class="h-8"
            alt="PDF Icon by Dimitry Miroliubov"
          />
          <a href="" id="fileurl" target="_blank" ref="file">
            <div class="text-base">{{ filename }}</div></a
          >
        </div>
        <div class="flex space-x-4">
          <button class="p-2 rounded fit-content bg-dark-100">
            <EyeIcon class="h-4 text-light-100" />
          </button>
          <button class="p-2 rounded fit-content bg-error">
            <DownloadIcon class="h-4 text-light-100" />
          </button>
        </div>
      </div>

      <div class="flex items-center justify-center space-x-5 mt-5">
        <button
          @click="goToApplication()"
          class="btn-sm btn-default btn-outline"
          type="button"
        >
          Back
        </button>

        <button @click="nextStep()" class="btn-sm btn-default" type="submit">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
import SuccessAlert from "@/partials/SuccessAlert.vue";
import AlertWidget from "@/partials/AlertWidget.vue";
import { EyeIcon, DownloadIcon } from "@heroicons/vue/outline";
import "jquery/dist/jquery.min.js";
import { ref } from "vue";
import Parse from "parse";

export default {
  data() {
    return {
      completed: false,
      filename: "",
      fileurl: "",
      title: "NotarizedTransmittalLetter",
    };
  },
  props: { isCompleted: Boolean, appId: String, hei_username: String },

  components: {
    SuccessAlert,
    AlertWidget,
    DropZone,
    EyeIcon,
    DownloadIcon,
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
  created() {
    this.getUrl(this.appId);
  },
  methods: {
    upload(step) {
      var currentDate = new Date()
        .toLocaleDateString()
        .replace(/[^\w\s]/gi, "");
      var name = this.hei_username + "-" + this.title + currentDate + ".pdf";
      this.filename = name;
      let _this = this;
      const parseFile = new Parse.File(this.filename, this.dropzoneFile);
      parseFile.save().then(
        function () {
          // The file has been saved to Parse.
          // set application document attributes:
          // documentType, filename, document, applicationId
          //applicationId - reference to the parent application
          var ApplicationDocument = new Parse.Object("ApplicationDocument");
          ApplicationDocument.set("documentType", _this.title);
          ApplicationDocument.set("filename", name);
          ApplicationDocument.set("document", parseFile);
          ApplicationDocument.set(
            "applicationId",
            new Parse.Object("Application", { id: _this.appId })
          );
          ApplicationDocument.save().then(() => {
            // get the url of the document saved in parse
            // then set it as the href of element with id=fileurl
            const docs = ApplicationDocument.get("document");
            document.getElementById("fileurl").setAttribute("href", docs.url());
          });

          console.log("File has been uploaded! ");
        },
        function (error) {
          // The file either could not be read, or could not be saved to Parse.
          console.log("Error: " + error);
        }
      );

      this.$emit("complete", step);
      this.$emit("setStatus", "2 of 5");
    },
    async getUrl(appId) {
      // this function gets the url of the uploaded document in parse
      // condition: the document's application id must be equal to the application id
      // condition: the document's type must be equal to this.title
      const Document = Parse.Object.extend("ApplicationDocument");
      const Appdocument = new Parse.Query(Document);
      Appdocument.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: appId })
      );
      Appdocument.equalTo("documentType", this.title);
      const results = await Appdocument.first();

      var docs = results.get("document");
      this.filename = results.get("filename");
      document.getElementById("fileurl").setAttribute("href", docs.url());
    },

    nextStep() {
      this.$emit("nextStep");
    },
    goToApplication() {
      this.$emit("goToApplication");
    },
  },
};
</script>