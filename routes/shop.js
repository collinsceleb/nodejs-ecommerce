const express = require("express");
const path = require("path");

const rootDurectory = require("../utils/path");
const adminData = require("./admin");

const router = express.Router();


router.get("/", (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDurectory, "views", "shop.html"));
  const products = adminData.products;

  // Using Pug Template Engine
  res.render("shop", {
    products: products,
    pageTitle: "Shop",
    path: "/"
  });
});


module.exports = router;