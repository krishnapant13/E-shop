const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}
// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);

//error handling
app.use(ErrorHandler);
module.exports = app;
