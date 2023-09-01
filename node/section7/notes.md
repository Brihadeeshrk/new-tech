## mvc approach

- separation of concerns
- diff parts of our code do diff things and we know which part is responsible for what
- mvc - `model`, `view`, `controller`
- `views`: we already know, have all the files that the user sees on the screen. responsible for rendering the right content on the screen
- `model`: is responsible for representing data in our code, and allows us to work with data such as fetching data, saving data to/from a file/db
- `controller`: connections between our `models` and our `views` because `views` dont care about app logic and `models` is dependant on it, `controllers` act as middle men. also responsible for transporting data to and from views.
- `routes` are basically the things which define upon which path for which http method which controller should execute and then the controller is defining which model to work and which view to render
- and since express works on the concept of middleware, our controller logic will be split up into multiple middlewares

### controller

- right now, the routes folder is a mixture of routes + controllers
- the way we route will stay the same, but the logic to be executed in that route will be handled by controllers

```diff
# routes/admin.js
router.get("/add-product",
- (req, res) => {
- res.render("add-product", {
-     docTitle: "Add Product",
-     path: "/admin/add-product",
-     formsCSS: true,
-     productCSS: true,
-     activeAddProduct: true,
- });
- }
+ getAddProduct

);

# because all the logic in this route has been shifted to a controller
```

### model

- right now, our model is very simple. its an array in the `controllers/product` file
- in the end, that [] represents our data
- and we should define a model for that
- so we create a separate models folder and create a `product.js`
- singular because, we can have all data models related to a product, products here
- so in this `product.sj` model, we create a class with a title field and we initialise this variable by using a constructor
- we also have a fn called `save()` and `fetchAll()` to add products to the [] and fetch them respectively. but `fetchAll()` is a `static fn` in the sense that, we shouldn't have to create an obj to access this fn
- and then, in the product controller, we can just create a new object and call this save() and also call the fetchAll() in the g`etAllProducts controller`

### working with files

- we first construct a path using the `path` util fn and the `path` core module

```js
const p = path.join(rootDir, "data", "products.json");
```

- and in the save(), we first read the file to check if there any items in it using the `fs` core module
- we have a `products[]` that is meant to store the contents of this file
- if there are NO errors, then parse this `data.json` file and store its contents into this `[]`
- and push this `NEW` item to this array
- then, REWRITE that file, using `writeFile` and store the array elements in `JSON` format. console log any errors

- coming to fetching products in `fetchAll()`, in an earlier implementaion we could just reused code from the save() and returned it. like this

```js
  static fetchAll(cb) {
    const p = path.join(rootDir, "data", "products.json");
    fs.readFile(p, (err, fileData) => {
      if (err) return []
      return JSON.parse(fileData)
    });
  }
```

- simple no? but if you see, `fetchAll()` ISN'T returning anything. the function readFile() is!
- so to fix this issue, we can take a param as a callback fn `cb`
- and we can return this [] to that callback fn. like this

```js
  static fetchAll(cb) {
    const p = path.join(rootDir, "data", "products.json");
    fs.readFile(p, (err, fileData) => {
      if (err) return cb([]);
      return cb(JSON.parse(fileData));
    });
  }
```

- and in the places we need to access this data, we can simply do this

```js
Product.fetchAll((products) => {
  // where products is what is being returned in this callback fn
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});
```

#### refactoring

- create a separate fn called `getProductsFromFile` that fetches the data from the file and serves it to the cb fn
- and we can use this fn throughout the model where we need to read data from the file, which is basically the functionality of the `fetchAll()`
- slightly complex in the save()
- we were doing something similar right? we were reading from the file, appending the items to the array and rewriting the file
- and we do 2/3 things in this separate fn, so why not use it and tweak the functionality?
- in the `save()`, when we get the products[] as a `param` in the `cb fn` push the current obj to this array and write it to the file. thats it
- if still unclear, just read this 2-3 times and you'll get it
