const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

const items = [];

router.post("/products", (req, res) => {
  items.push({ title: req.body.title });
  res.redirect("/");
});

router.get("/add-product", (req, res) => {
  res.render("add-product", { docTitle: "Add", path: "/admin/add-product" });
});

module.exports = {
  routes: router,
  data: items,
};
