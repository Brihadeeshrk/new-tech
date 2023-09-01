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
