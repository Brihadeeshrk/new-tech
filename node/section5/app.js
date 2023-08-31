const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// this wont parse data of all types, such as files, json and other
// we'll be using diff parsers for diff types of files

// since, addProduct and products are admin related middleware fns, we modularise them
app.use(adminRoutes);

// since, / is a shop related middleware fn, we modularise it
app.use(shopRoutes);

app.listen(3333);
