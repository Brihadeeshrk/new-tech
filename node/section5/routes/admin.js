const express = require("express");

const router = express.Router();

router.post("/products", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

router.get("/add-product", (req, res, next) => {
  res.send(
    "<form action='/products' method='POST'><input type='text' name='product' /><button type='submit'>submit</button></form>"
  );
});

module.exports = router;
