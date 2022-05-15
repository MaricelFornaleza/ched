<template>
  <div>
    <div class="relative">
      <button @click="viewNotifications" class="relative z-10 block">
        <BellIcon class="h-6" />
        <div
          class="
            absolute
            w-3
            h-3
            z-20
            rounded-full
            bg-error-dark
            top-0
            right-0
            border border-brand-blue
          "
        ></div>
      </button>
      <div
        v-show="show"
        class="
          absolute
          w-96
          right-0
          mt-2
          bg-light-100
          rounded
          shadow-xl
          z-20
          text-dark-300
          border border-light-400
        "
      >
        <ul
          class="
            flex flex-col
            divide-y divide-light-200
            max-h-[500px]
            overflow-y-auto
          "
        >
          <li class="notif-child text-center font-bold">Notifications</li>
          <li
            v-for="notification in notifications"
            :key="notification.id"
            class="p-4 hover:bg-light-200 cursor-pointer"
            :class="notification.isRead ? 'bg-light-100' : 'bg-light-200'"
            @click="openNotification(notification.routeName, notification.appId, notification.id)"
          >  
            {{ notification.message }}
          </li>
          <li class="notif-child text-center">See more</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { BellIcon } from "@heroicons/vue/outline";
import Parse from "parse";
import router from "../router";

export default {
  components: {
    BellIcon,
  },
  data() {
    return {
      show: false,
      notifications: [],
    };
  },
  async mounted() {

    const Notification = Parse.Object.extend("Notification");
    const query = new Parse.Query(Notification);
    query.equalTo("userId", Parse.User.current().id);
    const result = await query.find();
    var notification = [];
    for (let i = 0; i < result.length; i++) {
      const object = result[i];
      notification.push({
        id: object.id,
        message: object.get("message"),
        routeName: object.get("routeName"),
        appId: object.get("applicationId"),
        isRead: object.get("isRead"),
      });
    }
    
    
    const Notif = Parse.Object.extend("Notification");
    const queryApp = new Parse.Query(Notif);
    const applicationSubscription = await queryApp.subscribe();
    applicationSubscription.on("open", () => {
      console.log("notification subscription opened");
    });
    applicationSubscription.on("create", (object) => {
       console.log("object created" + object);
      this.notifications.push({
        id: object.id,
        message: object.get("message"),
        routeName: object.get("routeName"),
        appId: object.get("applicationId"),
        isRead: object.get("isRead"),
      });
    });
    applicationSubscription.on("update", (object) => {
       console.log("object updated" + object);
       var index = this.notifications.findIndex((app) => app.id ==object.id);
      this.notifications[index] = {
        id: object.id,
        message: object.get("message"),
        routeName: object.get("routeName"),
        appId: object.get("applicationId"),
        isRead: object.get("isRead"),
      };
    });
    applicationSubscription.on("enter", (object) => {
       console.log("object entered" + object);

      this.notifications.push({
        id: object.id,
        message: object.get("message"),
        routeName: object.get("routeName"),
        appId: object.get("applicationId"),
        isRead: object.get("isRead"),
      });
    });
    applicationSubscription.on("leave", (object) => {
      console.log("object left" + object);
    var index = this.notifications.findIndex((app) => app.id == object.id);
    this.notifications.splice(index, 1);
    });
    applicationSubscription.on("delete", (object) => {
       console.log("object left" + object);
    var index = this.notifications.findIndex((app) => app.id == object.id);
    this.notifications.splice(index, 1);
    });
    applicationSubscription.on("close", () => {
      console.log("app subscription closed");
    });
    this.notifications = notification.slice().reverse();
  },
  methods: {
    viewNotifications() {
      this.show = !this.show;
    },
    async openNotification(routeName, appId, id) {

      const Notification = Parse.Object.extend("Notification");
      const query = new Parse.Query(Notification);
      query.matches("objectId", id);
      const result = await query.first();

      result.set("isRead", true);
      result.save();

      router.push({
        name: routeName,
        params: {
          application: appId,
        },
      });
      this.show = false;
    }
  }
};
</script>
<style>
.notif-child {
  padding: 10px;
}
</style>