<template>
  <div v-if="loading" class="text-center">Loading...</div>

  <div v-else>
    <!-- When hei is empty -->
    <div v-if="heis == ''">
      <EmptyState class="mt-20">
        <p class="text-4xl font-bold text-dark-200">No HEI Found</p>
        <p class="body-base text-dark-200">
          Get started by creating a new HEI or by uploading an excel file.
        </p>
        <div class="px-4 mt-10 py-3 sm:px-6 sm:grid sm:grid-cols-2 sm:gap-4">
          <router-link to="/hei/new">
            <p
              class="
                inline-flex
                btn-sm btn-outline
                w-full
                justify-center
                items-center
                sm:mb-0
                mb-4
              "
            >
              New HEI
            </p>
          </router-link>
          <router-link to="/hei/upload">
            <p
              class="
                inline-flex
                btn-sm btn-default
                w-full
                justify-center
                items-center
              "
            >
              Upload Excel File
            </p>
          </router-link>
        </div>
      </EmptyState>
    </div>

    <!-- When hei is not empty -->
    <div class="hei h-full w-full flex flex-col" v-else>
      <!-- render empty state if there is no data found -->
      <!-- <EmptyState /> -->
      <div class="w-full text-center p-10">
        <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <simple-widget bgColor="bg-warning-light" textColor="text-warning">
            <template v-slot:icon><LibraryIcon class="h-8" /></template>
            <template v-slot:count>{{ countSUC }}</template>
            <template v-slot:label>State Universities and Colleges</template>
          </simple-widget>
          <simple-widget bgColor="bg-info-light" textColor="text-info">
            <template v-slot:icon><LibraryIcon class="h-8" /></template>
            <template v-slot:count>{{ countLUC }}</template>
            <template v-slot:label>Local Universities and Colleges</template>
          </simple-widget>
          <simple-widget bgColor="bg-success-light" textColor="text-success">
            <template v-slot:icon><LibraryIcon class="h-8" /></template>
            <template v-slot:count>{{ countPrivate }}</template>
            <template v-slot:label>Private</template>
          </simple-widget>
          <simple-widget bgColor="bg-error-light" textColor="text-error">
            <template v-slot:icon><LibraryIcon class="h-8" /></template>
            <template v-slot:count>{{ countOGS }}</template>
            <template v-slot:label>Other Government Schools</template>
          </simple-widget>
        </div>
      </div>
      <!-- alert message -->
      <div class="w-fit mx-10">
        <AlertWidget :className="alert.className">
          {{ alert.msg }}
        </AlertWidget>
      </div>

      <!-- dataTables  -->
      <div>
        <hei-data-table
          :heis="heis"
          :table_headers="table_headers"
          @displayAlert="displayAlert"
        >
          <template v-slot:button>
            <div class="flex flex-col">
              <button
                id="dropdownButton"
                @click="dropdownToggle()"
                class="
                  w-fit
                  ml-auto
                  text-light-100
                  bg-brand-blue
                  hover:bg-blue-800
                  focus:ring-4 focus:ring-blue-300
                  font-medium
                  rounded-sm
                  text-sm
                  px-4
                  py-2
                  text-center
                  inline-flex
                  items-center
                  dark:bg-blue-600
                  dark:hover:bg-blue-700
                  dark:focus:ring-blue-800
                "
                type="button"
              >
                Add HEI
                <ChevronDownIcon class="ml-2 h-5" />
              </button>

              <!-- Dropdown menu -->
              <div
                v-show="dropdown"
                class="
                  z-10
                  w-auto
                  text-base
                  list-none
                  bg-light-100
                  rounded
                  divide-y divide-gray-100
                  shadow
                  dark:bg-gray-700
                "
              >
                <ul class="py-1" aria-labelledby="dropdownButton">
                  <li>
                    <router-link to="/hei/new"
                      ><p class="block py-2 px-4 text-sm hover:bg-light-300">
                        New HEI
                      </p></router-link
                    >
                  </li>
                  <li>
                    <router-link to="/hei/upload"
                      ><p class="block py-2 px-4 text-sm hover:bg-light-300">
                        Upload Excel File
                      </p></router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </hei-data-table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import SimpleWidget from "@/partials/SimpleWidget.vue";
import EmptyState from "@/components/EmptyState.vue";
import { LibraryIcon } from "@heroicons/vue/solid";
import HeiDataTable from "@/partials/HeiDataTable.vue";
import { ChevronDownIcon } from "@heroicons/vue/outline";
import Parse from "parse";
import AlertWidget from "@/partials/AlertWidget.vue";

export default {
  name: "HEIView",

  data() {
    return {
      empty: false,
      dropdown: false,
      loading: true,
      alert: { className: "", msg: "" },
      table_headers: [
        { title: "Institutional Code" },
        { title: "HEI Name" },
        { title: "Type" },
        { title: "Email" },
        { title: "Address" },
      ],
      heis: [],
      countSUC: 0,
      countLUC: 0,
      countPrivate: 0,
      countOGS: 0,
    };
  },

  methods: {
    dropdownToggle() {
      this.dropdown = !this.dropdown;
    },
    displayAlert(status, msg) {
      this.alert.className = "alert-" + status;
      this.alert.msg = msg;
      console.log("success");
    },
    async count() {
      const query = new Parse.Query(Parse.User);
      query.equalTo("userType", "hei");
      query.equalTo("type", "LUC");
      this.countLUC = await query.count();
      query.equalTo("type", "SUC");
      this.countSUC = await query.count();
      query.equalTo("type", "PRIVATE");
      this.countPrivate = await query.count();
      query.equalTo("type", "OGS");
      this.countOGS = await query.count();
    },
  },
  async created() {
    this.alert.className = "alert-" + this.$route.query.status;
    this.alert.msg = this.$route.query.msg;

    var hei = [];
    const query = new Parse.Query(Parse.User);
    query.descending("username");
    query.equalTo("userType", "hei");

    const result = await query.find({ useMasterKey: true });
    for (let i = 0; i < result.length; i++) {
      const object = result[i];
      hei.push({
        id: object.id,
        institutional_code: object.get("institutionalCode"),
        hei_name: object.get("name"),
        hei_username: object.get("username"),
        hei_type: object.get("type"),
        email: object.get("email"),
        address: object.get("address"),
      });
    }
    this.heis = hei;
    this.count().then(() => (this.loading = false));

    const subscription = await query.subscribe();
    subscription.on("open", () => {
      console.log("hei subscription opened");
      // can get the list here
    });

    subscription.on("create", (object) => {
      console.log("object created" + object);

      this.count();
      this.heis.push({
        id: object.id,
        institutional_code: object.get("institutionalCode"),
        hei_name: object.get("name"),
        hei_username: object.get("username"),
        hei_type: object.get("type"),
        email: object.get("email"),
        address: object.get("address"),
      });
    });

    subscription.on("update", (object) => {
      console.log("object updated" + object);

      this.count();
      // find
      var index = this.heis.findIndex((hei) => hei.id == object.id);
      // get graduates
      this.heis[index] = {
        ...this.heis[index],
        institutional_code: object.get("institutionalCode"),
        hei_name: object.get("name"),
        hei_username: object.get("username"),
        hei_type: object.get("type"),
        email: object.get("email"),
        address: object.get("address"),
      };
    });

    subscription.on("enter", (object) => {
      console.log("object entered" + object);

      this.count();
      this.heis.push({
        id: object.id,
        institutional_code: object.get("institutionalCode"),
        hei_name: object.get("name"),
        hei_username: object.get("username"),
        hei_type: object.get("type"),
        email: object.get("email"),
        address: object.get("address"),
      });
    });

    subscription.on("leave", (object) => {
      console.log("object left" + object);

      this.count();
      // find
      var index = this.heis.findIndex((app) => app.id == object.id);
      this.heis.splice(index, 1); //remove the specific object in the array
    });

    subscription.on("delete", (object) => {
      console.log("object deleted" + object);

      this.count();
      // find
      var index = this.heis.findIndex((app) => app.id == object.id);
      this.heis.splice(index, 1); //remove the specific object in the array
    });

    subscription.on("close", () => {
      console.log("hei subscription closed");
    });
  },
  components: {
    EmptyState,
    SimpleWidget,
    LibraryIcon,
    HeiDataTable,
    AlertWidget,

    ChevronDownIcon,
  },
};
</script>