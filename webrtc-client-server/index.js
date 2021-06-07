

const express = require("express");
// const RTCPeerConnection = require("wrtc").RTCPeerConnection;
// const {RTCSessionDescription } = require("wrtc");
process.env.socket_url = "http://localhost:8080";
var app = express();
var port =8080;

app.listen(port, () => {
  console.log(process.env);
  console.log("server start...");
});
app.use(express.static(__dirname + '/'))