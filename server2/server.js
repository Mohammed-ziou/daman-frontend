const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./backend/middleware/errorMiddleware");
const connectDB = require("./backend/config/db");

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/docs", require("./backend/routes/docsRoutes"));
app.use("/api/users", require("./backend/routes/usersRoutes"));

// Server options

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
