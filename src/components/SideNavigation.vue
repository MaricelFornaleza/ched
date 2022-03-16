<template>
  <div>
    <aside
      class="
        w-screen
        inset-y-0
        xs:w-2/3
        sm:w-1/2
        lg:h-screen lg:w-72
        overflow-y-auto
        fixed
        lg:sticky
        top-0
        bg-dark-300
        text-light-100
        transition-width
        duration-500
      "
      :class="open ? 'close-side-bar ' : 'open-side-bar'"
      aria-label="Sidebar"
    >
      <div class="py-4 px-3 pt-24 rounded">
        <div
          class="time lg:block text-center flex-col flex gap-2 mb-10 lg:mb-20"
        >
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
          w-full
          gap-2
          flex flex-col
          lg:absolute
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
.drawer {
  width: 0px;
  transition: width 0.5s ease-in-out;
}

.open-side-bar {
  width: 0px;
  transition: width 0.5s ease-in-out;
}
@media (min-width: 640px) {
  .open-side-bar {
    width: 18rem;
    transition: width 0.5s ease-in-out;
  }
  .close-side-bar {
    width: 90px;
  }
  .close-side-bar .label,
  .close-side-bar .time,
  .close-side-bar .copyright {
    opacity: 0;
    display: none;
    transition: all 0.5s ease-in-out;
  }
  .label,
  .time,
  .copyright {
    transition: opacity 0.5s ease-in-out;
    transition-delay: 100ms;
  }
}
@media (max-width: 639px) {
  .close-side-bar .label,
  .close-side-bar .time,
  .close-side-bar .copyright {
    opacity: 100%;
    display: block;
    transition: all 0.5s ease-in-out;
  }
}
</style>