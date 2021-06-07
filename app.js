const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send("<html><head><title>Page not found</title></head><body><h1>Page not found</h1></body></html>")
})


app.listen(3000);