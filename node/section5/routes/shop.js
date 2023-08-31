const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  // middleware that is triggered when we are at '/'
  /*
  res.send("<h1>hello from express</h1>");
  instead of sending lines of html, lets send a file 
  */
  //  paths to files need to be absolute
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
