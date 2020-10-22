import consumer from "./consumer";


const inbox = document.getElementById('inbox-notifications');
const current_user_id = inbox.getAttribute('data-current-user-id');
const inboxMainMessagesId = "main-message-window";

function notification(sender, message) {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    var notification = new Notification(`${sender}: ${message}`);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        var notification = new Notification(`${sender}: ${message}`);
      }
    });
  }
}

function appendToRecipientMessages(data) {
  const messagesWindow = document.getElementById(inboxMainMessagesId);
  if (messagesWindow != null) {
    const message = `
<div class="flex mb-2 justify-start">
  <div class="rounded py-2 px-3 bg-gray-300">
    <p class="text-sm mt-1"> ${ data["message"] } </p>
    <p class="text-right text-xs text-gray-500 mt-1"> ${ data["timestamp"] } </p>
  </div>
</div>
`;
    messagesWindow.insertAdjacentHTML('afterbegin', message);
  }

}

document.addEventListener("DOMContentLoaded", function(){
  console.log("Setup notifications for user #", current_user_id);

  consumer.subscriptions.create({ channel: "conversate", room_id: current_user_id }, {
    received(data) {
      if (data.to_id === current_user_id || data.from_id == current_user_id) {
        document.getElementById('notificationsBell').style.display = "block";
        if (data.to_id == current_user_id) {
          notification(data.sender_name, data.message);
        }
        if (window.location.pathname.startsWith("/inbox") && data.to_id == current_user_id) {
          const room = document.getElementById('new-chat-message');
          const sentTo = room.getAttribute('data-to-id');
          if (sentTo == data.from_id) {
            appendToRecipientMessages(data);
          }
        }
      }
    }
  });
});

