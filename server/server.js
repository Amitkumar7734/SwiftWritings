// __________________________ IMPORTS __________________________
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const userAuthRoutes = require("./Routes/userAuthRoutes");
const blogRoutes = require("./Routes/blogRoutes");
const userProfileRoutes = require("./Routes/userProfileRoutes");
const blogActionRoutes = require("./Routes/blogActionRoutes");
const searchRoutes = require("./Routes/searchRoutes");
const app = express();
const mongoose = require("mongoose");

require("./passport-configs/localAuth-config");

// __________________________ DB Connection __________________________

require("./Database/DbConnection");

// __________________________ MIDDLEWARES __________________________
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

// __________________________ ROUTES __________________________

app.use(userAuthRoutes);
app.use(blogRoutes);
app.use(userProfileRoutes);
app.use(blogActionRoutes);
app.use(searchRoutes);

// ____________________________________________________________

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err.message);
  else {
    console.log(`App is running on Port ${process.env.PORT}!`);
  }
});
