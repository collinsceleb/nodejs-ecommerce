const express = require("express");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDirectory = require("./utils/path")

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})


app.listen(3000);