const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.data);
  res.render("shop", {
    prods: adminData.data,
    pageTitle: "Shop",
    path: "/",
    hasProducts: adminData.data.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
