const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const db = require("./models/initModels");
const equipmentRoutes = require("./routes/equipmentRoutes");
const userRoutes = require("./routes/userRoutes");
const userDetailsRoutes = require("./routes/userDetailsRoutes");
const equipmentCardRoutes = require("./routes/equipmentCardRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/equipment", equipmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userDetails", userDetailsRoutes);
app.use("/api/equipmentCard", equipmentCardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Invalid token" });
  } else {
    next(err);
  }
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Database connection
db.sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
