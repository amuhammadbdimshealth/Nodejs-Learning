# S5 | Working with express.js
---

## S5-L56 | Module Introduction
---


<img src="./assets/S5/s5l1.png" alt="packages" width="800"/> 

## S5-L57 | What is Express.js
---

<img src="./assets/S5/expresswhatwhy.png" alt="packages" width="800"/>

<img src="./assets/S5/alternatives.png" alt="packages" width="400"/>

## S5-L58 | Installing Express.js
---

### Installing 

`$ npm install express --save`

Check the package.json file 

```js
  "dependencies": {
    "express": "^4.16.4"
  }
```


### Using express.js

```javascript 
const http = require("http");

const express = require('express');

//you can create an express application and store it in a constant named app
const app = express(); 

/*
* Now the app here actually also happens to be a valid request handler, so
 you can pass app here to createserver

* It will not handle any requests though because we haven't defined any logic
 that should happen for incoming requests

* It does one thing for you and that is it sets up a certain way of handling
 incoming requests that defines or that is a key characteristic of expressjs 
*/

const server = http.createServer(app);
  
server.listen(3000); // servers starts listening to incoming requests.

```

## S5-L59 | Adding Middleware
---

<img src="./assets/S5/coreconceptex.png" alt="packages" width="800"/>

### Middleware Overview 

Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
<br>
Middleware functions can perform the following tasks:

1. Execute any code.
2. Make changes to the request and the response objects.
3. End the request-response cycle.
4. Call the next middleware in the stack.

**If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.**

### Elements of a Middleware function call

<img src="./assets/S5/mfc.png" alt="packages" width="800"/>

See to the **Revision Links** below for more details on middleware:
  1. [Writing middleware for use in Express apps](https://expressjs.com/en/guide/writing-middleware.html)
  2. [How Node JS middleware Works](https://expressjs.com/en/guide/writing-middleware.html) 
  3. [Using middleware](https://expressjs.com/en/guide/using-middleware.html) 

### Implementing middlewares 

_modifying | "app.js"_

```diff 
const http = require("http");

const express = require("express");

//you can create an express application and store it in a constant named app
const app = express();

/*
* "use" allows us to add a new middleware function
* "use" accepts an array of RequestHandlers. A RequestHandlers is a function which takes 3 args : 
req, res, next.
* "next" argument is a function, you're receiving here that has to be executed to allow the
request to travel on to the next middleware.
*/

//Middleware-1
+app.use((req, res, next) => {
+    console.log("In the middleware")

+    next(); // if we don't call next, we should at least send back a response because otherwise the request can't continue its journey to the next middleware and just dies.
+});

//Middleware-2
+app.use((req, res, next) => {
+    console.log("In another middleware")
+});

const server = http.createServer(app);

server.listen(3000); // servers starts listening to incoming requests.

```

## S5-L60 | How Middleware Works
---

1. `next()` - allows the req to pass to the next middleware below.
2. express.js does not have a default response.
3. `res.send()` - can be used due to express.js to easily send response. 

_modifying | "app.js" | Middleware-2__

```diff

//Middleware-1
app.use((req, res, next) => {
    console.log("In the middleware")
    next(); // so if we don't call next, we should actually send back a response because otherwise the request can't continue its journey to the next middleware and just dies.
});

//Middleware-2
app.use((req, res, next) => {
    console.log("In another middleware")
+    // sending a response using express.js
+    res.send('<h1>Hello from Express!</h1>')
});

```
_Output_

<img src="./assets/S5/middleres.png" alt="packages" width="400"/> 

## S5-L61 | Express.js - Looking behind the scene
---

1. The following code snippet sets the Content-Type of the response automatically to 'html' due to Express.js framework.

```javascript
app.use((req, res, next) => {
    // sending a response using express.js
    res.send('<h1>Hello from Express!</h1>')
});
```
2. The following code does the same thing. But with express.js we can write shorter code. 

```diff
- const http = require("http");

//...Previous Code...

- const server = http.createServer(app);
- server.listen(3000); // servers starts listening to incoming requests.

+ app.listen(3000); // Does the same thing as above
```
## S5-L62 | Handling Different Routes
---

### app.use() Overloads

Read the documentation for better understanding [Here!!](https://expressjs.com/en/4x/api.html#app.use)
> I have read this -**arif**


### Functionality Summary - `app.use([path,] callback [, callback...])` 

#### Description 

1. `app.use()` - Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
2. `path` - The path for which the middleware function is invoked
3. `callback` - Callback functions; can be:
    * A middleware function.
    * A series of middleware functions (separated by commas).
    * An array of middleware functions.
    * A combination of all of the above.

#### Example 

1. For example, this middleware function will be executed for every request to the app:
```javascript 
app.use(function (req, res, next) {
  console.log('Time: %d', Date.now());
  next();
});
```
2. Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.
```javascript 
// this middleware will not allow the request to go beyond it
app.use(function(req, res, next) {
  res.send('Hello World');
});

// requests will never reach this route
app.get('/', function (req, res) {
  res.send('Welcome');
});
```

### Routing - Code snippet

**Rules of a thumb:**
1. Does the URL match the express app route?
2. Does your callback call next() or return response?
3. Is the ordering of the routes accurate (e.g., /users before just /)?

```javascript
/**
 * This is the code that allows us to route our requests into different middleware
 */
app.use("/", (req, res, next) => {
    console.log('This middleware always runs and propagates the req to the next middlewares!')
    next(); //this propagates the req.
});
app.use("/add-product", (req, res, next) => {
  console.log("In add-product middleware");
  console.log(req.url);
  // sending a response using express.js
  res.send("<h1>Add Product Page!</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In default middleware");
  console.log(req.url);
  // sending a response using express.js
  res.send("<h1>Hello from Express!</h1>");
});
```

### Solving common issue - redundant request sent to the server

```javascript
/**
 * Browsers will by default try to request /favicon.ico from the root of a hostname, in order to show an icon in the browser tab.
 * Avoid this request by returning a 404 as below :
 */
app.get("/favicon.ico", (req, res) => res.status(204));

```
See this [Stackoverflow link](https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810#35408810) for details 

## S5 | Assignment-2 : Time to practice Express.js
---

<img src="./assets/S5/assgn2.png" alt="packages" width="800"/>

## S5-L63 | Parsing Incoming Request
---

Check the following portions for the code below: 
1. Import Body-Parser
2. Parsing Incoming Request
3. Form to send user request
4. Handling Incoming request

**Execute `$ npm install --save body-parser` to install a incoming request parser**

```javascript
// # Import Express 
const express = require("express");

// # Import Body-Parser
const bodyParser = require('body-parser')

// # Creating express app
const app = express();

// # Middleware

// ## Parsing Incoming Request
/**
 * 0. Parsing should be done at the top of the middleware calls
 * 1. Install 3rd party package `$ npm install --save body-parser`
 * 2. bodyParser.urlencoded - 
      * it will do that whole request body parsing we had to do manually in the previous core sections.
      * this registers a middleware function 
      * call next() in the end to propagate the parsed request to our middlewares
      * This parser only parses requests like <form> contents. Not json, files, etc. For that we can install other packages.
      * Need to provide some config info : {extended : false}
 */
app.use(bodyParser.urlencoded({extended : false}));

// ## Issue resolved 
app.get("/favicon.ico", (req, res) => res.status(204)); 

// ## Form to send user request
app.use("/add-product", (req, res, next) => {
  console.log("In add-product middleware");
  res.send(
    `<form action="/product" method="POST">
        <input type="text" name="title">
        <button type="submit">Add Product</button>
     </form>  
    `
  );
});
// ## Handling Incoming request
app.use('/product', (req, res, next) => {
  console.log(req.body); //-> undefined
  /**
   * console.log(req.body); //-> undefined - why ?? 
   * because request gives us this body convenience property here but by default, request doesn't try to parse the incoming request body. To do that,we need to register a parser and we do that by adding another middleware.
   * and you typically do that before your route handling middlewares because the parsing of the body should be done no matter where your request ends up
   */
  res.redirect('/');
});

app.use("/", (req, res, next) => {  
  // sending a response using express.js
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000); // Does the same thing as above

```
### Input 
<img src="./assets/S5/formin.png" alt="packages" width="400"/>

### Output

<img src="./assets/S5/parseout.png" alt="packages" width="400"/>

It parses the request as a json object which is easier for data extraction.

## Something still missing !!

The following code will get executed even for incoming **GET** request but we only want to execute that for **POST** request

```javascript
app.use('/product', (req, res, next) => {
  console.log(req.body); //-> undefined
  res.redirect('/');
});
```

## S5-L64 | Limiting Middleware Execution To POST Requests
---

### Problem 

The following middleware always executes, not just for **POST** requests but also for **GET**
requests, what can we do regarding that?

```javascript
// ## Handling Incoming request
app.use('/product', (req, res, next) => {
  console.log(req.body); //-> undefined  
  res.redirect('/');
});
```

### Solution

Use `app.post()` instead of `app.use()` - `app.post()` will only fire for incoming **POST** request.

```diff
// ## Handling Incoming request
-app.use('/product', (req, res, next) => {
+app.post('/product', (req, res, next) => {
  console.log(req.body); //-> undefined  
  res.redirect('/');
});
```

Similarly we have `app.get()` which will fire only for **GET** requests.

## S5-L65 | Using Express Router
---

### Folder Structure - by Convention

<img src="./assets/S5/routesfolder.png" alt="packages" width="300" height="300"/>

**We will extract and split the routing logic from app.js into the above two files `admin.js` and `shop.js`**

### Code

#### Files With Routing Logic

_admin.js_

```javascript
const express = require("express");

/** Initiating Router : 
 * This router is like a mini express app tied to the other express app or pluggable into the other express app
 * This router is a valid middleware function
*/
const router = express.Router();

/** Use the Router to register Routes : 
 * This works same as the app object
 * It has .use(), .get(), .post() functions as well 
*/

// ## Form to send user request
router.get("/add-product", (req, res, next) => {
  console.log("In add-product middleware ");
  res.send(
    `<form action="/product" method="POST">
          <input type="text" name="title">
          <button type="submit">Add Product</button>
       </form>  
      `
  );
});
// ## Handling Incoming request
router.post("/product", (req, res, next) => {
  console.log(req.body); //-> undefined
  res.redirect("/");
});

// Export the Router
module.exports = router; // This router is a valid middleware function

```

_shop.js_

```javascript
const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
  res.send("<h1>Hello from Express Shop!</h1>");
});


module.exports = router;
```

#### App.js uses the above routing files

_app.js_

```diff
// # Import Routes 

+ const adminRoutes = require('./routes/admin');
+ const shopRoutes = require('./routes/shop')

// ## Using Routes 
/**
 * the router "adminRoutes" is a valid middleware function so we can use it as below :
 * We can use this here and now this will automatically consider our routes in the admin.js file when funneling the request through this middleware. 
 * The order of placing `app.use(adminRoutes)` also matters as before. Since placing it after another middleware function which is fired and sends a response will result in the router never being reached. 
 * get(), post() methods do an exact match of the paths unlike use(). Since inside the admin.js and shop.js route files we have used get() and post() methods, the order of routes below does not matter.
*/
+ app.use(adminRoutes);
+ app.use(shopRoutes);

app.listen(3000); // Does the same thing as above

``` 
## S5-L66 | Adding a 404 Error Page
---

```diff
// ## Using Routes 
app.use(adminRoutes);
app.use(shopRoutes);

// ## Handle Unknown request
+ app.use('/', (req, res, next) => {
+   res.status(404).send('<h1>Page Not Found</h1>')
})
```
## S5-L67 | Filtering Paths 
---

### Same path can be used if methods differ

_admin.js_

```js
router.get("/admin/add-product", (req, res, next) => {...})

router.post("admin/add-product", (req, res, next) => {...})
```

Here the path `"admin/add-product"` wont conflict since the http methods are different.

### Routes Having Common Starting Path

In _admin.js_ the common segment in the path is `/admin`. We can ommit this here and add it in the _app.js_ file where we use **adminRoutes**.

_admin.js_

```js
//...
// # Import Routes 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')
//...
```

```diff
-router.get("/admin/add-product", (req, res, next) => {...})
// /admin/add-product => GET
+router.get("/add-product", (req, res, next) => {...})

-router.post("/admin/add-product", (req, res, next) => {...})
// /admin/add-product => POST
+router.post("/add-product", (req, res, next) => {...})
```

_app.js_
```diff
-app.use(adminRoutes);
+app.use('/admin', adminRoutes);
```
1. **Now only routes starting with `/admin` will go into the _admin_ routes file**
2. **expressjs will also omit or ignore this `/admin` part in the url when it tries to match these routes**


## S5-L68 | Creating HTML Pages
---

So long we have been using html inside the .js files as string. Now we will move towards serving real html files for different routes.

### Create new views folder

This will hold the html pages we will serve.

<img src="./assets/S5/views.png" alt="packages" width="200"/>

_add-product.html_
```html
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">Shop</a></li>
                <li><a href="/add-product">Add Product</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <form action="/add-product" method="POST">
            <input type="text" name="title">
            <button type="submit">Add Product</button>
        </form>
    </main>
    
</body>
```

_shop.html_
```html
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">Shop</a></li>
                <li><a href="/add-product">Add Product</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <h1>My Products</h1>
        <p>List of all the products...</p>
    </main>
    
</body>
```


## S5-L69 | Serving HTML Pages
--- 

We want to server the html files in our routes.

### Refering the _shop.html_ file from the router in _shop.js_

modifying | _shop.js_

```diff
router.get("/", (req, res, next) => {
-   res.send("<h1>Hello from Express Shop!</h1>");
+   res.sendFile("/views/shop.html")
});
```

#### Problem

**But** after the above modification we get the following error :
```
TypeError: path must be absolute or specify root to res.sendFile
    at ServerResponse.sendFile (/home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/node_modules/express/lib/response.js:421:11)
    at router.get (/home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/routes/shop.js:8:10)
    at Layer.handle [as handle_request] (/home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/node_modules/express/lib/router/layer.js:95:5)
    at next (/home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/node_modules/express/lib/router/layer.js:95:5)
    at /home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/node_modules/express/lib/router/index.js:281:22
    at Function.process_params (/home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/node_modules/express/lib/router/index.js:335:12)
    at next (/home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/node_modules/express/lib/router/index.js:275:10)
    at Function.handle (/home/arif/TECHNOLOGY/06-Learn-Nodejs/04-Node-App-2/node_modules/express/lib/router/index.js:174:3)

```

**Why ?** - The reason for this is that an absolute path would be correct but slash like this actually refers to our root folder on our operating system not to this project folder.

#### Solution

1. Use need to use a core module provided by node.js i.e the `path` module.
2. We can create a path by calling the join method like `path.join()`
3. We're using `path.join()` instead of manually concatenating because this will automatically build the path in a way that works on both Linux systems and Windows systems. (e.g **Linux**: '/user/products', **Windows**: '\user\products')
4. `join()` returns a path by concatenating the different segments.
5. Now the first segment we should pass here is a global variable made available by nodejs `__dirname`. 
6. `__dirname` - This is a global variable which holds the <span style="font-size:24px; text-decoration: underline">absolute path of a folder</span> on our operating system in which the <span style="font-size:24px; text-decoration: underline">"file where we use `__dirname`"</span> is located.
7. Now we can build the path by `path.join(__dirname, 'views', 'shop.html')`

    ```js
    const path = require('path');

    router.get("/", (req, res, next) => {
        res.sendFile(path.join(__dirname, 'views', 'shop.html'))
    });
    ```
    But `__dirname` currently points to **routes** folder when we are using it in the shop.js file. So we need to go up one level.

8. Go up one level and then access the sibling of **routes** which is the **views** folder.

    ```diff
    const path = require('path');

    router.get("/", (req, res, next) => {
    -     res.sendFile(path.join(__dirname, 'views', 'shop.html'))
    +     res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    });
    ```
    Now if we go to the url "http://localhost:3000/"
    <img src="./assets/S5/routehtml.png" alt="packages" width="500"/>


### Refering the _add-product.html_ file from the router in _admin.js_

```diff
// # Import path
+ const path = require('path');

// ## Form to send user request

router.get("/add-product", (req, res, next) => {

-  res.send(
-    `<form action="/admin/add-product" method="POST">
-          <input type="text" name="title">
-          <button type="submit">Add Product</button>
-       </form>  
-      `
-  );

+  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

});

```

## S5-L70 | Serving HTML Pages
---

1. Same as above.
2. Create a 404.html page in the views folder.
3. Then in the _app.js_ file use `path` module to construct a path to the 404.html page and use `res.sendFile()` to send the html file as a response when invalid url has been hit.

## S5-L71 | Using a Helper Function for Navigation
---

### Objective 
Smartly get the **rootDirectory** of the project and resuse that whereever required.

### How

* Create a utility folder and a _path.js_ file inside the folder which will hold the logic for deriving the rootDirectory.

<img src="./assets/S5/utilitypath.png" alt="packages" width="300"/> 

* There is a global `process` variable available by default.  
* You will have a `mainModule` property of the process object. This will refer to the main module that started your application, so basically to the module we created here in `app.js`. 
* And now we can call `filename` to find out in which file this module was spun up.
* This gives us the path to the file that is responsible for the fact that our application is running and this file name is what we put into `dirname` to get a path to that <span style="font-size:24px">directory.</span>

_path.js_ 
```js
const path = require('path');

const rootDirectory = path.dirname(process.mainModule.filename);

module.exports = rootDirectory;

```

* Use the _path.js_ export where you need to access the root directory.

_admin.js_

```diff

// # Import rootDirectory variable from Utility > path.js
+ const rootDir = require('../utility/path') 

const router = express.Router();

// ## Form to send user request
router.get("/add-product", (req, res, next) => {
  console.log("In add-product middleware ");
-  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
+  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  
});
```
_shop.js_

```diff

//...

// # Import rootDirectory variable from Utility > path.js
+ const rootDir = require('../utility/path') 

router.get("/", (req, res, next) => {
    console.log('In shop middleware')
-     res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
+     res.sendFile(path.join(rootDir, 'views', 'shop.html'))
});
```


## S5-L72 | Styling Our Pages
---

### [Sidenote] - How to kill a node server running at a port

* `sudo kill -9 $(sudo lsof -t -i:3000)`

* See the link below : [Kill any service running at a specific port](https://unix.stackexchange.com/questions/140482/kill-any-service-running-at-a-specific-port)


### We will apply the following style in all the current html files 

* **Applying Styles in the following files :**

    _shop.html_, _admin.html_ and _404.html_

    ```css
    <style>
        * {
        margin: 0;
        padding: 0;
        /* border: 1px solid burlywood; */
        }

        html {
        font-size: 16px;
        }

        body {
        font-family: sans-serif;
        }

        main {
        padding: 1rem;
        }

        /* header styles */
        .main-header {
        width: 100%;
        height: 3.5rem;
        background: #e3e712;
        padding: 0 1.5rem;
        }

        .main-header__nav {
        height: 100%;
        display: flex;
        align-items: center;
        }

        .main-header__item-list {
        list-style: none;
        display: flex;
        }

        .main-header__item {
        margin: 0 1rem;
        }

        .main-header__item a {
        text-decoration: none;
        color: black;
        }

        .main-header__item a:hover,
        .main-header__item a:active,
        .main-header__item a.active {
        color: #291beb;
        }

        /* form styles */
        .product-form {
            width: 20rem;
            max-width: 90%;
            margin: auto;
        }

        .form-control {
            margin: 1rem 0;
        }

        .form-control label,
        .form-control input {
        display: block;
        width: 100%;
        }

        .form-control input {
        border: 1px solid #e3e712;
        border-radius: 2px;
        font-family: inherit;
        }

        button {
        font-family: inherit;
        color: #291beb;
        border: 1px solid #291beb;
        background: white;
        border-radius: 3px;
        cursor: pointer;
        }

        button:hover,
        button:active {
            background-color: #291beb;
            color: white;
        }
    </style>
    ```


## S5-L73 | Serving Files Statically
---

* The convention is to call it public because you want to indicate that this is a folder that holds content which are always exposed to the public crowd where you don't need any permissions to access it.

    <img src="./assets/S5/public.png" alt="packages" width="300"/> 

* Normally you can never access the file system on the server from the client. Express will try to find a matching route instead and fail to find it.

* But now I actually want to make an exception, I want that some requests can just access the file system.

* Because ultimately let's say in shop.html, I want to have something like a link in here where I simply point at something like "/css/main.css" anything like that. `<link rel="stylesheet href="../public/css/main.css">`

* And my imagination would be that in public, I have a css folder with a main.css file in there and that is the file I want to serve with this link. 

    <img src="./assets/S5/publiccss.png" alt="packages" width="300"/>

* The css in the _main.css_ file which we transferred from _shop.css_
    ```css
        * {
        margin: 0;
        padding: 0;
        /* border: 1px solid burlywood; */
        }

        html {
        font-size: 16px;
        }

        body {
            font-family: sans-serif;
        }

        main {
            padding: 1rem;
        }

        .main-header {
        width: 100%;
        height: 3.5rem;
        background: #e3e712;
        padding: 0 1.5rem;
        }

        .main-header__nav {
        height: 100%;
        display: flex;
        align-items: center;
        }

        .main-header__item-list {
        list-style: none;
        display: flex;
        }

        .main-header__item {
            margin: 0 1rem;
        }

        .main-header__item a {
        text-decoration: none;
        color: black;
        }

        .main-header__item a:hover,
        .main-header__item a:active,
        .main-header__item a.active {
            color: rgb(41, 27, 235)
        }
    ```
* But the link in the shop.html file `<link rel="stylesheet href="../public/css/main.css">` does not work **because we cannot access the file system**. The styling is lost from the shop.html page.

    <img src="./assets/S5/cssout.png" alt="packages" width="300"/>

* Solution ? - For this we need a feature expressjs offers us, we need to be able to serve files statically and <span style="font-size: 24px">statically</span> simply means not handled by the express router or other middleware but instead <span style="font-size: 24px">directly forwarded to the file system.</span>

* we use the express object itself, so this object we're importing there and this does have a `static` method and this is a built-in middleware which serves static files. So we can execute this function. and now we just have to pass in a path to the folder which we want to serve statically, so basically a folder which we want to grant read access to.


* In _app.js_ add the following 

    ```diff
    // # Middleware 

    // ## Parsing Incoming Request
    app.use(bodyParser.urlencoded({extended : false}));

    +// ## Serving Static Files e.g main.css, etc
    +// pass in a path to the folder which we want to serve statically
    
    +app.use(express.static(path.join(__dirname, 'public')));

    ```
* But the styling still does not work. Why? 

    <img src="./assets/S5/cssout.png" alt="packages" width="300"/>

* Because the path is wrong 

    _shop.html_

    ```diff
    -<link rel="stylesheet" href="../public/css/main.css">
    +<link rel="stylesheet" href="/css/main.css">
    ```

    Instead here, we should omit this and directly act as if we are in the public folder already because this is basically what express will do here, it will take any request that tries to find some file and that's important, it looks at the extension, so anything that tries to find a .css or a .javascript files, if we have such a request, it automatically forwards it to the public folder and therefore then the remaining path has to be everything but that "public", so therefore we strip the public out of this path and just act as if we already are in the public folder because this is where file requests will be forwarded to.

    <img src="./assets/S5/sout.png" alt="packages" width="300"/>

* And by the way, you could register multiple static folders and it will funnel the request through all of them until it has a first hit for the file it's looking for.

    ```diff
    // ## Serving Static Files e.g main.css, etc
    app.use(express.static(path.join(__dirname, 'public')));
    +app.use(express.static(path.join(__dirname, 'public2')));
    ```

* And you're not just limited to css and javascript files, you can also serve images and so on.


## Assignment-3
---
    
<img src="./assets/S5/assignment-3.png" alt="packages" width="800"/>


## S5-L74 | Wrap Up

<img src="./assets/S5/summary.png" alt="packages" width="800"/> 


## Useful Links

[Installing Express](https://expressjs.com/en/starter/installing.html)