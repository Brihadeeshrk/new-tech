## slugs in nodejs

- while defining a route in `shop.js` for when someone clicks on the details button of a product, they're navigated to a `products/${productID}` page
- and the way to handle that in routes, is by using this `:productID` in the route

```js
// routes/shop.js
router.use("/products/:productID", controller);
```

- : signals to express that we shouldn't look for a route but it could be anything!
- but its very important to know where to place these middlewares
- an example would be the 404 errorController, its placed at the end because if it doesn't match anything else, it'll come there right. similarly, if we place this `:productID` first, then all records will match and it wont pursue other routes. so it's important to place this at the end
- and how do we access this `productID` in code?
- the `req` obj gives us this property called `params` and through this params obj we can obtain the productID

```js
// controller/shop.js
exports.getProduct = (req, res, next) => {
  const pID = req.params.productID;
};
```

- note, the name you give in the `routes` file has to be the same name you give here
- in order to get details of a particular item, we go the `models/product.js` file and we create a new static fn
- we pass in the id and a cb fn, and we use js `.find()` to get the item
- and we simply pass that product to the `product-detail.ejs` file

```js
// models/product.js
static fetchById(id, cb) {
getProductsFromFile((products) => {
    const product = products.find((product) => product.id === id);
    cb(product);
});
}

// controller/shop.js
exports.getProduct = (...) => {
  const pID = req.params.productID;
  Product.getProductByID(pID, product => {
    res.render('shop/product-detail', {...})
  })
}
```

## how to add to cart

- `add to cart` is a `POST` req
- with POST req, we can add a body of data
- when we submit a form, we usually have an input field in it right? like how we have for adding a product
- when 'adding to cart' there is no such i/p form for us to extract data from
- so, we use a input field of type hidden to send the required data
- took the form snippet and created a new `includes` and pasted it everywhere we have the add to cart button
- the issue is, when we iterate and show all the products in `index.ejs`, we don't get the product.id field, which is why we've optionally passed the product as a param to the `includes` tag
- now we create a separate model for cart as it is its own logic
- we add a static fn called `add to cart` which takes the id and the price
- we need to do 4 things

  - fetch the items in the cart
  - check if the item exists in the cart or no
  - if it does, update the qty or add it to the cart
  - update the total price

### methodology

1. fetch items from the `data/cart.js` file

- have a var that stores the path of the file that stores the cart details
- read the file at that path

```js
fs.readFile(p, (err, fileContent) => {
  // logic goes here
});
```

- create a local cart var with products and a totalQty property
- if there's no err then parse this file's contents and set the cart's value to that

1. check if the item `exists` in the cart or no

- find the index of the item in the `cart.products[]`
- have a dummy var called `updatedProduct`

```js
const existingProductIndex = cart.products.findIndex((p) => p.id === id);
const existingProduct = cart.products[existingProductIndex];
```

1. if it does, update the qty or add it to the cart

- if it exists

  - take the dummy `updatedProduct` var, and set it to the existingProduct after spreading
  - update the qty by 1
  - update the cart prods and set that index's item to updatedItem

- if it doesnt

  - set the dummy var to hold the id of that item and set the qty to 1
  - and set the cart items

1. update the total price

- since the price is a `string` by default, add a `+` to numerise it
- to update the price, add the price to the existing price

### code

```js
static addProduct(id, productPrice) {
    // fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalQty: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // check if item exists
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        // add it or increase the qty
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      // update the total price
      cart.totalQty += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
```
