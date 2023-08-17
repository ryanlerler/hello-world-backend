const cors = require("cors");
const express = require("express");
require("dotenv").config();

const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
});

const PORT = process.env.PORT || 3000;

const UserRouter = require("./routers/userRouter");
const ContentRouter = require("./routers/contentRouter");
const CategoryRouter = require("./routers/categoryRouter");
const ChatGptRouter = require("./routers/chatGptRouter");

const UserController = require("./controllers/userController");
const ContentController = require("./controllers/contentController");
const CategoryController = require("./controllers/categoryController");
const ChatGptController = require("./controllers/chatGptController");

const db = require("./db/models/index");
const { user, content, category, like, comment } = db;

const userController = new UserController(user);
const contentController = new ContentController(
  content,
  user,
  category,
  like,
  comment
);
const categoryController = new CategoryController(category);
const chatGptController = new ChatGptController();

const userRouter = new UserRouter(userController).routes();
const contentRouter = new ContentRouter(contentController, checkJwt).routes();
const categoryRouter = new CategoryRouter(categoryController).routes();
const chatGptRouter = new ChatGptRouter(chatGptController).routes();

const allowedOrigins = [process.env.FRONTEND];
const corsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/contents", contentRouter);
app.use("/categories", categoryRouter);
app.use("/chatgpt", chatGptRouter);

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected with id: " + socket.id);
  socket.on("createTopic", (topic) => {
    socket.join(topic);
    console.log("topic created");
  });

  socket.on("send-message", (data) => {
    io.to(data.topic).emit("receive-message", {
      sender: socket.id,
      message: data.inputMessage,
    });
  });
});

// const { Configuration, OpenAIApi } = require("openai");
// const readline = require("readline");

// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.OPEN_AI_API_KEY,
//   })
// );

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// userInterface.prompt();
// userInterface.on("line", async (input) => {
//   const res = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   });
//   console.log(res.data.choices[0].message.content);
//   userInterface.prompt();
// });

server.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
