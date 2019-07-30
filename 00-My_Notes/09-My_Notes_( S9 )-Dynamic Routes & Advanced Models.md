# S9 | Dynamic Routes & Advanced Models 

# S9 | Module Introduction
---
<img src="./assets/S9/1.png" alt="packages" width="800"/>
<img src="./assets/S9/2.png" alt="packages" width="800"/>

# S9 | Adding the Product ID to the Path 
---
## We need a way to load the detail page for a product

`shop/product-list.ejs` - Add a new button in actions

Before adding button
<img src="./assets/S9/3.png" alt="packages" width="800"/>

Add Details button
<img src="./assets/S9/4.png" alt="packages" width="800"/>

UI
<img src="./assets/S9/5.png" alt="packages" width="800"/>

But we need to pass the `ID` of the product for which we want to see the details. Somthing like this : 
<img src="./assets/S9/6.png" alt="packages" width="800"/>

## Lets ensure every product has a unique `ID`

Using `random()` to have an ID for each product while saving. - `models/product.js`
<img src="./assets/S9/7.png" alt="packages" width="800"/>

## Pass the unique ID to the path

Which path ? - `shop/product-list.ejs`
<img src="./assets/S9/8.png" alt="packages" width="800"/>

Adding the `product.id` to the path
<img src="./assets/S9/9.png" alt="packages" width="800"/>

How might the path look ?
<img src="./assets/S9/10.png" alt="packages" width="800"/>

## Extract all the data we need for the product (`ID`) from the controller
We send some information as part of the path so that we can extract all the data we need for the product from the controller or inside of the controller because we can't really send the entire product as part of the url but we can send this key information.

Add id to the products in the `products.json` file
<img src="./assets/S9/11.png" alt="packages" width="800"/>

Click on Details and see the url
<img src="./assets/S9/12.png" alt="packages" width="800"/>
<img src="./assets/S9/13.png" alt="packages" width="800"/>
- Page not found since we are not handling the route yet

#### Next step 
- Extract the ID 
- Thus know which product to load

# S9 | Extracting Dynamic Params
---
## Handle a new route with a dynamic segment i.e the productId 

Register new route - 
`routes/shop,js`
<img src="./assets/S9/14.png" alt="packages" width="800"/>
- we can tell the express router that there will be some variable segment by adding a colon and then any name of our choice like `productId`
- This will get matched to urls like `/products/1234`, where 1234 will be the `productId`

- But this will also get matched to urls like `/products/delete`
- So the ordering matters here. We should have the more specific route first and general routes later in the code.
<img src="./assets/S9/15.png" alt="packages" width="800"/>
<img src="./assets/S9/17.png" alt="packages" width="800"/>

## Extract the dynamic productId in the controller
Add a function in the controller to extract the productId - 
`controllers/shop.js`.
<img src="./assets/S9/16.png" alt="packages" width="800"/>

## Output
<img src="./assets/S9/18.png" alt="packages" width="800"/>
<img src="./assets/S9/19.png" alt="packages" width="800"/>

# S9 | Loading Product Detail Data
---
## Designing the function that returns the selected product from the DB (i.e file for now)

`models/product.js`
<img src="./assets/S9/20.png" alt="packages" width="800"/>
- Now we need to fetch all the products from the file
- IF it was a database we could run a query to fetch only the expected product

`findById()` - finds product by ID
<img src="./assets/S9/21.png" alt="packages" width="800"/>

## Use the product found in the controller

`controllers/shop.js` - Logging the prodID
<img src="./assets/S9/22.png" alt="packages" width="800"/>

Getting the product by id 
<img src="./assets/S9/23.png" alt="packages" width="800"/>

## Output - console
<img src="./assets/S9/24.png" alt="packages" width="800"/>
<img src="./assets/S9/25.png" alt="packages" width="800"/>

## Lets Code the Above !! 
[YES] - Coded ? 

# S9 | Rendering The Product Detail View
---
## Design the ejs template file for Product Details View
`shop/product-detail.ejs`
<img src="./assets/S9/26.png" alt="packages" width="800"/> 

Adding the css for `centered`
`css/main.css`
<img src="./assets/S9/27.png" alt="packages" width="800"/>

Adding the html for Product detail page
`shop/product-detail.ejs`
<img src="./assets/S9/28.png" alt="packages" width="800"/>

## Render the Product Detail view

`controllers/shop.js` - Render the product detail view
<img src="./assets/S9/29.png" alt="packages" width="800"/>
<img src="./assets/S9/30.png" alt="packages" width="800"/>
- `path: '/products'` : ensures that the **Products** tab is highlighted when viewing product details

Output
<img src="./assets/S9/31.png" alt="packages" width="800"/>

## Add To Cart Button 
`product-detail.ejs`
<img src="./assets/S9/32.png" alt="packages" width="800"/>

Output
<img src="./assets/S9/33.png" alt="packages" width="800"/>

# S9 | Passing Data With POST Request
---
## Objective
We want to add a product to the cart
But we need to know which product should be added to the Cart ?
<img src="./assets/S9/34.png" alt="packages" width="800"/>

## Idea  
1. We can pass data in the request (`req`) body.
2. This is not possible in a `GET` request.
3. But this is the convention when we pass data in the `POST` request.
4. **REMEMBER** - The same thing happens when we add a product.
All the fields and their values were put in the `req.body`
<img src="./assets/S9/35.png" alt="packages" width="800"/>
- But this is only for `POST` request not for `GET` request.

## Add Hidden Inputs with Name property 
Add **Hidden Inputs** with `name` property in a `form` so that the `req.body` is automatically populated by express.
<img src="./assets/S9/36.png" alt="packages" width="800"/>
<img src="./assets/S9/37.png" alt="packages" width="800"/>

## Add Function to the Controller
`controllers/shop.js`
<img src="./assets/S9/38.png" alt="packages" width="800"/> 
- `req.body` is populated by express due to a form `POST` request

## Connect the Router to the Controller
`routes/shop.js`
<img src="./assets/S9/39.png" alt="packages" width="800"/> 


## Output
Click on Add to Cart 
<img src="./assets/S9/40.png" alt="packages" width="800"/>

See the `productId `in the console
<img src="./assets/S9/41.png" alt="packages" width="800"/>
- This is Working !! Great 

## Use the same Add to Cart form everywhere
The Form 
<img src="./assets/S9/42.png" alt="packages" width="800"/>

`product-list.ejs`
<img src="./assets/S9/43.png" alt="packages" width="800"/>

`index.ejs`
<img src="./assets/S9/44.png" alt="packages" width="800"/>

We can add an `add-to-cart.ejs` in the includes folder
<img src="./assets/S9/45.png" alt="packages" width="300"/>
<img src="./assets/S9/46.png" alt="packages" width="800"/>

## Use the add-to-cart include
`index.ejs`
<img src="./assets/S9/47.png" alt="packages" width="800"/>

`product-detail.ejs`
<img src="./assets/S9/48.png" alt="packages" width="800"/>

`product-list.ejs`
<img src="./assets/S9/49.png" alt="packages" width="800"/>

## Output

#### Error
<img src="./assets/S9/50.png" alt="packages" width="800"/>
- Include does not get the loop variable (`product`) by default.
  <img src="./assets/S9/51.png" alt="packages" width="800"/>

#### Solution
We can pass the variable by passing an object as the second argument.
<img src="./assets/S9/52.png" alt="packages" width="800"/>
- We need to do this for all our add-to-cart includes where it is used inside a loop.

#### Works Now !
<img src="./assets/S9/53.png" alt="packages" width="800"/>


## Lets Code the Above !! 
[YES] - Coded ? 

# S9 | Adding a Cart Model
--- 

## Adding the cart class
`models/cart.js`
<img src="./assets/S9/54.png" alt="packages" width="800"/>

#### Probable approach is to have a constructor like this.
`models/cart.js`
<img src="./assets/S9/55.png" alt="packages" width="800"/>
- a list of products 
- total price 

#### But we will take a different approach 
- Its not that a cart will be created everytime whenever a product is created.
- Since the cart will always be there in our application 
- We just need to manage the products

`models/cart.js`
<img src="./assets/S9/56.png" alt="packages" width="800"/>

`models/cart.js` - The cart.json file will represent an object tha t represents our cart.
<img src="./assets/S9/57.png" alt="packages" width="800"/>

## Lets Code the Above !! 
[YES] - Coded ? 

## Lets Code Myself Before I See Anymore !! 
[YES] - Coded ? 

#### `cart.json` - by @ams
<img src="./assets/S9/58.png" alt="packages" width="800"/>

#### `cart.ejs` - by @ams
<img src="./assets/S9/59.png" alt="packages" width="800"/>

#### `models/cart.js` - by @ams
```js
const fs = require("fs");
const path = require("path");
const rootDirPath = require("../util/path");

const p = path.join(rootDirPath, "data", "cart.json");
// const p = path.join("..", "data", "cart.json");

class Cart {
  static addProduct(id) {
    // Fetch the previous cart
    fs.readFile(p, (err, data) => {
      const cart = JSON.parse(data);
      // Analyze the cart => Find existing products
      const products = cart.products;
      let product = products.find(p => p.id == id);
      const isNewProduct = product ? false : true;
      // console.log({ products, isNewProduct });
      // Add new product / increase quantity
      if (isNewProduct) {
        // Add new product 
        const quantity = 1;
        product = { id, quantity };
        products.push(product);
        console.log(products);
        fs.writeFile(p, JSON.stringify(cart), err=>{
          console.log(err);
        })
      } else {
        // Increase quantity
        product.quantity ++;
        console.log(products);
        fs.writeFile(p, JSON.stringify(cart), err=>{
          console.log(err);
        })
      }
    });
  }
  static getCart(cb) {
    fs.readFile(p, (err, products) => {
      // console.log(JSON.parse(products));
      // show the products in the UI Cart - using a callback
      cb(JSON.parse(products));
    })
  }

}
module.exports = Cart;
// Cart.addProduct(0.6179287931451218);
```

#### controllers/shops.js - Cart controller functions
<img src="./assets/S9/60.png" alt="packages" width="800"/>
```js
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    // console.log(cart);
    res.render("shop/cart", {
      products: cart.products,
      pageTitle: "Your Cart",
      path: "/cart"
    });    
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log(prodId);
  Cart.addProduct(prodId);
  res.redirect("/cart");
};
```
#### `routes/shop.js` - by @ams
<img src="./assets/S9/61.png" alt="packages" width="800"/>

## Lets Code the Above !!
[x] - Coded ?

## Lets Proceed to Lecture 

## `models/cart.js`
#### Reading from the file
`models/cart.js`
<img src="./assets/S9/62.png" alt="packages" width="800"/>
- create the file if err with `cart` object
- otherwise read from the file and parse

Find if the product we want to add already exists in the cart
`models/cart.js`
<img src="./assets/S9/63.png" alt="packages" width="800"/>

#### Update the quantity if product exists
`models/cart.js`
<img src="./assets/S9/64.png" alt="packages" width="800"/>
- using spread operator to copy object fields 

If new product
`models/cart.js`
<img src="./assets/S9/65.png" alt="packages" width="800"/>

#### Update Product cart `totalPrice`
`models/cart.js`
<img src="./assets/S9/66.png" alt="packages" width="800"/>
- expect to get the individual product price as argument.
  
#### Add the `productPrice` to the cart `totalprice`
`models/cart.js`
<img src="./assets/S9/68.png" alt="packages" width="800"/>

#### Cart should contain the updated product.
For new product add the product to the existing cart products list.
`models/cart.js`
<img src="./assets/S9/69.png" alt="packages" width="800"/>
- using spread operator

#### For existing product we want to replace the product with the updated product (quantity incremented)
`models/cart.js`
<img src="./assets/S9/70.png" alt="packages" width="800"/>
- get the index of the product in the cart

Replace the existing product with the updated product
`models/cart.js`
<img src="./assets/S9/71.png" alt="packages" width="800"/>

#### Save the cart back to our file
`models/cart.js`
<img src="./assets/S9/72.png" alt="packages" width="800"/>

## `controllers/shop.js`
Get the Product by Id from the `DATABASE` i.e `products.json` file
`controllers/shop.js`
<img src="./assets/S9/73.png" alt="packages" width="800"/>
- We can use this product information to update the cart.

Use the `Cart` model
`controllers/shop.js`
<img src="./assets/S9/74.png" alt="packages" width="800"/>

Add the product to the cart
`controllers/shop.js`
<img src="./assets/S9/75.png" alt="packages" width="800"/>
- pass arguments : `prodId` and `price`

## Output
Click Add to Carts
<img src="./assets/S9/76.png" alt="packages" width="800"/>

See `cart.json`
<img src="./assets/S9/77.png" alt="packages" width="800"/>
- totalprice does not seem alright. We have to work on that

`models/cart.js` - convert the price to number
<img src="./assets/S9/78.png" alt="packages" width="800"/>

Output after correction
<img src="./assets/S9/79.png" alt="packages" width="800"/>

## Lets Code the Above !! 
[YES] - Coded ? 

# S9 | Using Query Params
---
## Ignoring For Now 
- Displaying the Cart
- Deleting a Product from the Cart

## Editing a Product

#### Creating a Common template for Add and Edit Products
The `edit-product.ejs` should be same as `add-product.ejs`
<img src="./assets/S9/80.png" alt="packages" width="800"/>

Transfer the code from `add-product.ejs` to `edit-product.ejs` 
Delete the `add-product.ejs`.

#### Fix the `add-product.ejs` template
`edit-product.ejs`
<img src="./assets/S9/81.png" alt="packages" width="800"/>
- keeping on the `edit-product.ejs` since its more generic 
- also we will resuse the template

Do not use the `add-product.ejs` template in the controller.
<img src="./assets/S9/82.png" alt="packages" width="800"/>

Use the `edit-product.ejs`
<img src="./assets/S9/83.png" alt="packages" width="800"/>

Output - **Add Product** still works
<img src="./assets/S9/84.png" alt="packages" width="800"/>

#### Edit Product Controller

<img src="./assets/S9/85.png" alt="packages" width="800"/>
- Question is how should we reach this controller action ?

**Edit Button** in the "**Admin Products**" Tab
<img src="./assets/S9/86.png" alt="packages" width="800"/>

Current `Url`
<img src="./assets/S9/87.png" alt="packages" width="800"/>

But we want the `Url` to contain the ProductID
<img src="./assets/S9/88.png" alt="packages" width="800"/>
- then the form will be pre-loaded with the product properties
- And Saving the form will cause to replace the existing product in the DB (file)

`routes/admin.js` - Add the route for editing the product
<img src="./assets/S9/89.png" alt="packages" width="800"/>
- adding dynamic segment in the route i.e `ROUTE PARAMETERS`

`controllers/admin.js` - add a bollean to know whether the user wants to edit or add a product
<img src="./assets/S9/90.png" alt="packages" width="800"/>

We want a confirmation from the user if they want to edit or not - using a **Query Parameter**
<img src="./assets/S9/91.png" alt="packages" width="800"/>
- Example of a query parameter
- This is optional data
- Multiple query params are separated by `&` sign

The path reached is determined upto the question mark 
<img src="./assets/S9/91.png" alt="packages" width="800"/>

So we dont need to add any query parameter information in the `routes file`
<img src="./assets/S9/92.png" alt="packages" width="800"/>

But we can always check for query parameters in our controllers using the `req.query.paramKey`
`controllers/admin.js`
<img src="./assets/S9/93.png" alt="packages" width="800"/>
- The value of query param extracted is always string like `"true"` and not `true`

Now we can set the editmode and enter the edit mode if this value is set.
`controllers/admin.js`
<img src="./assets/S9/94.png" alt="packages" width="800"/>

Doing a redundant check and redirection
<img src="./assets/S9/97.png" alt="packages" width="800"/>
- redundant because we already know that we want to edit

Output - Edit product
<img src="./assets/S9/98.png" alt="packages" width="800"/>

# S9 | Pre-Populating the Edit Product Page with Data

## Controller
Now in the edit mode I want to get my product information
`controllers/admin.js`
<img src="./assets/S9/99.png" alt="packages" width="800"/> 

Remember : we get the prodId from the route dynamic segment.
`routes/admin.js`
<img src="./assets/S9/100.png" alt="packages" width="800"/> 

Get the productId from the `req.params.productId`
`controllers/admin.js`
<img src="./assets/S9/101.png" alt="packages" width="800"/>

Use the product Model to fetch the product
`controllers/admin.js`
<img src="./assets/S9/102.png" alt="packages" width="800"/>

Render the Edit Product Page once the product is fetched.
`controllers/admin.js`
<img src="./assets/S9/103.png" alt="packages" width="800"/>
- pass the product as a variable to the template

Add a check if the product is not found. Redirect in that case
`controllers/admin.js`
<img src="./assets/S9/104.png" alt="packages" width="800"/> 

## View
#### Toggle the Button
We want to change the button `Add Product` in the edit mode
`admin/edit-product.ejs`
<img src="./assets/S9/105.png" alt="packages" width="800"/>

Change the text when in edit mode
`admin/edit-product.ejs`
<img src="./assets/S9/106.png" alt="packages" width="800"/>
<img src="./assets/S9/107.png" alt="packages" width="800"/>
- if check to toggle button text

Output - when we go to Edit Product
<img src="./assets/S9/108.png" alt="packages" width="800"/>

Output - when we go to Add Product 
<img src="./assets/S9/109.png" alt="packages" width="800"/>

Set editing to `false` when adding product 
`controllers/admin.js`
<img src="./assets/S9/110.png" alt="packages" width="800"/>

Output - when we go to Add Product Now
<img src="./assets/S9/111.png" alt="packages" width="800"/>

#### Toggle the Action

We need to change the route we are sending th request to (the action property of the form)
`admin/edit-product.ejs`
<img src="./assets/S9/112.png" alt="packages" width="800"/>

Make the action dynamic depending on the editing property
`admin/edit-product.ejs`
<img src="./assets/S9/113.png" alt="packages" width="800"/>
<img src="./assets/S9/114.png" alt="packages" width="800"/>

Output - click on the Update Product button should take you to the edit route
<img src="./assets/S9/115.png" alt="packages" width="800"/>
<img src="./assets/S9/116.png" alt="packages" width="800"/>

#### Pre-populate edit page with product information
Recall that we are passing product
`controllers/admin.js`
<img src="./assets/S9/117.png" alt="packages" width="800"/>

We can use that in our view
`admin/edit-product.ejs`
<img src="./assets/S9/118.png" alt="packages" width="800"/>

Make the input dynamic using if condition
`admin/edit-product.ejs`
<img src="./assets/S9/122.png" alt="packages" width="800"/>
<img src="./assets/S9/123.png" alt="packages" width="800"/>
<img src="./assets/S9/124.png" alt="packages" width="800"/>
<img src="./assets/S9/125.png" alt="packages" width="800"/>
 
Output
<img src="./assets/S9/126.png" alt="packages" width="800"/>

# S9 | Linking to the Edit Page
We have to change the `href` which takes us to the edit page.
`admin/products.ejs`
<img src="./assets/S9/127.png" alt="packages" width="800"/>

Add the id of the product
`admin/products.ejs`
<img src="./assets/S9/128.png" alt="packages" width="800"/>

## Output - till now - before we set the editing mode
<img src="./assets/S9/129.png" alt="packages" width="800"/>

We get redirected ! 
<img src="./assets/S9/130.png" alt="packages" width="800"/>
- What could be the issue here ?
  - We are not sending any query parameter : `edit`
  `controller/admin.ejs`
  <img src="./assets/S9/131.png" alt="packages" width="800"/>


## Lets set the query parameter
`admin/products.ejs`
<img src="./assets/S9/132.png" alt="packages" width="800"/>

#### Output - after adding query parameter
<img src="./assets/S9/133.png" alt="packages" width="800"/>
<img src="./assets/S9/134.png" alt="packages" width="800"/>

## Lets make sure update product does something
<img src="./assets/S9/135.png" alt="packages" width="800"/>

#### Route
Register this route
`routes/admin.js`
<img src="./assets/S9/137.png" alt="packages" width="800"/>
- this is a `POST` request. So data can be sent in the request we are sending.

#### Controller
Add the middleware function in the Controller to handle the request
`controller/admin.js`
<img src="./assets/S9/138.png" alt="packages" width="800"/>
- we want to construct a new product and 
- replace the exiting one with this product.
- this means : we need to work on the product model

#### Product Model
Next lecture

# S9 | Editing the Product Data

We have to edit the save method of the Product model so that it can save an existing product.
`models/product.js`
<img src="./assets/S9/139.png" alt="packages" width="800"/>

Have an id property in the constructor
`models/product.js`
<img src="./assets/S9/140.png" alt="packages" width="800"/>
- Now we can use this id to edit existing product

Modify `save()` method logic   
`models/product.js`
<img src="./assets/S9/141.png" alt="packages" width="800"/>
- if id exists new id wont be created 
- it will update the existing one

But we need all the products
`models/product.js`
<img src="./assets/S9/142.png" alt="packages" width="800"/>

Find the product you want to edit
`models/product.js`
<img src="./assets/S9/143.png" alt="packages" width="800"/>

Update product 
`models/product.js`
<img src="./assets/S9/144.png" alt="packages" width="800"/>
- `this` refers to the updated product
- using `spread` operator to copy the array.

Write to file - the new product list.
`models/product.js`
<img src="./assets/S9/145.png" alt="packages" width="800"/>
- `save()` can now add new products and 
- edit existing products


## Controller
#### `postAddProduct()`
We need to set null as the id - since this is what we have set as the constructor
`controllers/admin.js`
<img src="./assets/S9/146.png" alt="packages" width="800"/>
Set `null`
<img src="./assets/S9/147.png" alt="packages" width="800"/> 

#### `postEditProduct()`
`controllers/admin.js`
<img src="./assets/S9/149.png" alt="packages" width="800"/>
**Next Actions**
- fetch info of the product
- create a new product instance 
- populate the product with that info
- call `save()`

Get the product id from the `req.body`
`controllers/admin.js`
<img src="./assets/S9/153.png" alt="packages" width="800"/>

Set the updated information of the product
`controllers/admin.js`
<img src="./assets/S9/154.png" alt="packages" width="800"/>

Save the edited product
`controllers/admin.js`
<img src="./assets/S9/155.png" alt="packages" width="800"/>

## View 
Add a hidden input which stores the existing productId
`admin/edit-product.ejs.js` 
<img src="./assets/S9/148.png" alt="packages" width="800"/>

Output hidden input if in editing mode
`admin/edit-product.ejs.js` 
<img src="./assets/S9/150.png" alt="packages" width="800"/>

Value as the product.id
`admin/edit-product.ejs.js` 
<img src="./assets/S9/151.png" alt="packages" width="800"/>

Give a name to the input 
`admin/edit-product.ejs.js` 
<img src="./assets/S9/152.png" alt="packages" width="800"/>
- so that you can access it in the  `req.body` in the controller  

## Route
Register the route
`routes/admin.js`
<img src="./assets/S9/156.png" alt="packages" width="800"/>

## Output
Click update with some !!! in the title
This will create an error since no response was sent but the product will be edited successfully.
<img src="./assets/S9/157.png" alt="packages" width="800"/>

<img src="./assets/S9/158.png" alt="packages" width="800"/>

See the json file
<img src="./assets/S9/159.png" alt="packages" width="800"/>

## Controller
Send the response to avoid error
`controllers/admin`
<img src="./assets/S9/161.png" alt="packages" width="800"/>
f
## Output
After redirection after editing 
<img src="./assets/S9/162.png" alt="packages" width="800"/>

## Lets Code the Above !! 
[YES] - Coded ? 

# S9 | Adding the Product-Delete Functionality
---
## Objective 
1. Delete products from Admin

## Lets Code Myself Before I See Anymore !! 
[YES] - Coded ? 

## View
We need to handle this route. 
`admin.products.ejs`
<img src="./assets/S9/163.png" alt="packages" width="800"/>

Add a hidden input with `name=productId` property so that we can access it in the request handler as `req.body.productId`
`admin.products.ejs`
<img src="./assets/S9/163.1.png" alt="packages" width="800"/>

## Route
Register a route for deleting product
`routes/admin.js`
<img src="./assets/S9/164.png" alt="packages" width="800"/>
- we can pass data as req.body since this is a `POST` request

Connect to the controller
`routes/admin.js`
<img src="./assets/S9/164.1.png" alt="packages" width="800"/>

## Controller 

Add a middleware function to handle the delete request
`controllers/admin.js`
<img src="./assets/S9/165.png" alt="packages" width="800"/>

Get the prodId
`controllers/admin.js`
<img src="./assets/S9/165.1.png" alt="packages" width="800"/>

## Model
Add a static method `deleteById`
`models/product.js`
<img src="./assets/S9/166.png" alt="packages" width="800"/>

Use `filter` to keep all products except the one to delete
`models/product.js`
<img src="./assets/S9/166.1.png" alt="packages" width="800"/>
- save the updated products back to the file.

Remove the product from the cart as well. Since it actually does not exist in the store.
`models/product.js`
<img src="./assets/S9/166.3.png" alt="packages" width="800"/>

# S9 | Deleting Cart Items - 
- ( When product is deleted from the Admin Page ) 
---
## Lets Code Myself Before I See Anymore !! 
[YES] - Coded ? 

## Model - Cart
Define a new static method in the cart model
`models/cart.js`
<img src="./assets/S9/107.1.png" alt="packages" width="800"/>

Read My Cart file
`models/cart.js`
<img src="./assets/S9/107.2.png" alt="packages" width="800"/>

If error then just return - nothing to delete
`models/cart.js`
<img src="./assets/S9/107.3.png" alt="packages" width="800"/>

If cart found then 
`models/cart.js`
<img src="./assets/S9/107.4.png" alt="packages" width="800"/>
- find the prodcut to delete
- use `filter()` so that updatedCart has all products except the on to delete
- update the totalPrice of the cart

Write back the cart
`models/cart.js`
<img src="./assets/S9/107.5.png" alt="packages" width="800"/>

Bug - use `fileContent` instead of `cart`
`models/cart.js`
<img src="./assets/S9/107.7.png" alt="packages" width="800"/>

## Model - Product
Use the Cart model to delete the product from the cart when admin deletes the product from the store  
`models/product.js`
<img src="./assets/S9/108.1.png" alt="packages" width="800"/>

Find the product using `filter` and pass the `product.price` 
`models/product.js`
<img src="./assets/S9/108.2.png" alt="packages" width="800"/>

## Controller - Admin
Use the Product model to delete the product from store and cart if required
`controller/admin.js`
<img src="./assets/S9/109.1.png" alt="packages" width="800"/>

Redirect to the `admin/products`
`controller/admin.js`
<img src="./assets/S9/109.2.png" alt="packages" width="800"/>
- It would be best to have a callback in deleteById
- So that we only **redirect** only when we are done deleting the product. Something like this : 
  ```js
    Product.deleteById(prodId, () => {
      res.redirect('/admin/products');
    })
  ```

# S9 | Displaying Cart Items on the Cart Page
---
## Lets Code Myself Before I See Anymore !!
[YES] - Coded ? 

## Model - Cart
Define `getCart` function to retrieve the entire cart 
`model/cart.js`
<img src="./assets/S9/111.1.png" alt="packages" width="800"/>

## Controller - shop.js
Use the getCart method in the controller
`controllers/shop.js`
<img src="./assets/S9/112.1.png" alt="packages" width="800"/>

We will also fetch the products as a nested callback - after we get the cart
`controllers/shop.js`
<img src="./assets/S9/112.2.png" alt="packages" width="800"/>

Check which products among the retrieved exist in the cart
`controllers/shop.js`
<img src="./assets/S9/112.4.png" alt="packages" width="800"/>

Add the products from the product.json file that already exsits in the cart to an array `cartProducts`
`controllers/shop.js`
<img src="./assets/S9/112.5.png" alt="packages" width="800"/>

But we also need the quantity of the product - which is a part of the cart data
`controllers/shop.js`
<img src="./assets/S9/112.6.png" alt="packages" width="800"/>

Use info from product.json and cart.json to fillup the cartProducts with latest data
`controllers/shop.js`
<img src="./assets/S9/112.7.png" alt="packages" width="800"/>

Pass the `cartProducts` to render the cart
`controllers/shop.js`
<img src="./assets/S9/112.8.png" alt="packages" width="800"/>
- If there is no products in the view, the cart will be an empty array and we can check that in our template

## View - `cart.ejs`
Lets have the basic common structure first and main section
`shop/cart.ejs`
<img src="./assets/S9/110.1.png" alt="packages" width="800"/>

Render products conditionally
`shop/cart.ejs`
<img src="./assets/S9/110.2.png" alt="packages" width="800"/>

Use the productData nested as an object property
`shop/cart.ejs`
<img src="./assets/S9/110.3.png" alt="packages" width="800"/>

Recall what the object passed to render holds
<img src="./assets/S9/110.4.png" alt="packages" width="800"/>

`shop/cart.ejs`
<img src="./assets/S9/110.5.png" alt="packages" width="800"/>

## Output
<img src="./assets/S9/113.1.png" alt="packages" width="800"/>
<img src="./assets/S9/113.2.png" alt="packages" width="800"/>
<img src="./assets/S9/113.3.png" alt="packages" width="800"/>

# S9 | Deleting Cart Items -  
## ( from inside the cart itself  ) 
---
## Lets Code Myself Before I See Anymore !! 
[YES] - Coded ? 

## View - `cart.ejs`
Lets add a `Delete` button inside a form - to delete a cart product
`shop/cart.ejs`
<img src="./assets/S9/114.1.png" alt="packages" width="800"/>

Add a hidden productId input so that it is passed as req.body to the controller.
`shop/cart.ejs`
<img src="./assets/S9/114.3.png" alt="packages" width="800"/>

Output 
<img src="./assets/S9/114.2.png" alt="packages" width="800"/>

## Router - `shop.js`
Register a route
`routes/shop.js`
<img src="./assets/S9/115.1.png" alt="packages" width="800"/>

Register a route
`routes/shop.js`
<img src="./assets/S9/115.2.png" alt="packages" width="800"/>

## Controller - `shop.js`
We need a middleware to handle this request
`controllers/shop.js`
<img src="./assets/S9/116.1.png" alt="packages" width="800"/>

Find the product and then delete by passing the required info
`controllers/shop.js`
<img src="./assets/S9/116.2.png" alt="packages" width="800"/>

Redirect to the cart 
`controllers/shop.js`
<img src="./assets/S9/116.3.png" alt="packages" width="800"/>

## Output
<img src="./assets/S9/117.1.png" alt="packages" width="800"/>
<img src="./assets/S9/117.2.png" alt="packages" width="800"/>

## Next Action
1. Add Database to our project
2. Redirect in callback - i.e - once the file access is complete

# S9 | Fixing a Delete Product Bug
---
## Bug
If we try to delete a product which is not in the cart then we get an error. 
<img src="./assets/S9/118.1.png" alt="packages" width="800"/>
<img src="./assets/S9/118.2.png" alt="packages" width="800"/>

We get an error because we try to access the qty of a prodc which we do not have 
<img src="./assets/S9/118.3.png" alt="packages" width="800"/>

## Fix
#### Model - Product
We are deleting the prodcut from the cart here
`models/shop.js`
<img src="./assets/S9/119.1.png" alt="packages" width="800"/>
- Problem is that not every product is in a cart

#### Model - Cart
We need to check if the given product is part of the cart 
`models/cart.js`
<img src="./assets/S9/120.1.png" alt="packages" width="800"/>
- Here we need to check 

Return if product is not found inside cart
`models/cart.js`
<img src="./assets/S9/120.2.png" alt="packages" width="800"/>
- This should solve the issue.

# S9 | Module Summary 
--- 
<img src="./assets/S9/167.png" alt="packages" width="800"/>

## Lets Code the Above !! 
[YES] - Coded ? 

# S9 | Useful Resources
Useful resources:
Official Routing Docs: https://expressjs.com/en/guide/routing.html