<template>
  <div>
    <div class="flex">
      <TopNavigation class="z-40" />
      <sidebar-menu
        :menu="menu"
        class="z-10"
        @update:collapsed="toggle"
        v-model="collapsed"
      >
        <template v-slot:header>
          <div class="text-light-100" :class="collapsed ? '' : 'hidden'">
            <TimeDisplay />
          </div>
        </template>
        <template v-slot:toggle-icon><MenuIcon class="h-7" /></template>
        <template v-slot:footer
          ><div
            class="copyright p-5 bg-[#212837]"
            :class="collapsed ? '' : 'hidden'"
          >
            <p class="text-sm text-light-100 tracking-wider mb-2">
              NSTP Serial Number Application and Issuance System
            </p>
            <p class="text-xs font-bold text-dark-100 tracking-wide">
              &copy; 2022 Copyright CHEDRO5
            </p>
          </div></template
        >
      </sidebar-menu>
      <div
        class="w-full content"
        :class="
          collapsed
            ? 'pl-[290px]  transition-width duration-300'
            : 'pl-[65px] transition-width duration-300'
        "
      >
        <div class="breadcrumbs mt-14 w-full bg-light-100 p-3 fixed shadow-sm">
          <ul class="flex space-x-3 text-sm">
            <li
              class="list space-x-3 cursor-pointer"
              v-for="(breadcrumb, idx) in breadcrumbs"
              :key="idx"
              @click="routeTo(idx)"
            >
              <span class="name">{{ breadcrumb.name }}</span>
              <span class="separator">/</span>
            </li>
          </ul>
        </div>
        <div class="main-content h-screen pt-28">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.list {
  color: theme("colors.dark.100");
}
.list:last-child .name {
  font-weight: 600;
  color: theme("colors.dark.300");
}
.list:last-child .separator {
  display: none;
}
.v-sidebar-menu {
  z-index: 10;
  padding-top: 100px;
  background-color: theme("colors.dark.300");
}
.v-sidebar-menu .vsm--scroll {
  width: calc(100% + 29px);
}
.v-sidebar-menu .vsm--toggle-btn {
  width: auto;
  height: auto;
  padding: 10px;
  right: 0;
  position: absolute;
  top: 55px;
  background-color: transparent;
}
.v-sidebar-menu.vsm_collapsed .vsm--toggle-btn {
  left: 0;
}
.v-sidebar-menu .vsm--link {
  margin-top: 10px;
  margin-bottom: 10px;
}
.v-sidebar-menu .vsm--link_active {
  background-color: theme("colors.dark.200");
  box-shadow: none !important;
}
.v-sidebar-menu .vsm--mobile-bg {
  background-color: #212837 !important;
}
.v-sidebar-menu .vsm--link_level-1 .vsm--icon {
  background-color: transparent;
}
.v-sidebar-menu.vsm_collapsed .vsm--link_level-1.vsm--link_hover .vsm--icon {
  background-color: transparent;
}
.hide {
  left: -100%;
  transition: all 0.5s ease-in-out;
}
</style>
<script>
import TopNavigation from "@/components/TopNavigation.vue";
import TimeDisplay from "@/partials/TimeDisplay.vue";
import { SidebarMenu } from "vue-sidebar-menu";
import { MenuIcon } from "@heroicons/vue/outline";
import home from "@/assets/sidebar_icons/home.svg";
import hei from "@/assets/sidebar_icons/hei.svg";
import file from "@/assets/sidebar_icons/file.svg";
import cap from "@/assets/sidebar_icons/cap.svg";
import code from "@/assets/sidebar_icons/code.svg";
import report from "@/assets/sidebar_icons/report.svg";
import userIcon from "@/assets/sidebar_icons/user.svg";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import Parse from "parse";
export default {
  name: "ViewLayout",
  components: {
    TopNavigation,
    SidebarMenu,
    MenuIcon,
    TimeDisplay,
  },

  data() {
    return {
      collapsed: true,
      breadcrumbs: [],
      menu: [],
      usertype: null,
    };
  },
  watch: {
    $route() {
      this.updateList();
    },
  },
  mounted() {
    this.updateList();
    this.getMenu();
  },

  methods: {
    getMenu() {
      const user = new Parse.User.current();
      this.usertype = user.get("userType");
      const id = user.id;
      if (this.usertype == "admin") {
        this.menu = [
          {
            href: "/home",
            title: "Home",
            icon: {
              element: "img",
              attributes: { src: home },
            },
          },

          {
            href: "/hei",
            title: "HEI",
            icon: {
              element: "img",
              attributes: { src: hei },
            },
          },
          {
            href: "/application",
            title: "Application",
            icon: {
              element: "img",
              attributes: { src: file },
            },
          },
          {
            header: "Reports",
            hiddenOnCollapse: true,
          },
          {
            href: "/enrollment",
            title: "Summary of Enrollment",
            icon: {
              element: "img",
              attributes: { src: cap },
            },
          },
          {
            href: "/graduates",
            title: "Summary of Graduates",
            icon: {
              element: "img",
              attributes: { src: cap },
            },
          },
          {
            href: "/serial-numbers",
            title: "Serial Numbers",
            icon: {
              element: "img",
              attributes: { src: code },
            },
          },
          {
            href: "/report-summary",
            title: "Report Summary",
            icon: {
              element: "img",
              attributes: { src: report },
            },
          },
        ];
      } else if (this.usertype == "hei") {
        this.menu = [
          {
            href: "/application",
            title: "Application",
            icon: {
              element: "img",
              attributes: { src: file },
            },
          },
          {
            header: "Reports",
            hiddenOnCollapse: true,
          },
          {
            href: "/hei/graduates",
            title: "Summary of Graduates",
            icon: {
              element: "img",
              attributes: { src: cap },
            },
          },
          {
            header: "Account Settings",
            hiddenOnCollapse: true,
          },
          {
            href: "/my-account/edit/" + id,
            title: "My Account",
            icon: {
              element: "img",
              attributes: { src: userIcon },
            },
          },
        ];
      }
      console.log(this.usertype);
    },
    updateList() {
      this.breadcrumbs = this.$route.meta.breadcrumb;
    },
    toggle() {
      this.collapsed = !this.collapsed;
    },
    routeTo(pRouteTo) {
      if (this.breadcrumbs[pRouteTo].link) {
        this.$router.push(this.breadcrumbs[pRouteTo].link);
      }
    },
  },
};
</script>
