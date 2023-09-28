import { createRouter, createWebHistory } from 'vue-router';
import UserComponent from '../components/UserComponent.vue';
import ChatRoomCreate from '../components/ChatRoomCreate.vue';

const routes = [
  {
    path: '/',
    component: UserComponent, 
  },
  {
    path: '/chat-room',
    component: ChatRoomCreate, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
