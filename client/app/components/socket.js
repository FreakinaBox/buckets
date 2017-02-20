import io from "socket.io-client/dist/socket.io.js";
const socket = io.connect(window.location.host);

export default socket;