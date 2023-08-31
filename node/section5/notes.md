alternatives to express

- vanilla node js (what we've done so far)
- adonis.js (laravel inspired framework for nodejs)
- koa
- sails.js

express is the most popular / most widely used one

## why express?

- highly flexible
- doesn't add too much functionality outside the box
- helps us build the app in a certain way with incoming req's that makes it highly flexible and there are 100s and 1000s of packages built for express that we can add and extend the functionality of the app

how to install?

```bash
npm install --save express
```

## express notes

- it's all about the middleware. the incoming req is funnelled through a bunch of functions by express.js
- instead of having one req handler, we can have the possibility of hooking multiple req handlers which the req will go through before we send the response
- splitting the block of code into smaller functions and pieces
- 'pluggable' nature of express js
- how to create this 'middleware'?

```js
app.use((req, res, next) => {});
// this fn will be called for all incoming reqs
```

- every middleware receives 3 args `req`, `res` and `next`
- `next` is a fn that will be passed to `app.use()` by express and this is used to transfer the control or let express run the next middleware fn

```js
app.use((req, res, next) => {
  console.log("in middleware1");
  next();
});

app.use((req, res, next) => {
  console.log("in middleware2");
});

/* output:
in middleware1
in middleware2
*/
```

- if you're sending a response, dont use `next()`, if you aren't then it makes sense to use `next()`
- the control flows from the top of the file down
- sending responses, we can use `res.write()` and `res.setHeader()`, but we could also use `res.send()` which is a fn that takes a body of type: `any`
- we could send html, or anything! and the headers are set automatically

now,

- `app.use()` has 4 overloads, or 4 ways of using it. we're going to find out how to use it to route and filter requests

```js
app.use("/", (req, res, next) => {
  // middleware that is triggered when we are at '/'
  console.log("in middleware2");
  res.send("<h1>hello from express</h1>");
});
```

- to filter out requests to other routes, make sure to add the middleware for those other fns before you type the one for `'/'` as the middlewares are funnelled from top-bottom and we're not using next() here
- instead of using the following code

```js
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
```

- we can just use a package called `body-parser` that does this for us and we can just plug it in to the app using `app.use`
- and this, takes in an arg called `urlencoded()`. now this package doesn't parse data of all types, but it works for this example
- you can filter the type of request even further by using `req.get(..)` or `req.post(..)` and so on

## express router

- to modularise code and enhance readability, we can use express router to contain routes in other files, and we can just `app.use` those routes

```js
// app.js
- app.use("/products", (req, res) => {
-   console.log(req.body);
-   res.redirect("/");
- });

- app.use("/add-product", (req, res, next) => {
-   res.send(
-     "<form action='/products' method='POST'><input type='text' - name='product' /><button type='submit'>submit</button></form>"
-   );
- });

- app.use("/", (req, res, next) => {
-   // middleware that is triggered when we are at '/'
-   res.send("<h1>hello from express</h1>");
- });

+ app.use(adminRoutes)
+ app.use(shopRoutes)
```
