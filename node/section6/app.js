const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./utils/path");

const app = express();

// setting global configuration value. can be used to set any values we may need throughout our app

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render("404", { docTitle: "404" });
});

app.listen(3333);
