<template>
  <div>
    <div v-if="!allow" class="w-fit mx-auto">
      <AlertWidget className="alert-warning">
        Please complete the previous steps.
      </AlertWidget>
    </div>

    <div
      v-if="!isCompleted && allow"
      class="
        container
        w-full
        xl:w-6/12
        mx-auto
        flex flex-col
        items-center
        justify-center
      "
    >
      <AlertWidget :className="className">
        Please Upload a Notarized Transmittal Letter.
      </AlertWidget>

      <div v-if="dropzoneFile === ''" class="mt-10 w-full">
        <drop-zone
          @drop.prevent="drop"
          @change="selectedFile"
          fileType="application/pdf"
        >
          <span class="body-m">
            Must be .pdf file using this
            <button class="font-bold underline">template</button>.
          </span>
        </drop-zone>

        <!-- <span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span> -->
      </div>
      <div
        v-else
        class="my-20 w-full flex justify-between p-5 border border-light-300"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-5">
            <img
              src="@/assets/img/pdf.png"
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
import { EyeIcon, DownloadIcon, XCircleIcon } from "@heroicons/vue/outline";
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
      className: "alert-info",
    };
  },
  props: {
    isCompleted: Boolean,
    appId: String,
    hei_username: String,
    allow: Boolean,
  },

  components: {
    SuccessAlert,
    AlertWidget,
    DropZone,
    EyeIcon,
    DownloadIcon,
    XCircleIcon,
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
    validate(filename) {
      var regex = /^.*\.(pdf|PDF)$/;
      if (filename === "") {
        this.className = "alert-error";
        return false;
      } else if (regex.test(filename.name)) {
        return true;
      } else {
        alert("Please upload a .pdf file!");
        this.removeFile();
        return false;
      }
    },
    async upload(step) {
      var validation = this.validate(this.dropzoneFile);

      if (this.dropzoneFile == "") {
        this.className = "alert-warning";
      } else if (validation) {
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
              document
                .getElementById("fileurl")
                .setAttribute("href", docs.url());
            });

          },
          function (error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log("Error: " + error);
          }
        );

      const query1 = new Parse.Query(Parse.User);
      query1.equalTo("userType", "admin");
      const result1 = await query1.find({ useMasterKey: true });
      const obj = result1[0];

      if (Parse.User.current().get("userType") == "hei") {
        const notification = new Parse.Object("Notification");
        notification.set("applicationId", _this.appId);
         notification.set("userId", obj.id);
        notification.set(
          "message", Parse.User.current().get("username") + 
          ' uploaded a Notarized Transmittal Letter for application with id number '  
          + _this.appId);
        notification.set("routeName", "Step1");
        notification.set("isRead", false);
        notification.save();
      }

        this.$emit("complete", step);
        this.$emit("setStatus", "2 of 4");
        this.$emit("sendEmail", "Notarized Transmittal Letter", "Step 1 of 4");
      }
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
    removeFile() {
      this.dropzoneFile = "";
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