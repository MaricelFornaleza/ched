<template>
  <div>
    <div class="relative">
      <button @click="viewNotifications" class="relative z-10 block">
        <BellIcon class="h-6" />
        <div
          v-if="unread != 0"
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
          <li
            class="
              notif-child
              text-center
              flex
              items-center
              justify-center
              font-bold
            "
          >
            <div>Notifications</div>
            <div
              v-if="unread != 0"
              class="
                text-[10px]
                ml-4
                h-5
                w-5
                text-light-100
                justify-center
                flex
                items-center
                rounded-full
                bg-error
              "
            >
              {{ unread }}
            </div>
          </li>

          <li
            v-for="notification in notifData"
            :key="notification.id"
            class="p-4 hover:bg-light-200 cursor-pointer"
            :class="notification.isRead ? 'bg-light-100' : 'bg-light-200'"
            @click="
              openNotification(
                notification.routeName,
                notification.appId,
                notification.id
              )
            "
          >
            <div class="relative w-full">
              <p>
                <b>{{ notification.sender }}</b> {{ notification.action }}
                <b>{{ notification.output }}</b>
              </p>
              <p class="text-xs mt-2">{{ notification.date }}</p>

              <div
                v-if="!notification.isRead"
                class="
                  absolute
                  right-0
                  top-0
                  w-2
                  h-2
                  rounded-full
                  bg-error-dark
                "
              ></div>
            </div>
          </li>

          <li
            v-if="count > 10"
            @click="limit = limit + 5"
            class="notif-child text-center hover:bg-light-200 cursor-pointer"
          >
            See more
          </li>
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
      unread: 0,
      limit: 10,
      count: 0,
    };
  },
  computed: {
    notifData() {
      return this.limit
        ? this.notifications.slice(0, this.limit)
        : this.notifications;
    },
  },
  async mounted() {
    const Notification = Parse.Object.extend("Notification");
    const query = new Parse.Query(Notification);
    if (Parse.User.current().get("userType") == "hei") {
      query.equalTo(
        "receiverId",
        new Parse.User({ id: Parse.User.current().id })
      );
    } else if (Parse.User.current().get("userType") == "admin") {
      query.doesNotExist("receiverId");
    }

    query.include("senderId");
    const result = await query.find({ useMasterKey: true });
    console.log(result);
    this.count = result.length;
    var notification = [];
    for (let i = 0; i < result.length; i++) { 
      const object = result[i];
      notification.push({
        id: object.id,
        sender: object.get("senderId").get("username"),
        action: object.get("action"),
        output: object.get("output"),
        routeName: object.get("routeName"),
        appId: object.get("applicationId").id,
        isRead: object.get("isRead"),
        date: object.get("createdAt").toLocaleDateString("en", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
    }
    this.notifications = notification.slice().reverse();
    query.equalTo("isRead", false);
    this.unread = await query.count();

    const Notif = Parse.Object.extend("Notification");
    const queryApp = new Parse.Query(Notif);
    queryApp.descending("createdAt");
    if (Parse.User.current().get("userType") == "hei") {
      queryApp.equalTo(
        "receiverId",
        new Parse.User({ id: Parse.User.current().id })
      );
    } else if (Parse.User.current().get("userType") == "admin") {
      queryApp.doesNotExist("receiverId");
    }
    const applicationSubscription = await queryApp.subscribe();
    applicationSubscription.on("open", () => {
      console.log("notification subscription opened");
    });
    applicationSubscription.on("create", (object) => {
      this.notifications = this.notifications.slice().reverse();
      console.log("object created" + object);
      this.notifications.push({
        id: object.id,
        sender: object.get("senderId").get("username"),
        action: object.get("action"),
        output: object.get("output"),
        routeName: object.get("routeName"),
        appId: object.get("applicationId").id,
        isRead: object.get("isRead"),
        date: object.get("createdAt").toLocaleDateString("en", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
      this.getUnreadNotifications();
      this.notifications = this.notifications.slice().reverse();
    });
    applicationSubscription.on("update", (object) => {
      this.notifications = this.notifications.slice().reverse();
      console.log("object updated" + object);
      var index = this.notifications.findIndex((app) => app.id == object.id);
      this.notifications[index] = {
        id: object.id,
        sender: object.get("senderId").get("username"),
        action: object.get("action"),
        output: object.get("output"),
        routeName: object.get("routeName"),
        appId: object.get("applicationId").id,
        isRead: object.get("isRead"),
        date: object.get("createdAt").toLocaleDateString("en", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      };
      this.getUnreadNotifications();
      this.notifications = this.notifications.slice().reverse();
    });
    applicationSubscription.on("enter", (object) => {
      this.notifications = this.notifications.slice().reverse();
      console.log("object entered" + object);

      this.notifications.push({
        id: object.id,
        sender: object.get("senderId").get("username"),
        action: object.get("action"),
        output: object.get("output"),
        routeName: object.get("routeName"),
        appId: object.get("applicationId").id,
        isRead: object.get("isRead"),
        date: object.get("createdAt").toLocaleDateString("en", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
      this.getUnreadNotifications();
      this.notifications = this.notifications.slice().reverse();
    });
    applicationSubscription.on("leave", (object) => {
      this.notifications = this.notifications.slice().reverse();
      console.log("object left" + object);
      var index = this.notifications.findIndex((app) => app.id == object.id);
      this.notifications.splice(index, 1);
      this.getUnreadNotifications();
      this.notifications = this.notifications.slice().reverse();
    });
    applicationSubscription.on("delete", (object) => {
      this.notifications = this.notifications.slice().reverse();
      console.log("object left" + object);
      var index = this.notifications.findIndex((app) => app.id == object.id);
      this.notifications.splice(index, 1);
      this.getUnreadNotifications();
      this.notifications = this.notifications.slice().reverse();
    });
    applicationSubscription.on("close", () => {
      console.log("app subscription closed");
    });
  },
  methods: {
    viewNotifications() {
      this.show = !this.show;
    },
    seeMoreNotification() {
      console.log("see more");
      this.seeMore = !this.seeMore;
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
    },
    async getUnreadNotifications() {
      const Notification = Parse.Object.extend("Notification");
      const query = new Parse.Query(Notification);
      if (Parse.User.current().get("userType") == "hei") {
        query.equalTo(
          "receiverId",
          new Parse.User({ id: Parse.User.current().id })
        );
      } else if (Parse.User.current().get("userType") == "admin") {
        query.doesNotExist("receiverId");
      }
      query.equalTo("isRead", false);
      this.unread = await query.count();
    },
  },
};
</script>
<style>
.notif-child {
  padding: 10px;
}
</style>