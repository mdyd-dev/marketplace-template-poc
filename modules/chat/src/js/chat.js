import consumer from "./consumer";

document.addEventListener("DOMContentLoaded", function(){
  const room = document.getElementById('room');
  var roomName;
  var userId;
  var recipientId;
  var userName;

  if (room != null) {
    roomName = room.getAttribute('data-room-name');
    userId = room.getAttribute('data-sender-id');
    recipientId = room.getAttribute('data-recipient-id');
    userName = room.getAttribute('data-sender-name');
  }
  const newMessage = document.getElementById('newMessage');
  const newConversationMessage = document.getElementById('new-chat-message');
  var senderMessages = null;
  var recipientMessages = null;

  // for /profile
  if (newMessage != null) {

    const profileMessages = document.getElementById("profile-messages");
    if (profileMessages != null) {
      profileMessages.scrollTop = profileMessages.scrollHeight - profileMessages.clientHeight;
    }

    if (senderMessages === null) {
      senderMessages = consumer.subscriptions.create({ channel: "conversate", room_id: roomName, sender_name: userName, from_id: userId, to_id: recipientId, timestamp: new Date() }, {
        received(data) {
          console.log("Recived (sender):", data);
          const notifications = document.getElementById('messages');
          if (notifications != null && data.create == true) {
            notifications.innerHTML += `
      <div class="flex items-start mb-4 text-sm bg-gray-400" >
        <!-- A message -->
        <div class="flex-1 overflow-hidden border-1 border-gray-600">
          <div>
            <span class="font-bold"> ${data.sender_name}</span>
            <span class="text-grey text-xs">${data.timestamp}</span>
          </div>
          <p class="text-black leading-normal"> ${data.message} </p>
        </div>
      </div>
             `;
          }
          const profileMessages = document.getElementById("profile-messages");
          if (profileMessages != null) {
            profileMessages.scrollTop = profileMessages.scrollHeight - profileMessages.clientHeight;
          }
        }

      });
    }

  if (recipientMessages === null) {
      recipientMessages = consumer.subscriptions.create({ channel: "conversate", room_id: userId }, {
        received(data) {
          console.log("Recived (recipient):", data);
          const notifications = document.getElementById('messages');

          if (notifications != null && data.create == true) {
            notifications.innerHTML += `
      <div class="flex items-start mb-4 text-sm bg-gray-400" >
        <!-- A message -->
        <div class="flex-1 overflow-hidden border-1 border-gray-600">
          <div>
            <span class="font-bold"> ${data.sender_name}</span>
            <span class="text-grey text-xs">${data.timestamp}</span>
          </div>
          <p class="text-black leading-normal"> ${data.message} </p>
        </div>
      </div>
             `;
          }

        }
      });
    }

    newMessage.addEventListener('keydown', function(event) {
      if (event.keyCode === 13 && userName !== '') {
        const messageData = { message: newMessage.value, from_id: userId, sender_name: userName, to_id: recipientId, timestamp: new Date(), create: true };
        console.log("Sending..", messageData);
        senderMessages.send(Object.assign(messageData, { create: true  }));
        console.log("SEnder", senderMessages);
        recipientMessages.send(Object.assign(messageData, { create: false }));
        console.log("Recipient", recipientMessages);
        newMessage.value = '';
      }
    });
  }

  var senderChannel = null;
  var recipientChannel = null;

  // for /inbox
  if (newConversationMessage != null) {

    console.log("Waiting for new messages");

    const roomName = newConversationMessage.getAttribute('data-from-id');
    const userName = newConversationMessage.getAttribute('data-from-name');;
    const userId = newConversationMessage.getAttribute('data-from-id');
    const recipientId = newConversationMessage.getAttribute('data-to-id');

    if (senderChannel === null) {
      senderChannel = consumer.subscriptions.create({ channel: "conversate", room_id: roomName, sender_name: userName, from_id: userId, to_id: recipientId, timestamp: new Date() }, {
        received(data) {
          if (data.from_id == userId) {
            appendToSenderMessages(data);
          }
        }
      });
    }

    if (recipientChannel === null) {
      recipientChannel = consumer.subscriptions.create({ channel: "conversate", room_id: recipientId, sender_name: userName, from_id: userId, to_id: recipientId, timestamp: new Date() }, {
        received(data) {
          console.log("Recived:", data);
          const notifications = document.getElementById('messages');

          if (notifications != null) {
            notifications.innerHTML += `
      <div class="flex items-start mb-4 text-sm bg-gray-400" >
        <!-- A message -->
        <div class="flex-1 overflow-hidden border-1 border-gray-600">
          <div>
            <span class="font-bold"> ${data.sender_name}</span>
            <span class="text-grey text-xs">${data.timestamp}</span>
          </div>
          <p class="text-black leading-normal"> ${data.message} </p>
        </div>
      </div>
             `;
          }

          const profileMessages = document.getElementById("profile-messages");
          if (profileMessages != null) {
            profileMessages.scrollTop = profileMessages.scrollHeight - profileMessages.clientHeight;
          }
        }
      });
    }

    newConversationMessage.addEventListener('keydown', function(event) {
      if (event.keyCode === 13 && userName !== '') {
        const messageData = { message: newConversationMessage.value, from_id: userId, sender_name: userName, to_id: recipientId, timestamp: new Date() };
        senderChannel.send(Object.assign(messageData, { create: true  }));
        recipientChannel.send(Object.assign(messageData, { create: false }));

        newConversationMessage.value = '';
      }
    })
  }


});

const inboxMainMessagesId = "main-message-window";

function appendToSenderMessages(data) {
  const messagesWindow = document.getElementById(inboxMainMessagesId);
  if (messagesWindow != null) {
    const message = `
<div class="flex mb-2 justify-end">
  <div class="rounded py-2 px-3 bg-indigo-200">
    <p class="text-sm mt-1"> ${ data["message"] } </p>
    <p class="text-right text-xs text-gray-500 mt-1"> ${ data["timestamp"] } </p>
  </div>
</div>
`;
    messagesWindow.innerHTML += message;


    const messagesScroll = document.getElementById('main-message-scroll');
    if (messagesScroll != null) {
    messagesScroll.scrollTop =
      messagesScroll.scrollHeight - messagesScroll.clientHeight;
    }
  }

}
