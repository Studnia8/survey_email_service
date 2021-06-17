const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
require("./models/User");
require("./models/Survey");
require("./services/passport");
const keys = require("./config/keys");

// call database
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// launch application
const app = express();

// list of middlewares for all routes
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// calling the routes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

// dealing with prod environment
if (process.env.NODE_ENV === "production") {
  // serve up client production assets
  app.use(express.static("client/build"));

  // serve up index.html if there is no route in server
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// set proxy
const port = process.env.PORT || 5000;
app.listen(port);
