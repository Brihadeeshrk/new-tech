const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = path.join(rootDir, "data", "products.json");
    // now first, we need to read this file
    fs.readFile(p, (err, fileData) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileData);
      }
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log("ERR", err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(rootDir, "data", "products.json");
    fs.readFile(p, (err, fileData) => {
      if (err) return cb([]);
      return cb(JSON.parse(fileData));
    });
  }
};
