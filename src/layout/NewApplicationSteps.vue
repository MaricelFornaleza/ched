<template>
  <div class="p-10">
    <div class="font-bold uppercase mb-3">{{ hei }}</div>
    <div class="bg-light-100 h-full w-full p-5 text-center">
      <div class="flex">
        <div
          v-for="step in steps"
          :key="step.no"
          @click="activeStep(step.no)"
          class="step z-50 flex items-center pl-3 cursor-pointer"
          :class="[
            currentStep === step.no ? 'active' : '',
            step.completed ? 'completed' : '',
          ]"
        >
          <div class="flex items-center space-x-3">
            <div
              class="
                rounded-full
                flex
                items-center
                justify-center
                border-2
                h-10
                w-10
              "
              :class="[
                currentStep === step.no
                  ? 'bg-info-dark border-light-100 text-light-100'
                  : 'border-light-400',
                step.completed && currentStep != step.no ? 'border-info' : '',
                step.completed && currentStep === step.no
                  ? 'border-light-100'
                  : '',
              ]"
            >
              <div v-if="step.completed"><CheckIcon class="h-5" /></div>
              <div v-else>{{ step.no }}</div>
            </div>
            <div class="text-xs text-left">
              <div class="uppercase font-bold">Step {{ step.no }}</div>
              <div class="hidden lg:block">{{ step.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <router-view
        @complete="completeStep"
        @nextStep="nextStep"
        @previousStep="previousStep"
        @goToApplication="goToApplication"
        @setStatus="setStatus"
        @checkActive="checkActive"
        :isCompleted="isCompleted"
        :appId="application_id"
        :hei_username="hei_username"
        :hei_region_code="hei_region_code"
        :allow="allow"
      ></router-view>
    </div>
  </div>
</template>
<script>
import router from "../router";
import Parse from "parse";
import { CheckIcon } from "@heroicons/vue/outline";

export default {
  components: {
    CheckIcon,
  },
  data() {
    return {
      hei: "",
      hei_username: "",
      hei_region_code: "",
      application_id: "",
      currentStep: 0,
      steps: [],
      isCompleted: false,
      allow: false,
    };
  },
  async created() {
    this.application_id = this.$route.params.application;

    const Application = Parse.Object.extend("Application");
    const query = new Parse.Query(Application);
    query.equalTo("objectId", this.application_id);
    query.include("heiId");
    var results = await query.first();
    this.hei = results.get("heiId").get("name");
    this.hei_username = results.get("heiId").get("username");
    console.log(this.hei_username);
    this.hei_region_code = results.get("heiId").get("address").regionNo;

    this.steps = results.get("steps");
    this.getCompletedStep();
    this.isCompleted = this.findStep(this.currentStep);
  },
  methods: {
    activeStep(step) {
      this.currentStep = step;
      this.isCompleted = this.findStep(step);
      this.checkActive(step);

      router.push({
        path: `/application/new/${this.currentStep}/${this.application_id}`,
      });
    },

    findStep(step) {
      for (var i in this.steps) {
        if (this.steps[i].no == step) {
          return this.steps[i].completed;
        }
      }
    },
    getCompletedStep() {
      var count = 0;
      for (var i in this.steps) {
        if (this.steps[i].completed == true) {
          count++;
        }
      }
      if (count < 4) {
        count++;
      }
      this.currentStep = count;
      console.log("activeStep: " + count);
      this.activeStep(count);
    },
    completeStep(currentStep) {
      // console.log(currentStep);
      for (var i in this.steps) {
        if (this.steps[i].no == currentStep) {
          this.steps[i].completed = true;
          this.isCompleted = this.findStep(currentStep);
        }
      }

      this.saveSteps();
    },
    async saveSteps() {
      const Application = Parse.Object.extend("Application");
      const query = new Parse.Query(Application);
      query.equalTo("objectId", this.application_id);
      var results = await query.first();
      results.set("steps", this.steps);
      results.save().then(
        () => {
          console.log("steps saved!");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async setStatus(data) {
      const status = data;
      const Application = Parse.Object.extend("Application");
      const query = new Parse.Query(Application);
      query.equalTo("objectId", this.application_id);
      var results = await query.first();
      results.set("status", status);
      results.save().then(
        () => {
          console.log("status saved!");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
        this.isCompleted = this.findStep(this.currentStep);
        router.push({
          path: `/application/new/${this.currentStep}/${this.application_id}`,
        });
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.isCompleted = this.findStep(this.currentStep);
        router.push({
          path: `/application/new/${this.currentStep}/${this.application_id}`,
        });
      }
    },
    goToApplication() {
      this.$router.push({ name: "application" });
    },
    checkActive(step) {
      var count = 0;
      for (var i in this.steps) {
        if (this.steps[i].completed == true) {
          count++;
        }
      }
      if (count < 5) {
        count++;
      }
      if (step > count) {
        this.allow = false;
      } else {
        this.allow = true;
      }
    },
    sendEmail(document, title) {
      var date = new Date().toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const params = {
        title: title,
        name: this.hei,
        email: this.hei_email,
        document: document,
        type: "Notification",
        approved: true,
        date: date,
      };
      Parse.Cloud.run("sendEmailNotification", params);
    },
  },
};
</script>

