const express = require("express");
const path = require("path");
const expressHandlebars = require("express-handlebars");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");
const rootDirectory = require("./utils/path")


const app = express();

// Set Pug Templating Engine for use
// app.set("view engine", "pug");
// app.set("views", "views");

// Set ejs Templating Engine for use
app.set("view engine", "ejs");
app.set("views", "views");


// Set Handlebars Templating engine for use
// app.engine("handlebars", expressHandlebars);
// app.set("view engine", "handlebars");
// app.set("views", "views");

app.use(express.urlencoded({ extended: false}));
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use(errorsController.get404Error);


app.listen(3000);