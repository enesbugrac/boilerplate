const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/user");
const { auth } = require("./middleware/auth");
const key = require("./config/key");
const user = require("./models/user");
const app = express();

mongoose
  .connect(key.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));
//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//ROUTES

//AUTH
app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});
//REGİSTER
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(200).json(user))
    .catch((err) => res.status(400).json(`Unable to add user. Error: ${err}.`));
});
//LOGIN
app.post("/api/user/login", (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "email not found",
      });
    }
    //comparePassword
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "wrong password" });
      }
    });
    //generateToken
    user.genareteToken((err, user) => {
      if (err) return res.status(400).send(err);

      res.cookie("x_auth", user.token).status(200).json({
        loginSuccess: true,
      });
    });
  });
});
//LOG OUT
app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

//LISTEN
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on ${port}`));
