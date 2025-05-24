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
    socket.roomId = roomId;
    console.log("socket room", socket.roomId);
    socket.join(roomId);
    let clientSet = await io.in(roomId).fetchSockets();
    io.to(roomId).emit("online_users", { userCount: clientSet.length });
    let isRoomPresent = await redisClient.get(`roomId=${roomId}`);
    if (isRoomPresent) {
      socket.emit("prod_ini_price", {
        initialValue: parseInt(JSON.parse(isRoomPresent).maxPrice),
      });
    }
  });
  socket.on("auction_over_update", ({ auctionStatus }) => {
    io.to(socket.roomId).emit("auction_status", { isAuctionOver: true });
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

  // called when the "back to home" button clicked in the client  => think of a better solution !!!
  socket.on("socket_disconnect", () => {
    let roomId = socket.roomId;
    socket.leave(roomId);
    let clientCount = io.in(roomId).fetchSockets();
    io.to(roomId).emit("online_users", {
      userCount: clientCount.length,
    });
    socket.disconnect(true);
  });

  socket.on("disconnecting", async () => {
    let roomId = socket.roomId;
    socket.leave(roomId);
    let clientCount = await io.in(roomId).fetchSockets();
    io.to(roomId).emit("online_users", {
      userCount: clientCount.length,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(5002, () => console.log("auction server running at 5002!!!"));
