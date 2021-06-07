const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    "<html><head></head><body><form method='POST' action='/admin/add-product'><input type='text' name='title'><button type='submit'>Add Product</button></input></form></body></html>"
  );
});
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router
