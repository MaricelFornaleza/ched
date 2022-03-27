<template>
  <div>
    <div>
      <serial-number-data-table
        :applications="applications"
        :table_headers="table_headers"
      >
      </serial-number-data-table>
    </div>
  </div>
</template>

<script>
import SerialNumberDataTable from "@/partials/SerialNumberDataTable.vue";
export default {
  components: {
    SerialNumberDataTable,
  },
  data() {
    return {
      table_headers: [
        { title: "HEI Name" },
        { title: "Application Type" },
        { title: "Serial Number Range" },
        { title: "No. of Graduates" },
        { title: "Date Approved" },
      ],
      applications: [
        {
          id: 1,
          hei_name: "Ateneo de Naga University",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 2,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 3,
          hei_name: "Naga College Foundation, Inc",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 4,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 5,
          hei_name: "Ateneo de Naga University",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 6,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 7,
          hei_name: "Naga College Foundation, Inc",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 8,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
      ],
    };
  },
};
</script>
