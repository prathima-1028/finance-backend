require("./db");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// 🔹 Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const authMiddleware = require("./middleware/authMiddleware");
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: req.user,
  });
});

const recordRoutes = require("./routes/recordRoutes");
app.use("/records", recordRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/dashboard", dashboardRoutes);

// 🔹 Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));