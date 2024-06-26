require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.CORS_FRONTEND_ORIGIN,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const taskRoute = require("./routes/TaskRoutes");
const authRute = require("./routes/AuthenticationRoutes");

app.use("/tasks", taskRoute);
app.use("/api", authRute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
