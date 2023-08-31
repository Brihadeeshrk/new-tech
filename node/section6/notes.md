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
