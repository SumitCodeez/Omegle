const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

let waitingusers = [];

io.on("connection", function (socket) {
  console.log("connected");
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

server.listen(process.env.PORT || 3000);
