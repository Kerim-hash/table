const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const TableRoute = require("./routes/table.route");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    `mongodb+srv://kerim:AtAImQdnIqKkCFhJ@cluster0.udm4vvf.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log("connection error"));

app.use("/api", TableRoute);

app.listen(5000, () => console.log("server listening on port", 5000));
