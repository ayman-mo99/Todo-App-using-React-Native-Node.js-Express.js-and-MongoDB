const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// set up express app
const app = express();
// middleware
app.use(cors());
app.use(express.json());

dotenv.config();
mongoose.Promise = global.Promise;

// connect to mongodb
mongoose
  .connect(
    process.env.DB_conn,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log("connect to data base");
    }
  )
  .then((result) => {
    app.listen(process.env.port || 4000, function () {
      console.log("now listening for requests");
    });
  })
  .catch((err) => console.log(err));

// initialize routes
app.use("/api/user", require("./routes/api"));
