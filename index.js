const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://enes123:enes123@boilerplate.ifzvm.mongodb.net/Boilerplate?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Selamlar aq");
});

app.listen(5000);
