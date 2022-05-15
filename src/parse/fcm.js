import Parse from "parse";

var fcm = {
  send(args = {}) {
    return Parse.Cloud.run('sendFCMNotification', args);
  },
};

export { fcm };
 