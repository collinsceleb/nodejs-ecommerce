const express = require("express");
const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDirectory = require("./utils/path")

const app = express();

// Set Pug Templating Engine for use
app.set("view engine", "pug");
app.set("views", "views");


app.use(express.urlencoded({ extended: false}));
app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));

    // Using Pug template engine
    res.status(404).render('404', {
        pageTitle: "Page Not Found"
    })
})


app.listen(3000);