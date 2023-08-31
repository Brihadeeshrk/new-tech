const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.data);
  // sendFile is for when we're sending html files
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  // in the case that we're using templating engines, we need to use res.render
  res.render("shop", { prods: adminData.data, docTitle: "Shop", path: "/" });
});

module.exports = router;
