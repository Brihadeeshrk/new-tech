const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  // middleware that is triggered when we are at '/'
  res.send("<h1>hello from express</h1>");
});

module.exports = router;
