import { io } from 'socket.io-client';

const socketServerURL = 'http://localhost:8081'; // Update the URL as needed
const socketInstance = io(socketServerURL);

export default socketInstance;

