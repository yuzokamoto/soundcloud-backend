import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";

import { userRouter } from "./router/userRouter";
import { soundRouter } from "./router/soundRouter";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/sounds", soundRouter);

const server = app.listen(Number(process.env.SERVER_PORT) || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.log(`Failure upon starting server`);
  }
});
