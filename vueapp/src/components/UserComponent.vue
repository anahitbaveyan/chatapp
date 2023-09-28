<template>
  <div class="user-chat-container">
    <div class="chat-header">
      <h1>Chat Room</h1>
      <div v-if="!userName" class="user-name-setting">
        <input v-model="tempUserName" placeholder="Set your username" />
        <button @click="setUserName">Set</button>
      </div>
      <button @click="clearChat" v-if="userName" class="clear-button">Clear Chat</button>
    </div>

    <div class="message-list">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="messageClass(message)">
        <strong class="sender">{{ message.sender }}:</strong>
        <p class="message-text">{{ message.text }}</p>
      </div>
    </div>

    <div class="message-input">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message" class="input-field" />
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

export default {
  setup() {
    const userName = ref("");
    const tempUserName = ref("");
    const newMessage = ref("");
    const messages = ref([]);

    const socket = io('http://localhost:8081');

    const setUserName = () => {
      if (tempUserName.value.trim() !== "") {
        userName.value = tempUserName.value;
        tempUserName.value = "";
      }
    };

    const sendMessage = () => {
      if (newMessage.value.trim() !== "") {
        socket.emit("message", { sender: userName.value || "Guest", text: newMessage.value });
        newMessage.value = "";
      }
    };

    const clearChat = () => {
      // Clear the chat history in the user interface
      messages.value = [];

      // You can also send a request to the server to clear the chat history
      // Example: socket.emit('clearChat');
    };

    onMounted(() => {
      socket.on("message", (message) => {
        messages.value.push(message);
      });
    });

    const messageClass = (message) => {
      return {
        'message-sent': message.sender === userName.value,
        'message-received': message.sender !== userName.value,
      };
    };

    return {
      userName,
      tempUserName,
      newMessage,
      messages,
      setUserName,
      sendMessage,
      clearChat,
      messageClass,
    };
  },
};
</script>

<style scoped>
.user-chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-name-setting {
  display: flex;
  align-items: center;
}

.user-name-setting input {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-name-setting button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.message-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}

.message-sent {
  background-color: #007bff;
  color: #fff;
}

.message-received {
  background-color: #f0f0f0;
}

.sender {
  font-weight: bold;
}

.message-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.send-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}
.clear-button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.clear-button:hover {
  background-color: #c82333;
}
</style>
