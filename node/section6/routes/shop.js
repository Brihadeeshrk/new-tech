const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.data);
  res.render("shop", {
    prods: adminData.data,
    docTitle: "Shop",
    path: "/",
    length: adminData.data.length > 0 ? 1 : 0,
  });
});

module.exports = router;
