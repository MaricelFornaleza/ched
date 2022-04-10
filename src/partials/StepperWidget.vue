<template>
  <div class="flex border border-light-200 border-2">
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
                border border-2
                h-10
                w-10
              "
              :class="[
                currentStep === step.no
                  ? 'bg-brand-blue border-brand-blue text-light-100'
                  : 'border-light-400',
                step.completed ? 'border-light-100' : '',
              ]"
            >
              {{ step.no }}
            </div>
            <div class="text-xs text-left">
              <div class="uppercase font-bold">Step {{ step.no }}</div>
              <div class="hidden lg:block">{{ step.title }}</div>
            </div>
          </div>
        </div>
  </div>
  <!-- <div class="flex my-10 justify-center space-x-5">
        <button
          @click="previousStep"
          class="btn-sm border border-2 border-light-300"
        >
          Cancel
        </button>
        <button @click="nextStep" class="btn-sm text-light-100 bg-brand-blue">
          Next
        </button>
        <button
          @click="completeStep(currentStep)"
          class="btn-sm text-light-100 bg-brand-blue"
        >
          Complete this step
        </button>
  </div> -->
</template>
<script>
export default {
  data() {
    return {
      currentStep: this.current,
    };
  },
  props: ['current','steps'],
  methods: {
    activeStep(step) {
      this.currentStep = step;
      // this.$emit("update-step", step);
    },
    completeStep(currentStep) {
      this.steps.forEach((step) => {
        if (step.no === currentStep) {
          step.completed = true;
        }
      });
      if (this.currentStep < 5) {
        this.currentStep++;
      }
    },
    nextStep() {
      if (this.currentStep < 5) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
  },
  components: {},
};
</script>


<style>
.step {
  position: relative;
  width: 20%;
  height: 100px;
  margin-left: 0;
  color: theme("colors.dark.300");
  background-color: theme("colors.light.200");
  text-align: center;
}

.step:after {
  content: "";
  position: absolute;
  left: 100%;
  top: 0px;
  width: 0px;
  height: 0px;
  border-top: 50px solid transparent;
  border-left: 20px solid theme("colors.light.200");
  border-bottom: 50px solid transparent;
}
.step:nth-of-type(1) {
  z-index: 5;
}
.step:nth-of-type(2) {
  z-index: 4;
  padding-left: 25px;
}
.step:nth-of-type(3) {
  z-index: 3;
  padding-left: 25px;
}
.step:nth-of-type(4) {
  z-index: 2;
  padding-left: 25px;
}
.step:nth-of-type(5) {
  z-index: 1;
  padding-left: 25px;
}

.active {
  background-color: theme("colors.light.100");
  color: theme("colors.brand.blue");
}
.active:after {
  border-left: 20px solid theme("colors.light.100");
}
.completed {
  background-color: theme("colors.brand.blue");
  color: theme("colors.light.100");
}
.completed:after {
  border-left: 20px solid theme("colors.brand.blue");
}

.step:nth-of-type(5):after,
.completed:nth-of-type(5):after {
  border-left: 0px !important;
}
</style> 