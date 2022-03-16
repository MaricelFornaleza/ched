<template>
  <div class="flex">
    <div class="stepper z-50 active">Step 1</div>
    <div class="stepper z-40">Step 2</div>
    <div class="stepper z-30">Step 3</div>
    <div class="stepper z-20 active">Step 4</div>
    <div class="stepper z-10">Step 5</div>
  </div>
</template>
<style>
.stepper {
  position: relative;
  width: 200px;
  height: 60px;
  margin-left: 0;
  color: theme("colors.dark.300");
  background-color: theme("colors.light.100");
  text-align: center;
  line-height: 60px;
}
.active {
  background-color: theme("colors.dark.100") !important;
  color: theme("colors.light.100");
}
.active:after {
  border-left: 20px solid theme("colors.dark.100") !important;
}

.stepper:after {
  content: "";
  position: absolute;
  left: 100%;
  top: 0px;
  width: 0px;
  height: 0px;
  border-top: 30px solid transparent;

  border-left: 20px solid theme("colors.light.100");
  border-bottom: 30px solid transparent;
}
.stepper:nth-of-type(5)::after {
  border-left: 0px;
}
</style>