const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// set up express app
const app = express();
app.use(cors());
dotenv.config();
mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify', false);
// connect to mongodb
mongoose.connect(
  process.env.DB_conn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("connect to data base");
  }
);

app.use(express.json());
// initialize routes
app.use("/api/user", require("./routes/api"));
// Error-handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("now listening for requests");
});

//"concurrently \"npm run server\" \"npm run client\"",
