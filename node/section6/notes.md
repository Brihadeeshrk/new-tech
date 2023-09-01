## the starting file structure is the taken from section5

- now adding all items entered in `add-product.html` into an array and importing that array into `shopRoutes.js`
- the disadvantage of using an array to store items is that, if we refresh we still have the data there. If we open a new browser (in incognito so we know that no cookies, and no preferences are shared), we can see that the data is shared among the browser windows
- therefore, this data could be shared among all the users of this server
- we'll never ever use this approach, we always fetch the data for that user

## templating engines

- ejs
- you can use normal html and plain js in the templates

```html
<p><%= name %></p>
```

- pug
- minimised version of html
- custom template language

```html
p #{name}
```

- handlebars
- less features when compared to ejs but same philosophy

```html
<p>{{ name }}</p>
```

## pug

- when using pug, you need to tell express that you're using a custom templating engine in `app.js`
- we use set, which is a fn used to declare global vars throughout the app and here we set the `view engine` to `pug` and set the `views` folder to `views`

```js
app.set("view engine", "pug");
app.set("views", "views");
```

- and in shopRoutes, where we serve this file, we can't use `sendFile` anymore because this isn't a html file but a file we're rendering as html so we need to use the `res.render()`
- and since we specified that `views` folder in `app.js`, we dont need to construct the path here and we can just put

```js
res.render("shop");
```

- we don't need to add the `.pug` because we also told `app.js` that our templating engine is `pug`

### outputting dynamic content

- the reason we use templating engines is because of the ability to render dynamic content
- and the way to do that using `pug` is that, in the `res.render()`, we can optionally add another param which is the data in object format, and the data must be in key:value form

```js
res.render("shop", { data: adminData.data  docTitle: 'My Shop'});
```

- and in pug, we iterate over this data and render the items on the screen, very similar to js map()

```pug
<!-- rest of pug code -->
    if items.length > 0
        each item in items
        <!-- pug code you want to repeat for every item -->

    else
        h1 no products
<!-- rest of pug code -->
```

#### pug layouts

- we have a repeated structure in all our `.pug` files
- we can eliminate this redundant code using `pug layouts`

## handlebars

- even though we installed `express-handlebars` we need to tell express that such a package exists
- we didn't have to do this for `pug`, so just check the docs for each engine and see if express recognizes it or not
- in this case, we need to do the following

```js
const expressHbs = require("express-handlebars");

// express initialisation
app.engine("handlebars", expressHbs());
app.set("view engine", "handlebars");
app.set("views", "views");
// rest of app.js
```

### outputting dynamic content

- we can output dynamic content using `{{ }}`

```hbs
<title>{{docTitle}}</title>
```

- when talking about conditional and iterative statements, there is a change in the syntax
- we have the `{{}}` but we also have a `#` for special block statements
- block statements are a block of code that need to be rendered conditionally or by a loop

```hbs
{{#if condition}}
  <!-- block of code -->
{{else}}
  <!-- block of code -->
{{/if}}
<!-- closing the if block -->
```

- the problem with hbs is that, we cant write lines like `#if prods.length > 0` because hbs operates on a 0/1 or True/False basis
- so we need to pass this condition from the nodejs server
- so the code would look like this:

```js
// shop.js
router.get("/", (req, res, next) => {
  console.log(adminData.data);
  res.render("shop", {
    prods: adminData.data,
    docTitle: "Shop",
    path: "/",
    length: adminData.data.length > 0 ? 1 : 0,
  });
});
```

```hbs
{{#if length}}
  <div class="grid">
    <article class="card product-item">
      <header class="card__header">
        <h1 class="product__title">Great Book</h1>
      </header>
      <div class="card__image">
        <img
          src="https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png"
          alt="A Book"
        />
      </div>
      <div class="card__content">
        <h2 class="product__price">$19.99</h2>
        <p class="product__description">A very interesting book about so many
          even more interesting things!</p>
      </div>
      <div class="card__actions">
        <button class="btn">Add to Cart</button>
      </div>
    </article>
  </div>
{{else}}
  <h1>No Products Found</h1>

{{/if}}
```

- there are some benefits to this approach as it forces us to have all of our logic on the nodejs server and keeps our front end file lean
- to iterate over the products in the products[] we use the hbs operator `{{#each}}`
- and we can't use `each.title` or something. since we go through `each` element, they will have just one title, one description and one price right? so we can just use `this.title` to output the title dynamically

```hbs
{{#if length}}
  <div class="grid">
  {{#each}}
    <article class="card product-item">
      <header class="card__header">
        <h1 class="product__title">{{this.title}}</h1>
      </header>
      <div class="card__image">
        <img
          src="https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png"
          alt="A Book"
        />
      </div>
      <div class="card__content">
        <h2 class="product__price">$19.99</h2>
        <p class="product__description">A very interesting book about so many
          even more interesting things!</p>
      </div>
      <div class="card__actions">
        <button class="btn">Add to Cart</button>
      </div>
    </article>
    {/each}
  </div>
{{else}}
  <h1>No Products Found</h1>

{{/if}}
```
