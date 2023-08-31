const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// this wont parse data of all types, such as files, json and other
// we'll be using diff parsers for diff types of files

app.use("/products", (req, res) => {
  /*
  // you can omit next as a param if you plan on sending a response
  // you can use the method of Buffers and Streams to get Data OR you could use another middleware called body parser, that does this for us and gives us the body
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  return req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    console.log(parsedBody);
    // better than manually setting the header and status code
    res.redirect("/");
  });
  */

  console.log(req.body);
  res.redirect("/");
});

app.use("/add-product", (req, res, next) => {
  res.send(
    "<form action='/products' method='POST'><input type='text' name='product' /><button type='submit'>submit</button></form>"
  );
});

app.use("/", (req, res, next) => {
  // middleware that is triggered when we are at '/'
  res.send("<h1>hello from express</h1>");
});

app.listen(3333);
