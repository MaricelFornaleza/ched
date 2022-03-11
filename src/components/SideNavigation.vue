<template>
  <div>
    <aside
      class="
        w-72
        h-screen
        overflow-y-auto
        sticky
        top-0
        bg-dark-300
        text-light-100
      "
      :class="open ? 'open-side-bar' : ''"
      aria-label="Sidebar"
    >
      <div class="py-4 px-3 pt-24 rounded">
        <div class="time text-center flex-col flex gap-2 mb-20">
          <div class="uppercase text-sm font-semibold tracking-wider">
            Philippine Standard Time
          </div>
          <div class="text-4xl font-bold uppercase tracking-wider">
            04:29:22 pm
          </div>
          <div class="text-sm font-light tracking-wider">
            12 February 2022 Saturday
          </div>
        </div>
        <ul class="space-y-4">
          <nav-tabs @click="toggleSideBar">
            <HomeIcon class="h-6" />
            <span class="ml-3 label">Home</span>
          </nav-tabs>
          <nav-tabs>
            <LibraryIcon class="h-6" />
            <span class="ml-3 label">HEI</span>
          </nav-tabs>
          <nav-tabs>
            <DocumentTextIcon class="h-6" />
            <span class="ml-3 label">Application</span>
          </nav-tabs>
          <li class="label px-3 uppercase font-light label-s tracking-wide">
            Reports
          </li>
          <nav-tabs>
            <AcademicCapIcon class="h-6" />
            <span class="ml-3 label">Summary of Enrollment</span>
          </nav-tabs>
          <nav-tabs>
            <AcademicCapIcon class="h-6" />
            <span class="ml-3 label">Summary of Graduates</span>
          </nav-tabs>
          <nav-tabs>
            <QrcodeIcon class="h-6" />
            <span class="ml-3 label">Serial Numbers</span>
          </nav-tabs>
          <nav-tabs>
            <DocumentTextIcon class="h-6" />
            <span class="ml-3 label">Report Summary</span>
          </nav-tabs>
        </ul>
      </div>
      <div
        class="
          copyright
          bottom-0
          p-5
          bg-[#212837]
          absolute
          w-full
          gap-2
          flex flex-col
        "
      >
        <p class="text-sm text-gray-700 tracking-wider">
          NSTP Serial Number Application and Issuance System
        </p>
        <p class="text-xs font-bold text-dark-100 tracking-wide">
          &copy; 2022 Copyright CHEDRO5
        </p>
      </div>
    </aside>
  </div>
</template>

<script>
import {
  HomeIcon,
  LibraryIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  QrcodeIcon,
} from "@heroicons/vue/outline";
import NavTabs from "@/partials/NavTabs.vue";
export default {
  name: "SideNavigation",
  components: {
    HomeIcon,
    LibraryIcon,
    DocumentTextIcon,
    AcademicCapIcon,
    QrcodeIcon,
    NavTabs,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleSideNavigation() {
      this.open = !this.open;
    },
  },
};
</script>
<style>
.open-side-bar {
  width: auto;
  transition: all 0.5s ease-in-out;
}
.open-side-bar .label,
.open-side-bar .time,
.open-side-bar .copyright {
  display: none;
}
</style>