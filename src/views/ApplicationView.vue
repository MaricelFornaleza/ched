<template>
  <div class="application">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <!-- When application is empty -->
      <div v-if="applications == ''">
        <EmptyState>
          <p class="text-4xl font-medium text-dark-300">No Applications</p>
          <p class="body-l text-dark-200">
            Get started by creating a new application
          </p>
          <div class="px-4 mb-4 py-3 sm:px-6 sm:grid sm:grid-cols-2 sm:gap-4">
            <button
              typ="button"
              @click="toggleModal('new')"
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
              New Application
            </button>
            <button
              typ="button"
              @click="toggleModal('additional')"
              class="
                inline-flex
                btn-sm btn-default
                w-full
                justify-center
                items-center
              "
            >
              For Additional Graduates
            </button>
          </div>
        </EmptyState>
      </div>

      <!-- When application is not empty -->
      <div class="hei h-full w-full flex flex-col" v-else>
        <!-- render empty state if there is no data found -->
        <!-- <EmptyState /> -->
        <div class="w-full text-center p-10">
          <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            <simple-widget bgColor="bg-warning-light" textColor="text-warning">
              <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
              <template v-slot:count>{{ for_approval }}</template>
              <template v-slot:label>For Approval</template>
            </simple-widget>
            <simple-widget bgColor="bg-success-light" textColor="text-success">
              <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
              <template v-slot:count>{{ approved }}</template>
              <template v-slot:label>Approved</template>
            </simple-widget>
            <simple-widget bgColor="bg-error-light" textColor="text-error">
              <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
              <template v-slot:count>{{ rejected }}</template>
              <template v-slot:label>Rejected</template>
            </simple-widget>
            <simple-widget bgColor="bg-info-light" textColor="text-info">
              <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
              <template v-slot:count>{{ total_applications }}</template>
              <template v-slot:label>Total Applications</template>
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
          <ApplicationDataTable
            :applications="applications"
            :table_headers="table_headers"
            @displayAlert="displayAlert"
          >
            <ul class="py-1" aria-labelledby="dropdownButton">
              <li>
                <div
                  @click="toggleModal('new')"
                  class="
                    block
                    cursor-pointer
                    py-2
                    px-4
                    text-sm
                    hover:bg-light-300
                  "
                >
                  New Application
                </div>
              </li>
              <li>
                <div
                  @click="toggleModal('additional')"
                  class="
                    block
                    cursor-pointer
                    py-2
                    px-4
                    text-sm
                    hover:bg-light-300
                  "
                >
                  For Additional Graduates
                </div>
              </li>
            </ul>
          </ApplicationDataTable>
        </div>
      </div>

      <ModalHei
        v-show="visible"
        :lists="lists"
        :application_type="application_type"
        @close="toggleModal('')"
      />
    </div>
  </div>
</template>


<script>
import SimpleWidget from "@/partials/SimpleWidget.vue";
import EmptyState from "@/components/EmptyState.vue";
import { DocumentTextIcon } from "@heroicons/vue/solid";
import ApplicationDataTable from "@/partials/ApplicationDataTable.vue";
import ModalHei from "@/partials/ModalHei.vue";
import AlertWidget from "@/partials/AlertWidget.vue";
import Parse from "parse";

export default {
  name: "ApplicationView",
  data() {
    return {
      alert: {},
      loading: true,
      empty: true,
      visible: false,
      lists: [],
      application_type: "",
      applications: [],
      table_headers: [
        { title: "HEI Name", key: 0 },
        { title: "Application Type", key: 1 },
        { title: "NSTP Program", key: 2 },
        { title: "Graduates", key: 3 },
        { title: "Date Applied", key: 4 },
        { title: "Date Approved", key: 5 },
        { title: "Status", key: 6 },
      ],
      for_approval: 0,
      approved: 0,
      rejected: 0,
      total_applications: 0,
      status: "",
      message: "",
    };
  },

  async mounted() {
    this.getHeis();
    var data = [];
    const Applications = Parse.Object.extend("Application");
    const query = new Parse.Query(Applications);
    query.include("heiId");
    query.descending("dateApplied");

    const results = await query.find();
    // get nstp enrollment
    const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
    var query2 = new Parse.Query(NstpEnrollment);

    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      var countGrads = 0;
      var prog = "";
      query2.matches("applicationId", object.id);
      query2.include("nstpId");
      await query2.find().then(function (res) {
        for (let x = 0; x < res.length; x++) {
          if (
            typeof res[x].get("serialNumber") !== "undefined" &&
            res[x].get("isGraduated")
          )
            countGrads++;
        }
      });
      if (
        object.get("status") == "For Approval" ||
        object.get("status") == "Rejected" ||
        object.get("status") == "Approved"
      ) {
        await query2.first().then(function (res) {
          prog = res.get("nstpId").get("programName");
        });
      }

      data.push({
        id: object.id,
        hei_id: object.get("heiId").id,
        hei_name: object.get("heiId").get("name"),
        application_type: object.get("applicationType"),
        program: prog,
        no_of_graduates: countGrads,
        date_applied: object.get("dateApplied").toLocaleDateString("en", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        date_approved: object.get("dateApproved"),
        status: object.get("status"),
      });
    }

    this.count();
    this.applications = data;
    this.loading = false;

    // add subscription here
    // for applications, use the id to find the data
    //add subscription PROBLEM: opens new subscriptions when not closed(when to close?)....
    const App = Parse.Object.extend("Application");
    const queryApp = new Parse.Query(App);
    const applicationSubscription = await queryApp.subscribe();
    applicationSubscription.on("open", () => {
      console.log("app subscription opened");
      // can get the list here
    });

    applicationSubscription.on("create", (object) => {
      console.log("object created" + object);
    });

    applicationSubscription.on("update", (object) => {
      console.log("object updated" + object);
      // find
      var index = this.applications.findIndex((app) => app.id == object.id);
      // get graduates
      this.getGraduates(object.id).then((nstp) => {
        this.applications[index] = {
          ...this.applications[index],
          hei_id: object.id,
          hei_name: object.get("heiId").get("name"),
          program: nstp.prog,
          no_of_graduates: nstp.gradCount,
          date_approved: object.get("dateApproved"),
          status: object.get("status"),
        };
      });
      this.count();
    });

    applicationSubscription.on("enter", (object) => {
      console.log("object entered" + object);
    });

    applicationSubscription.on("leave", (object) => {
      console.log("object left" + object);
      // find
      var index = this.applications.findIndex((app) => app.id == object.id);
      this.applications.splice(index, 1); //remove the specific object in the array
    });

    applicationSubscription.on("delete", (object) => {
      console.log("object deleted" + object);
      // find
      var index = this.applications.findIndex((app) => app.id == object.id);
      this.applications.splice(index, 1); //remove the specific object in the array
    });

    applicationSubscription.on("close", () => {
      console.log("app subscription closed");
    });
  },

  methods: {
    async count() {
      const Applications = Parse.Object.extend("Application");
      const query = new Parse.Query(Applications);
      this.total_applications = await query.count();
      query.equalTo("status", "For Approval");
      this.for_approval = await query.count();
      query.equalTo("status", "Approved");
      this.approved = await query.count();
      query.equalTo("status", "Rejected");
      this.rejected = await query.count();
    },
    async getGraduates(appId) {
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const nstpenrollment = new Parse.Query(NstpEnrollment);
      nstpenrollment.include("applicationId");
      nstpenrollment.include("nstpId");
      const result = await nstpenrollment.first();
      var program = "";
      if (
        result.get("applicationId").get("status") == "For Approval" ||
        result.get("applicationId").get("status") == "Rejected" ||
        result.get("applicationId").get("status") == "Approved"
      ) {
        program = result.get("nstpId").get("programName");
      }

      nstpenrollment.equalTo(
        "applicationId", 
        new Parse.Object("Application", { id: appId })
      );
      nstpenrollment.exists("serialNumber");
      nstpenrollment.equalTo("isGraduated", true);
      var grads = await nstpenrollment.count();
      // console.log(grads);
      // console.log(program);

      return { gradCount: grads, prog: program };
    },
    toggleModal(type) {
      this.visible = !this.visible;
      this.application_type = type;
    },
    async getHeis() {
      var heiList = [];

      const hei = new Parse.Query(Parse.User);
      hei.equalTo("userType", "hei");
      const heidata = await hei.find();

      for (var i = 0; i < heidata.length; i++) {
        const object = heidata[i];

        heiList.push({
          id: object.id,
          text: object.get("name"),
        });
      }
      this.lists = heiList;

      //add subscription PROBLEM: opens new subscriptions when not closed(when to close?)....
      const subscription = await hei.subscribe();
      subscription.on("open", () => {
        console.log("subscription opened");
        // can get the list here
      });

      subscription.on("create", (object) => {
        console.log("object created" + object);
        this.lists.push({
          id: object.id,
          text: object.get("name"),
        });
      });

      subscription.on("update", (object) => {
        console.log("object updated" + object);
        // find
        var index = this.lists.findIndex((hei) => hei.id == object.id);
        if (this.lists[index].text != object.get("name")) {
          this.lists[index] = {
            ...this.lists[index],
            text: object.get("name"),
          };
          // searches for the hei in all applications
          for (let i = 0; i < this.applications.length; i++) {
            const element = this.applications[i];
            if (element.hei_id == object.id) {
              this.applications[i] = {
                ...this.applications[i],
                hei_name: object.get("name"),
              };
            }
          }
        }
        console.log(this.lists);
        console.log(this.applications);
      });

      subscription.on("enter", (object) => {
        console.log("object entered" + object);
        this.lists.push({
          id: object.id,
          text: object.get("name"),
        });
      });

      subscription.on("leave", (object) => {
        console.log("object left" + object);
        // find
        var index = this.lists.findIndex((hei) => hei.id == object.id);
        this.lists.splice(index, 1); //remove the specific object in the array
      });

      subscription.on("delete", (object) => {
        console.log("object deleted" + object);
        // find
        var index = this.lists.findIndex((hei) => hei.id == object.id);
        this.lists.splice(index, 1); //remove the specific object in the array
      });

      subscription.on("close", () => {
        console.log("subscription closed");
      });
    },
    displayAlert(status, msg) {
      this.alert.className = "alert-" + status;
      this.alert.msg = msg;
      console.log("success");
    },
  },

  components: {
    EmptyState,
    SimpleWidget,
    DocumentTextIcon,
    ApplicationDataTable,
    ModalHei,
    AlertWidget,
  },
};
</script>