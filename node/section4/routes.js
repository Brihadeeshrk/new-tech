const fs = require("fs");

const serverHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<h1>this is /</h1>");
    res.write(
      '<main><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">submit</button></form></main>'
    );
    return res.end();
  }

  const data = [];
  if (url === "/message" && method === "POST") {
    req.on("data", (chunk) => {
      data.push(chunk);
    });

    return req.on("end", () => {
      const parsedData = Buffer.concat(data).toString();
      const message = parsedData.split("=")[1];
      fs.writeFile("./text.txt", message, (err) => {
        if (err) {
          console.log("error while writing to file", err);
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

exports.handler = serverHandler;
