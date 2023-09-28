<template>
  <div class="chat-room">
    <!-- Chat Header -->
    <div class="chat-header">
      <h1>Create a Chat Room</h1>
    </div>

    <!-- Chat room creation form -->
    <div class="create-chat-room-form">
      <input v-model="chatRoomName" placeholder="Enter chat room name" class="input-field" />
      <button @click="createChatRoom" class="create-button">Create Chat Room</button>
    </div>

    <!-- List of chat room members -->
    <div class="member-list">
      <h3>Chat Room Members</h3>
      <ul>
        <li v-for="(member, index) in chatRoomMembers" :key="index">
          {{ member }}
          <button v-if="isCreator && member !== userName" @click="removeMember(member)" class="remove-button">Remove</button>
        </li>
      </ul>
    </div>

    <!-- Add Member Section -->
    <div class="add-member-form">
      <input v-model="newMember" placeholder="Enter member's username" class="input-field" />
      <button @click="addMember" class="add-button">Add Member</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

export default {
  setup() {
    const userName = ref(""); 
    const chatRoomName = ref("");
    const chatRoomMembers = ref([]);
    const isCreator = ref(true); 
    const newMember = ref("");

    const socket = io('http://localhost:8081'); // Connect to the socket server

    const createChatRoom = () => {
      if (chatRoomName.value.trim() !== "") {
        // Emit an event to the server to create the chat room
        socket.emit("createChatRoom", { name: chatRoomName.value });

        chatRoomName.value = "";
      }
    };

    const removeMember = (memberName) => {
      if (isCreator.value) {
        // Emit an event to the server to remove a member from the chat room
        socket.emit("removeMember", { roomName: chatRoomName.value, memberName });
      }
    };

    const addMember = () => {
      if (newMember.value.trim() !== "") {
        // Emit an event to the server to add a member to the chat room
        socket.emit("addMember", { roomName: chatRoomName.value, memberName: newMember.value });
        newMember.value = "";
      }
    };

    onMounted(() => {
      // Fetch chat room members and initialize the member list
      socket.emit("getChatRoomMembers", { roomName: chatRoomName.value });

      socket.on("updateMembers", (members) => {
        chatRoomMembers.value = members;
      });
    });

    return {
      userName,
      chatRoomName,
      chatRoomMembers,
      isCreator,
      newMember,
      createChatRoom,
      removeMember,
      addMember,
    };
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
.chat-room {
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

.create-chat-room-form {
  display: flex;
  align-items: center;
}

.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.create-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-button:hover {
  background-color: #0056b3;
}

.member-list {
  margin-top: 20px;
}

.member-list h3 {
  margin-bottom: 10px;
}

.member-list ul {
  list-style-type: none;
  padding: 0;
}

.member-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.remove-button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c82333;
}
.add-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}
</style>
