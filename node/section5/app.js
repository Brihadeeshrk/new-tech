const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./utils/path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

// this wont parse data of all types, such as files, json and other
// we'll be using diff parsers for diff types of files

// since, addProduct and products are admin related middleware fns, we modularise them
app.use("/admin", adminRoutes);

// since, / is a shop related middleware fn, we modularise it
app.use(shopRoutes);

// 404 req is handled here
app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3333);
