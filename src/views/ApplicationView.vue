<template>
  <div class="application">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <!-- When application is empty -->
      <div v-if="applications == ''">
        <EmptyState class="mt-20">
          <p class="text-4xl font-bold text-dark-200">No Application Found</p>
          <p class="body-base text-dark-200">
            Get started by creating a new application.
          </p>
          <div class="px-4 mt-10 py-3 sm:px-6 sm:grid sm:grid-cols-2 sm:gap-4">
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
        @createApplication="createApplication"
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
import router from "../router";

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
      newSteps: [
        { no: 1, title: "Enrollment for 1st Semester", completed: false },
        { no: 2, title: "Enrollment for 2nd Semester", completed: false },
        { no: 3, title: "List of Graduates", completed: false },
        { no: 4, title: "Application Complete", completed: false },
      ],
      additionalSteps: [
        { no: 1, title: "Notarized Transmittal Letter", completed: false },
        { no: 2, title: "Proof", completed: false },
        { no: 3, title: "List of Graduates", completed: false },
        { no: 4, title: "Application Complete", completed: false },
      ],
    };
  },

  async created() {
    this.getHeis();
    // get current user
    const user = new Parse.User.current();
    const usertype = user.get("userType");

    var data = [];
    const Applications = Parse.Object.extend("Application");
    const query = new Parse.Query(Applications);
    query.include("heiId");
    query.descending("dateApplied");
    if (usertype == "hei") {
      query.equalTo("heiId", new Parse.Object("_User", { id: user.id }));
    }

    const results = await query.find();

    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      var countGrads = 0;
      // get nstp enrollment
      var NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      var query2 = new Parse.Query(NstpEnrollment);
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
      // if (
      //   object.get("status") == "For Approval" ||
      //   object.get("status") == "Rejected" ||
      //   object.get("status") == "Approved"
      // ) {
      //   await query2.first().then(function (res) {
      //     prog = res.get("nstpId").get("programName");
      //   });
      // }
      query2.exists("nstpId");
      var result = await query2.first();
      var prog = "";
      if (typeof result !== "undefined") {
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

    this.applications = data;
    this.count().then(() => (this.loading = false));

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
      this.getGraduates(object.id).then((nstp) => {
        this.applications.push({
          id: object.id,
          hei_id: object.get("heiId").id,
          hei_name: object.get("heiId").get("name"),
          application_type: object.get("applicationType"),
          program: nstp.prog,
          no_of_graduates: nstp.gradCount,
          date_applied: object.get("dateApplied").toLocaleDateString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          date_approved: object.get("dateApproved"),
          status: object.get("status"),
        });
      });
      this.count();
    });

    applicationSubscription.on("update", (object) => {
      console.log("object updated" + object.id);
      // find
      var index = this.applications.findIndex((app) => app.id == object.id);
      if (index == -1) return;
      // get graduates
      this.getGraduates(object.id).then((nstp) => {
        this.applications[index] = {
          ...this.applications[index],
          hei_id: object.get("heiId").id,
          hei_name: object.get("heiId").get("name"),
          program: nstp.prog,
          no_of_graduates: nstp.gradCount,
          date_approved: object.get("dateApproved"),
          status: object.get("status"),
        };
      });
      this.count();
      console.log(this.applications);
    });

    applicationSubscription.on("enter", (object) => {
      console.log("object entered" + object);
      this.getGraduates(object.id).then((nstp) => {
        this.applications.push({
          id: object.id,
          hei_id: object.get("heiId").id,
          hei_name: object.get("heiId").get("name"),
          application_type: object.get("applicationType"),
          program: nstp.prog,
          no_of_graduates: nstp.gradCount,
          date_applied: object.get("dateApplied").toLocaleDateString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          date_approved: object.get("dateApproved"),
          status: object.get("status"),
        });
      });
      this.count();
    });

    applicationSubscription.on("leave", (object) => {
      console.log("object left" + object);
      // find
      var index = this.applications.findIndex((app) => app.id == object.id);
      if (index == -1) return;
      this.applications.splice(index, 1); //remove the specific object in the array
      this.count();
    });

    applicationSubscription.on("delete", (object) => {
      console.log("object deleted" + object);
      // find
      var index = this.applications.findIndex((app) => app.id == object.id);
      if (index == -1) return;
      this.applications.splice(index, 1); //remove the specific object in the array
      this.count();
    });

    applicationSubscription.on("close", () => {
      console.log("app subscription closed");
    });
  },

  methods: {
    async count() {
      const user = new Parse.User.current();
      const usertype = user.get("userType");

      const Applications = Parse.Object.extend("Application");
      const query = new Parse.Query(Applications);
      if (usertype == "hei") {
        query.equalTo("heiId", new Parse.Object("_User", { id: user.id }));
      }
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
      nstpenrollment.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: appId })
      );
      nstpenrollment.exists("nstpId");
      const result = await nstpenrollment.first();
      // console.log(result);
      var program = "";
      if (typeof result !== "undefined") {
        program = result.get("nstpId").get("programName");
      }
      // if (
      //   result.get("applicationId").get("status") == "For Approval" ||
      //   result.get("applicationId").get("status") == "Rejected" ||
      //   result.get("applicationId").get("status") == "Approved"
      // ) {
      //   program = result.get("nstpId").get("programName");
      // }

      nstpenrollment.exists("serialNumber");
      nstpenrollment.equalTo("isGraduated", true);
      var grads = await nstpenrollment.count();
      // console.log(grads);
      // console.log(program);

      return { gradCount: grads, prog: program };
    },
    toggleModal(type) {
      // get current user
      const user = new Parse.User.current();
      const usertype = user.get("userType");
      this.application_type = type;
      if (usertype == "admin") {
        this.visible = !this.visible;
      } else {
        this.createApplication(user.id);
      }
    },
    async getHeis() {
      // var heiList = [];

      const hei = new Parse.Query(Parse.User);
      hei.equalTo("userType", "hei");
      // const heidata = await hei.find();

      // for (var i = 0; i < heidata.length; i++) {
      //   const object = heidata[i];

      //   heiList.push({
      //     id: object.id,
      //     text: object.get("name"),
      //   });
      // }
      // this.lists = heiList;

      //add subscription PROBLEM: opens new subscriptions when not closed(when to close?)....
      const subscription = await hei.subscribe();
      subscription.on("open", async () => {
        console.log("subscription opened");
        // can get the list here
        const heidata = await hei.find();

        for (var i = 0; i < heidata.length; i++) {
          const object = heidata[i];

          this.lists.push({
            id: object.id,
            text: object.get("name"),
          });
        }
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
    async createApplication(hei) {
      if (this.application_type == "new") {
        //new application

        let currentDate = new Date();

        const Application = Parse.Object.extend("Application");
        const application = new Application();

        application.set("dateApplied", currentDate);
        application.set("status", "1 of 4");
        application.set("steps", this.newSteps);
        application.set("applicationType", "New Application");
        application.set("heiId", new Parse.User({ id: hei }));

        application.save().then(
        async  (application) => {
            const query1 = new Parse.Query(Parse.User);
            query1.equalTo("userType", "admin");
            const result1 = await query1.find({ useMasterKey: true });
            const obj = result1[0];

            if (Parse.User.current().get("userType") == "hei") {
              const notification = new Parse.Object("Notification");
              notification.set("applicationId", application.id);
              notification.set("userId", obj.id);
              notification.set(
                "message",
                Parse.User.current().get("username") +
                  " created a new application with id number " +
                  application.id
              );
              notification.set("routeName", "1stStep");
              notification.set("isRead", false);
              notification.save().then(
                (res) => {
                  console.log(res);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
            router.push({
              name: "1stStep",
              params: { step: 1, application: application.id },
            });
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (this.application_type == "additional") {
        //for additional graduates
        // const dateformat = require("dateformat");
        let currentDate = new Date();
        // var currentDate = dateformat(now, "dddd, mmmm d, yyyy, h:MM TT");

        const Application = Parse.Object.extend("Application");
        const application = new Application();

        application.set("dateApplied", currentDate);
        application.set("status", "1 of 4");
        application.set("steps", this.additionalSteps);
        application.set("applicationType", "For Additional Graduates");
        application.set("heiId", new Parse.User({ id: hei }));

        application.save().then(
        async (application) => {
            const query1 = new Parse.Query(Parse.User);
            query1.equalTo("userType", "admin");
            const result1 = await query1.find({ useMasterKey: true });
            const obj = result1[0];

            if (Parse.User.current().get("userType") == "hei") {
              const notification = new Parse.Object("Notification");
              notification.set("applicationId", application.id);
              notification.set("userId", obj.id);
              notification.set(
                "message",
                Parse.User.current().get("username") +
                  " created additional application with id number " +
                  application.id
              );
              notification.set("routeName", "Step1");
              notification.set("isRead", false);
              notification.save().then(
                (res) => {
                  console.log(res);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
            router.push({
              name: "Step1",
              params: {
                application: application.id,
              },
            });
          },
          (error) => {
            alert(
              "Failed to create new object, with error code: " + error.message
            );
          }
        );
      }
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