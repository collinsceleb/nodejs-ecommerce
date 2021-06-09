const express = require("express");
const path = require("path");

const rootDurectory = require("../utils/path");

const router = express.Router();


router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDurectory, "views", "shop.html"));
});


module.exports = router;