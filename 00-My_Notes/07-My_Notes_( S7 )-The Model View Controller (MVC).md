# S7 | Module Introduction

<img src="./assets/S7/0.png" alt="packages" width="800"/> 

# S7 | What Is The Mvc
---
<img src="./assets/S7/1.png" alt="packages" width="800"/> 

## How Routes Fit Into This Picture

**Routes** - are basically the things which define upon which path for which http method which **controller** code should execute 

**Controller** - is then the thing defining with which model to work and which view to render.

**[Note]** - An express app (like ours) heavily relies on middleware concept. 
The controllers are also kind of split up across middleware functions or some of the logic might be separated and moved into another middleware function
But we'll see all of that and we'll get there step by step.

# S7 | Adding Controllers
---

## Initial folder structure 

<img src="./assets/S7/2.png" alt="packages" width="300"/> 

## Identifying Controllers In Our Project

**Controller** 

It connects model (`products`) with views.(`render`) So our routers (`admin.js , shop.js`) already has the controller logic inside.
<img src="./assets/S7/3.png" alt="packages" width="600"/> 
<img src="./assets/S7/4.png" alt="packages" width="600"/> 

But if we tend to put all logic at the same place it would make our route files too big. So we can break the logic into separate controllers and manage better.

## Lets Make a Contoller

Folder
<img src="./assets/S7/5.png" alt="packages" width="300"/> 

Each **Router** might have a single **Controller**.
Or there might be multiple **Controllers** for a single **Route** and vice versa.
We will store all product related logic in the **`products.js`** controller.
<img src="./assets/S7/6.png" alt="packages" width="300"/> 

Transfer logic from `admin.js`
<img src="./assets/S7/7.png" alt="packages" width="800"/> 

To `controllers/products.js`
<img src="./assets/S7/8.png" alt="packages" width="800"/> 

Export the function
<img src="./assets/S7/9.png" alt="packages" width="800"/> 
this is same as a middleware function through which requests are funnelled. 

All product related logic should reside in this controller.

Import controller in `admin.js` and use it as middleware functions as before.
<img src="./assets/S7/10.png" alt="packages" width="800"/> 

pass the reference to the function
<img src="./assets/S7/12.png" alt="packages" width="800"/> 

Repeat this for adding a new product
<img src="./assets/S7/13.png" alt="packages" width="800"/> 
<img src="./assets/S7/14.png" alt="packages" width="800"/> 

To `controllers/products.js`
<img src="./assets/S7/15.png" alt="packages" width="800"/> 

But we dont have the products array variable ! Let add the array after removing from the `admin.`js file
<img src="./assets/S7/16.png" alt="packages" width="800"/> 

**`admin.js` - add the func ref and remove the exports**

Before
<img src="./assets/S7/17.png" alt="packages" width="800"/> 

After 
<img src="./assets/S7/18.png" alt="packages" width="800"/> 

## Adjust the app.js where we are importing the routes.

Before
<img src="./assets/S7/19.png" alt="packages" width="800"/> 

After
<img src="./assets/S7/20.png" alt="packages" width="800"/> 

## `shop.js` - Lets add controller to this.

Before adding controller function
<img src="./assets/S7/21.png" alt="packages" width="800"/> 

**After adding**
`controllers/products/js`
<img src="./assets/S7/22.png" alt="packages" width="800"/> 

`shop.js` - add controller func ref after removing imports 
<img src="./assets/S7/23.png" alt="packages" width="800"/> 
<img src="./assets/S7/24.png" alt="packages" width="800"/> 

## Output
<img src="./assets/S7/25.png" alt="packages" width="800"/> 

## Legacy Notes (Old)
---

* We already had controller logic inside our route files namely : _admin.js_ and _shop.js_

* Now we will extract those logic and place them in a separate .js file which we will call controller.

* As we know from above the controller is responsible for the internal logic and connecting the models and views.

* We will have separate controllers according to what they deal with e.g product.js will only deal with logic relevant to products.

### Lets Code! (I mean lets extract!)

#### Step-1

_admin.js_ (before extraction)

```js

// # Import rootDirectory variable from Utility > path.js
const rootDir = require('../utility/path') 

// ## Form to send user request
router.get("/add-product", (req, res, next) => {
  console.log("[admin.js] -> get -> /add-product");  
  // Rendering the template "add-product.pug"
  res.render(
    'add-product', {
      title: 'Add Product', 
      path: '/admin/add-product',
      activeAddProduct: true,
      formsCSS: true,
      productCSS: true
    })
  
});

```

_controllers/products.js_

```js
// extracted from admin.js
exports.getAddProduct = (req, res, next) => {
  console.log("[admin.js] -> get -> /add-product");
  // Rendering the template "add-product.pug"
  res.render("add-product", {
    title: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true
  });
};

```

_admin.js_(after extraction)

```js
// # Import rootDirectory variable from Utility > path.js
- const rootDir = require('../utility/path') // we dont need this rootDir

// # Import Controller
+ const productsController = require('../controllers/products');

// ## Form to send user request
+ router.get("/add-product", productsController.getAddProduct);
```

#### Step-2

_admin.js_ (before extraction)

```js

// # Store the products 
const products = [];

// ## Handling Incoming request - Add incoming product to products list
router.post("/add-product", (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect("/");
});

// Export router, products
module.exports.routes = router;
module.exports.products = products;

```

_controllers/products.js_

```js
// # Store the products
const products = [];

// Extracted from the admin.js route
exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

```

_admin.js_ (after extraction)

```js

// ## Handling Incoming request - Add incoming product to products list
router.post("/add-product", productsController.postAddProduct);

// Export router, products
module.exports = router;

```

#### Step-3

_shop.js_ (before extraction)

```js  
//...

router.get("/", (req, res, next) => {
    console.log('In shop middleware')    

    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))

    // Pass products to the shop.pug template 
    const products = adminData.products;
    
    /** Render the template (pug, hbs, ejs,etc) as response
     * res.render('shop') // i.e render shop.pug when using pug as the view engine
     * `products`: passing this variable to the template as key-value pair    
     * `path`: variable to decide active class on the navbar link in the main-layout
     * hasProducts: boolean variable to flag whether product list is empty. Keeps logic inside the node.js express content and not template
     */
    res.render('shop', {
        prods: products, 
        title: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0, //boolean used in if..else loop
        activeShop: true, //boolean used to add active class dynamically to nav links
        productCSS: true, //boolean used to add css links conditionally as contents
        // layout: false // ** can do this to stop default layout being used ! **
    });

});

//...

```

_controllers/products.js_

```js
// This is extracted from the shop.js route
exports.getProducts = (req, res, next) => {

    /** Render the template (pug, hbs, ejs,etc) as response
     * res.render('shop') // i.e render shop.pug when using pug as the view engine
     * `products`: passing this variable to the template as key-value pair
     * `path`: variable to decide active class on the navbar link in the main-layout
     * hasProducts: boolean variable to flag whether product list is empty. Keeps logic inside the node.js express content and not template
     */  

    res.render('shop', {
        prods: products, 
        title: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0, //boolean used in if..else loop
        activeShop: true, //boolean used to add active class dynamically to nav links
        productCSS: true, //boolean used to add css links conditionally as contents
        // layout: false // ** can do this to stop default layout being used ! **
    });

}
```

_shop.js_ (after extraction)

```js
const express = require("express");
const path = require('path');

// Import product controller
+ const productsController = require('../controllers/products');

const router = express.Router();

// Use the function exported by the product controller
+ router.get("/", productsController.getProducts);

module.exports = router;

```

### Step-4

_app.js_ (after)

```diff

// # Import Routes
- const adminData = require('./routes/admin');
+ const adminRoutes = require('./routes/admin');

// ## Using Routes
- app.use('/admin', adminData.routes);
+ app.use('/admin', adminRoutes);

```
# S7 | Finishing the Controllers
---

## 404.js - adding controller to the 404 route

Before  
<img src="./assets/S7/26.png" alt="packages" width="800"/>

`controllers/error.js`
<img src="./assets/S7/27.png" alt="packages" width="800"/>

`app.js` - import the errorController and use it 
<img src="./assets/S7/28.png" alt="packages" width="800"/>
<img src="./assets/S7/29.png" alt="packages" width="800"/>

## Legacy Notes (Old)
---

### Handle 404

_error.js_

```js 
exports.get404 = (req, res, next) => {
  res.status(404).render("404", { title: "404", path: "/404" });
};

```

_app.js_

```diff 
// ## Handle Unknown request
- app.use('/', (req, res, next) => {  
-    res.status(404).render('404',{title: '404', path: '/404'})
- })

+ app.use('/', errorController.get404);
```

# S7 | Adding Product Model
---

## Whats the current model in our project

Its the product array.
<img src="./assets/S7/30.png" alt="packages" width="800"/>

## Creating the product model

`models` - folder
<img src="./assets/S7/31.png" alt="packages" width="300"/>

`model/product.js` - the Product Model

You can have the model as a constructor function
<img src="./assets/S7/32.png" alt="packages" width="800"/> 

You can also use the Es6 syntax and created classes.
<img src="./assets/S7/33.png" alt="packages" width="800"/>

Store the product object in an array (immitating a DB) 
<img src="./assets/S7/34.png" alt="packages" width="800"/>

Fetch All Products. 
This should be a class level function not an object level function. 
`Static Method` -  So that we can call the function directly on the class.
<img src="./assets/S7/41.png" alt="packages" width="800"/>


## Modifying the Product controller - to use the Product Model

`controllers/products.js`
**Delete** : line - 1 , line - 14, line - 18 
So that no product array related logic is left in the file
<img src="./assets/S7/36.png" alt="packages" width="800"/>

Import the Product Class - And use it in the middlewares
<img src="./assets/S7/37.png" alt="packages" width="800"/>
<img src="./assets/S7/38.png" alt="packages" width="800"/>
the `req.body.title` is coming from the `name` property in the form input.

 Save the product 
 <img src="./assets/S7/39.png" alt="packages" width="800"/>

Fetch All Products 
<img src="./assets/S7/40.png" alt="packages" width="800"/>

## Output - using a Model
<img src="./assets/S7/42.png" alt="packages" width="800"/>

## Legacy Notes (Old)
---

### Create The Product Model

_models/product.js_

```js 
const products = []; // later will be replaced by DATABASE

module.exports = class Product {
  constructor(t) {
      this.title = t;
  }

  save() {
      products.push(this);
  }

  static fetchAll() { // static functions can be directly called from the class
      return products; // return the product list
  }
}
```

### Modify The Controller To Use The Product Model

_controllers/products.js_

```diff 
// # Store the products
- const products = [];

// Import the Product class as the model
+ const Product = require("../models/product");

// this function will get the Add Product form
exports.getAddProduct = (req, res, next) => {
  // Rendering the template "add-product.pug"
  res.render("add-product", {
    title: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true
  });
};

// ## Handling Incoming request - Add incoming product to products list
exports.postAddProduct = (req, res, next) => {

- products.push({ title: req.body.title });

  //Create local product object and then push in the products list exposed as a global variable in the file "../models/product.js"

+  const product = new Product(req.body.title);
+  product.save(); // stores the product in the product list
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // use static method of the class to retrieve the product list  
+  const products = Product.fetchAll();


  res.render("shop", {
    prods: products,
    title: "Shop",
    path: "/",
    hasProducts: products.length > 0, //boolean used in if..else loop
    activeShop: true, //boolean used to add active class dynamically to nav links
    productCSS: true //boolean used to add css links conditionally as contents
    // layout: false // ** can do this to stop default layout being used ! **
  });
};


```

### Output Same As Before - But Now We Use `Model`

<img src="./assets/S7//model.png" alt="packages" width="600"/>


# S7 | Storing Data In Files Via Model
---

## Objective 

* We will use a file to store the products
* Before adding a new product -  
  * We will retrieve existing products by parsing the file.
  * Then push the new product and then write the file with the updated list.

## Working with the file system

import the `fs and path` packages
<img src="./assets/S7/43.png" alt="packages" width="800"/>

rootDir 
<img src="./assets/S7/44.png" alt="packages" width="800"/>

data/products.json
<img src="./assets/S7/45.png" alt="packages" width="300"/>

save()
<img src="./assets/S7/46.png" alt="packages" width="800"/>

readFile( _path, callback )
<img src="./assets/S7/47.png" alt="packages" width="800"/>

## Output

Add product 
<img src="./assets/S7/48.png" alt="packages" width="800"/>

crashed
<img src="./assets/S7/49.png" alt="packages" width="800"/>

undefined from the save() function console
<img src="./assets/S7/50.png" alt="packages" width="800"/>

logging the error
<img src="./assets/S7/51.png" alt="packages" width="800"/>
no such file or directory

## Working with `save()` function 

Retrieve products from file if file exists i.e. no error.
<img src="./assets/S7/53.png" alt="packages" width="800"/>

Append my new product
<img src="./assets/S7/54.png" alt="packages" width="800"/>

The `this` keyword will refer to the Product class only when we use an arrow function. Otherwise it will loose the context of `this`.
**Arif(to check) - Test to check what becomes the context if arrow finction was not used**
<img src="./assets/S7/55.png" alt="packages" width="800"/>

**Save back the file with the newly added product**
Use `writeFile( _path, _data, _callback )` method 
Use JSON.stringify
<img src="./assets/S7/56.png" alt="packages" width="800"/>

`save()`
<img src="./assets/S7/57.png" alt="packages" width="800"/>

## Output
<img src="./assets/S7/58.png" alt="packages" width="800"/>
<img src="./assets/S7/59.png" alt="packages" width="800"/>
<img src="./assets/S7/60.png" alt="packages" width="800"/>

## Fetch the data from the file

return empty array in case of error.
<img src="./assets/S7/61.png" alt="packages" width="800"/>

add the file path variable `p`
<img src="./assets/S7/62.png" alt="packages" width="800"/>

## Legacy Notes (Old)
---

### Code 

#### Step-1 - Code The Model To Use File As Data Storage

Check the comments carefully!

_models/product.js_

```js 
- // const prods = []; // later will be replaced by DATABASE

const fs = require("fs");
const path = require("path");
const rootDir = require("../utility/path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
-    //   products.push(this);

    const p = path.join(rootDir, "data", "products.json");

    // Read products from file if exist
    fs.readFile(p, (err, fileContent) => {
      let products = [];

      if (!err) { // products.json exists
        products = JSON.parse(fileContent);
      }

      /**
       * Add either to empty array or to the products we get from the file.
       * `this` refers to the current product.
       */
      products.push(this);

      /**
       * Write the updated product list back to the file
       * if file does not exist it will be created
       */
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
      
    });
  }

  static fetchAll() {
    const p = path.join(rootDir, "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
       if(err) {
           console.log("fetchAllError->>", err);
           return [];
       }
       console.log(JSON.parse(fileContent));
       return JSON.parse(fileContent);
    })
-    // return prods; // return the product list
  }
};
```

  1. We have to update almost everywhere. Compare with the previous version of the model : `product.js`
  2. Note that the data/products.json file should not exist initially.
  3. For the first created product, the product.json file gets created.
  4. If we start with a manually created empty product.json file we get the following error with the code above.
  <img src="./assets/S7/error1.png" alt="packages" width="600"/> 

#### Recall The Controller `_controllers/products.js_` Code 

Note how the controller interacts with the Model product.js.

```js 

// Import the Product class as the model
const Product = require("../models/product");

// This function will get the Add Product form
exports.getAddProduct = (req, res, next) => {
  // Rendering the template "add-product.pug"
  res.render("add-product", {
    title: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true
  });
};

// ## Handling Incoming request - Add incoming product to products list
exports.postAddProduct = (req, res, next) => {

  //products.push({ title: req.body.title });

  //Create local product object and then push in the products list exposed as a global variable in the file "../models/product.js"
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // use static method of the class to retrieve the product list  
  const products = Product.fetchAll();
  
  res.render("shop", {
    prods: products,
    title: "Shop",
    path: "/",
    hasProducts: products.length > 0, //boolean used in if..else loop
    activeShop: true, //boolean used to add active class dynamically to nav links
    productCSS: true //boolean used to add css links conditionally as contents
    // layout: false // ** can do this to stop default layout being used ! **
  });
};

```

### Output 

We get an error after the above steps when we add a product from the UI. But the product gets added to the product.json file.

#### _product.json_

**the file** 

<img src="./assets/S7/pjfile.png" alt="packages" width="300"/>

**file content**

<img src="./assets/S7/pjson1.png" alt="packages" width="300"/>


#### Home Page Error

<img src="./assets/S7/error2.png" alt="packages" width="600"/>


#### Question?

Do you know why we see this error.

**Hint:** Asynchrounous!!


# S7 | Fetching Data From The Files Via The Model
---

## Why Do We See The Error ? 

<img src="./assets/S7/error2.png" alt="packages" width="600"/>

## The Reason - Analyse The Code Snippet and Comments

Whats wrong with this code ?
<img src="./assets/S7/65.png" alt="packages" width="800"/>
The highlighted portion is an asynchronous callback which runs at a later time ! So the function that returns a array for the retrieved products from the file only registers itself and executes only when the file has been read fully in an asynchronous manner.

So `fetchAll()` does not return anything and therefore its undefined

This gives rise to an error when we try to access the length in our `shop.ejs` file
<img src="./assets/S7/66.png" alt="packages" width="800"/>

**Note** : The error happens when we try to visit the root url `"/"`

## The Solution - Introduce Callback

<img src="./assets/S7/67.png" alt="packages" width="800"/>

line 27, 35, 37. We will call the callback function passed to the `fetchAll()`.
<img src="./assets/S7/68.png" alt="packages" width="800"/>

**`contorllers/product.js`** - define the callback

`fetchAll`
<img src="./assets/S7/69.png" alt="packages" width="800"/>
`fetchAll`
<img src="./assets/S7/70.png" alt="packages" width="800"/>
`fetchAll`
<img src="./assets/S7/72.png" alt="packages" width="800"/>

The callback uses the product it gets from `fethAll()` to render the template.

## Output

<img src="./assets/S7/73.png" alt="packages" width="800"/>

## Legacy Notes (Old)
--- 
_models/product.js_
_
```js 

  static fetchAll() {
    const p = path.join(rootDir, "data", "products.json");

    /**
     * readFile runs the 2nd arg which is a callback function once it finishes reading from the file. Meanwhile the code below this block continues to execute. So the controller code that calls fechAll() expecting a product does not immediately receive a product.
     * We need to setup a way so that fetchAll() can do the desired task once it gets the product list asynchrounously.
     */
    fs.readFile(p, (err, fileContent) => {
       if(err) {
           console.log("fetchAllError->>", err);
           return [];
       }
       console.log(JSON.parse(fileContent));
       return JSON.parse(fileContent);
    })    
  }
};

```


_controller/products.js_

```js
exports.getProducts = (req, res, next) => {
  /** Model Static Method - to Retrieve the product list  
   * fetchAll() - does not return the product list immediately since it runs an asynchronous code. 
   * i.e. it does not wait for reading the whole product.json file
   * thus `products` in the code below is "undefined"
   */
  const products = Product.fetchAll(); // products = "undefined" 
  
  res.render("shop", {
    prods: products,
    title: "Shop",
    path: "/",
    hasProducts: products.length > 0, //boolean used in if..else loop
    activeShop: true, //boolean used to add active class dynamically to nav links
    productCSS: true //boolean used to add css links conditionally as contents
    // layout: false // ** can do this to stop default layout being used ! **
  });
};


```

#### The Solution - Introduce Callback

_models/product.js_

```js
+  static fetchAll(callback) {
    const p = path.join(rootDir, "data", "products.json");

    /**
     * readFile runs the 2nd arg which is a callback function once it finishes reading from the file. Meanwhile the code below this block continues to execute. So the code that call fechAll() expecting a product does not immediately receive a product.
     * We need to setup a way so that fetchAll() can do the desired task once it gets the product list asynchrounously.
     * Lets have a callback function as an argument of fetchAll() which will be executed once the products.json file has been read.
     */
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (err) {
        console.log("fetchAllError->>", err);
        //return [];
        products = [];
+       callback(products); //pass products to the callback
        return;
      }
      console.log(JSON.parse(fileContent));
      //return JSON.parse(fileContent);
      products = JSON.parse(fileContent);
+      callback(products);
    });
  }
};

```

_controllers/products.json_

```js
exports.getProducts = (req, res, next) => {
  /** Model Static Method - to Retrieve the product list
   * fetchAll() - does not return the product list immediately since it runs an asynchronous code.
   * i.e. it does not wait for reading the whole product.json file
   * thus `products` in the code below is "undefined"
   */

  /** Solution
   * lets define a callback funtion `renderShopWithProducts` which will be called with the returned json products inside the fetchAll() function block once the product.json file has been read completely.
   * `renderShopWithProducts` function will accept the retrieved `products` as the argument and render accordingly
   */
+  const renderShopWithProducts = products => {
    res.render("shop", {
      prods: products,
      title: "Shop",
      path: "/",
      hasProducts: products.length > 0, //boolean used in if..else loop
      activeShop: true, //boolean used to add active class dynamically to nav links
      productCSS: true //boolean used to add css links conditionally as contents
      // layout: false // ** can do this to stop default layout being used ! **
    });
  };

-  // const products = Product.fetchAll();
+  Product.fetchAll(renderShopWithProducts);

};
```

# S7 | Refactoring The File Storage Code
---

## Refactoring the Product - Model

### `fetchAll()` - refactoring 

structure
<img src="./assets/S7/74.png" alt="packages" width="800"/>

`getProductsFromFile()` - this should do all that `fetchAll` does
<img src="./assets/S7/79.png" alt="packages" width="800"/>
` return cb([]); ` - the return is to make sure that code below does not execute

`fetchAll()` - modified
Forward the callback `cb`
<img src="./assets/S7/77.png" alt="packages" width="800"/>

### `save()` - refactoring 

Before refactoring
<img src="./assets/S7/78.png" alt="packages" width="800"/>

**Refactorinig...!**
- Getting the products from the `getProductsFromFile()`
<img src="./assets/S7/81.png" alt="packages" width="800"/>

Define the anonymous callback function that will be executed after getting the products!
<img src="./assets/S7/82.png" alt="packages" width="800"/>
- make sure to have the => function so that `this` always refers to the class and consequently the object of the class
- we no more need to readFile
- we will just write to the file once the product list has been updated

## Output - Error

<img src="./assets/S7/83.png" alt="packages" width="800"/>
- `p` is not defined inside `save()`

<img src="./assets/S7/84.png" alt="packages" width="800"/> 

## Solution

Declare the `p` variable as global
<img src="./assets/S7/85.png" alt="packages" width="800"/>
- so all the functions can access this now

## Output

<img src="./assets/S7/86.png" alt="packages" width="800"/>

## Legacy Notes (Old)
---

_models/product.js_

```js
const fs = require("fs");
const path = require("path");
const rootDir = require("../utility/path");
const p = path.join(rootDir, "data", "products.json");

// Helper Method - getProductsFromFile(callback)
/**
 * getProductsFromFile accepts a callback function which gets executed once it gets the products from the file.
 */
const getProductsFromFile = callback => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]); //pass products to the callback
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  
  constructor(t) {
    this.title = t;
  }

  save() {
    // Read products from file if exist
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};

```

# S7 | Wrap

---

<img src="./assets/S7/wrapS7.png" alt="packages" width="800"/> 


# S7-L101 | Useful Links

---

## To Know More on **MVC** [Click Me](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Modern_web_app_architecture/MVC_architecture)

<img src="./assets/S7/90.png" alt="packages" width="800"/> 