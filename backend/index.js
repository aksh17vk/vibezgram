import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import loopRouter from "./routes/loop.route.js";
import messageRouter from "./routes/message.route.js";
import postRouter from "./routes/post.route.js";
import storyRouter from "./routes/story.route.js";
import { initializeSocket } from "./socket.js";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/loop", loopRouter);
app.use("/api/message", messageRouter);
app.use("/api/post", postRouter);
app.use("/api/story", storyRouter);
 
const startServer = async () => {
  try {
    await connectDb();
    const server = createServer(app);
    initializeSocket(server);
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.error("<<<<<< Server startup aborted due to DB connection error.>>>>>>");
    process.exit(1);
  }
};

startServer();