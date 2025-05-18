import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectRedisServer } from "../redisClient.js";

const auctionApp = express();
const httpServer = createServer(auctionApp);

const io = new Server(httpServer, {
  cors: "*",
});

let redisClient;
async function startRedis() {
  redisClient = await connectRedisServer();
}

startRedis();

io.on("connection", (socket) => {
  console.log("user connected !!!", socket.id);
  socket.on("join-room", async ({ roomId, user }) => {
    socket.username = user;
    socket.join(roomId);
    let isRoomPresent = await redisClient.get(`roomId=${roomId}`);
    if (isRoomPresent) {
      socket.emit("prod_ini_price", {
        initialValue: parseInt(JSON.parse(isRoomPresent).maxPrice),
      });
    }
  });
  socket.on("new_bid", async ({ roomId, newPrice, originalPrice }) => {
    let isRoomPresent = await redisClient.get(`roomId=${roomId}`);
    if (isRoomPresent) {
      await redisClient.set(
        `roomId=${roomId}`,
        JSON.stringify({
          maxPrice: Math.max(JSON.parse(isRoomPresent).maxPrice, newPrice),
        })
      );
      io.to(roomId).emit("update_price", {
        newPrice: Math.max(JSON.parse(isRoomPresent).maxPrice, newPrice),
      });
    } else {
      await redisClient.set(
        `roomId=${roomId}`,
        JSON.stringify({ maxPrice: Math.max(newPrice, originalPrice) })
      );
      if (newPrice > originalPrice) {
        io.to(roomId).emit("update_price", { newPrice });
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(5002, () => console.log("auction server running at 5002!!!"));
