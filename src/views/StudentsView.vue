<template>
  <div>
    <div class="p-10">
      <div class="pb-5">
        <div class="uppercase">Ateneo de Naga University</div>
        <div class="flex space-x-2 text-sm">
          <span>2021 - 2022</span>
          <span> | 1st Semester</span>
        </div>
      </div>
      <view-students-datatable :students="students"></view-students-datatable>
    </div>
  </div>
</template>
<script>
import ViewStudentsDatatable from "@/partials/ViewStudentsDatatable.vue";
import students from "@/assets/json/students.json";
export default {
  components: {
    ViewStudentsDatatable,
  },
  data() {
    return {
      students,
    };
  },
};
</script>