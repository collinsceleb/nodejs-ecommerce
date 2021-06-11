const express = require("express");
const path = require("path");

const rootDirectory = require("../utils/path")

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  // res.sendFile(path.join(rootDirectory, "views", "add-product.html"));

  // Using Pug template engine
  res.render("add-product", {
    pageTitle: "Add Product", 
    path: "/admin/add-product"
  })
});
router.post("/add-product", (req, res, next) => {
  // console.log(req.body);
  products.push({
    title: req.body.title
  });
  res.redirect("/");
});

// module.exports = router;

exports.routes = router;
exports.products = products;
