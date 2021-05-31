

const express = require("express");
// const RTCPeerConnection = require("wrtc").RTCPeerConnection;
// const {RTCSessionDescription } = require("wrtc");
var app = express();
var port =8080;
app.listen(port, () => {

  console.log("server start...");
});
app.use(express.static(__dirname + '/'))