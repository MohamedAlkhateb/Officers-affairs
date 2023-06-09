//{ Express }  is the type
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { routesAssigner } from "./routes/index";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
//@ts-ignore
import { router, adminJs } from "./AdminJs";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { IOfficerModel } from "./types";

require("dotenv").config();

const app: Express = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

declare global {
  var io: Server;
  namespace Express {
    interface Request {
      user: {
        id: string;
        userName: string;
        password: string;
        officer: IOfficerModel;
        userType: {
          userType: string;
        };
      };
    }
  }
}
global.io = io;
/**
 * adminjs routes and bodyParser mus be first
 *
 */

//@ts-ignore
app.use(adminJs.options.rootPath, router);
app.use(bodyParser());
app.use((req, res, next) => {
  // console.log("req to server", { url: req.url });
  next();
});
app.use(bodyParser.json());
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());

routesAssigner(app);

const nodeEnviromment = process.env.NODE_ENV as string;
if (nodeEnviromment == "production") {
  app.use(express.static("../client/build"));
  app.get("/*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

let port: string = process.env.PORT as string;
server.listen(port, () => {
  console.log("app runs on " + port);
});
mongoose.connect("mongodb://0.0.0.0:27017/test").then(() => {
  console.log("mongo db connected");
});
