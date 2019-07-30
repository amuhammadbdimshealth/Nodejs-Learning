# S8 | Enhancing the Course Project
---

# S8 | Module Introduction
---
<img src="./assets/S8/1.png" alt="packages" width="800"/> 

# S8 | Creating the Shop Structure
---
## Folder Structure
Adding subfolders and new ejs template in the `view` folder
<img src="./assets/S8/2.png" alt="packages" width="300"/> 

# S8 | Working On The Navigation
---
## Adding a new Links to the navigation 
<img src="./assets/S8/3.png" alt="packages" width="800"/>

- `/products` - Products
- `/cart` - Cart
- `/admin/products` - Admin Products - Loads a list of all the products. Which can be clicked and will show the edit-product view

## We should see the links as below
<img src="./assets/S8/4.png" alt="packages" width="800"/>

## Mobile View
<img src="./assets/S8/400.png" alt="packages" width="300"/>
- Lets not focus on css for now 
- Only focus on node logic 

## Quick Task
Make the links added work as expected

# S8 | Registering The Routes 
---
`routes/shop.js`
<img src="./assets/S8/5.png" alt="packages" width="800"/>

`routes/admin.js`
<img src="./assets/S8/6.png" alt="packages" width="800"/>

New Controllers
<img src="./assets/S8/7.png" alt="packages" width="300"/>

- admin.js
- shop.js - it was product.js before

Remove the `getAddProduct` and `postAddProdcut` from the `controller/shop.js` and move it to the `controller/admin.js` file
<img src="./assets/S8/9.png" alt="packages" width="800"/>

**Fix the references in the**
`routes/admin.js`
<img src="./assets/S8/10.png" alt="packages" width="800"/>

`routes/shop.js`
<img src="./assets/S8/11.png" alt="packages" width="800"/>

`routes/shop.js` - adjust the functions called by each route
<img src="./assets/S8/13.png" alt="packages" width="800"/>

## Lets Code the Above !! 
[YES] - Coded ? 

`controllers/shop.js` - Add middleware functions for the new routes
<img src="./assets/S8/12.png" alt="packages" width="800"/>
<img src="./assets/S8/16.png" alt="packages" width="800"/>
<img src="./assets/S8/17.png" alt="packages" width="800"/>
<img src="./assets/S8/18.png" alt="packages" width="800"/>
<img src="./assets/S8/19.png" alt="packages" width="800"/>

`routes/shop.js` - add the new middleware functions added in the shop controller.
<img src="./assets/S8/220.png" alt="packages" width="800"/>

`controller/admin.js` - Add middleware `getProducts`. Same as that in the shop controller 
<img src="./assets/S8/20.png" alt="packages" width="800"/>

## Output is blank - we need to modify the `index.ejs` template 
<img src="./assets/S8/21.png" alt="packages" width="800"/>

## `index.ejs` - copy code from the `product-list.ejs`
<img src="./assets/S8/22.png" alt="packages" width="800"/>

## Output - Shop ! 
<img src="./assets/S8/23.png" alt="packages" width="800"/>

## Cart - for now
<img src="./assets/S8/24.png" alt="packages" width="800"/>

## Admin Products
<img src="./assets/S8/24.png" alt="packages" width="800"/>

## Correction in the admin routes
<img src="./assets/S8/25.png" alt="packages" width="800"/>

## Correction in the `controller/error.js`. Set the path field
<img src="./assets/S8/26.png" alt="packages" width="800"/>

## Lets Code the Above !! 
[YES] - Coded ? 

# S8 | Storing Product Data
---
## Objective 
We want to add more properties to our product

## Product Model (updated)
Constructor - add more argument
<img src="./assets/S8/32.png" alt="packages" width="800"/>

## Views - `admin/add-product.ejs` 
Add more form controls
<img src="./assets/S8/28.png" alt="packages" width="800"/>

Output of the form
<img src="./assets/S8/29.png" alt="packages" width="800"/>

`forms.css` - Styling 
<img src="./assets/S8/30.png" alt="packages" width="400"/>
<img src="./assets/S8/31.png" alt="packages" width="400"/>

## Output 
<img src="./assets/S8/33.png" alt="packages" width="800"/>

## Modify the admin controller

`controllers/admin.js` - modify `postAddProduct` to pass all the newly added fields for product to the product constructor.
<img src="./assets/S8/34.png" alt="packages" width="800"/>


# S8 | Displaying Product Data
---
`shop/product-list.ejs` - this lists all the products
We need to modify this to show other properties along with title
<img src="./assets/S8/35.png" alt="packages" width="800"/>
<img src="./assets/S8/36.png" alt="packages" width="800"/>

`index.js` - Do the same as above

`add-prodcut.ejs` - make the proce field accept decimal by adding `step` property
<img src="./assets/S8/39.png" alt="packages" width="800"/>

## Issue - CSS not loading
### After I add product and  when it redirects to '/' route, it doesnt load css.
<img src="./assets/S8/41.png" alt="packages" width="800"/> 
 
### Solution
Finally got this fixed. The problem is a package setting difference - nodemon. On my machine, nodemon restarts  every time I add a product (ie. edit the products.json file) and this somehow intercepts access to the css files. If I use 'npm run start-server' (without nodemon), the css files are found successfully.  The solution from the following question/answer: nodemon restarting problem, solves the problem. You need to configure nodemon not to restart when  the products.json file changes - add the following to your package.json:

```js
"nodemonConfig": {        
    "ignore": ["data/products.json"]  
}
```
Restart with nodemon, add a product and the products page should load with CSS styles.

If anyone understands why a nodemon restart impedes access to CSS files, I'd be interested to hear an explanation : )

## Output
<img src="./assets/S8/37.png" alt="packages" width="800"/>
<img src="./assets/S8/40.png" alt="packages" width="800"/>

## Lets Code the Above !! 
[YES] - Coded ?  

# S8 | Editing & Deleting Products
---
## Lets Improve the Admin Products Tab 

Copy code from `prodcut-list.ejs` to `admin/products.ejs`
<img src="./assets/S8/44.png" alt="packages" width="800"/>
<img src="./assets/S8/42.png" alt="packages" width="800"/>

Add buttons
<img src="./assets/S8/43.png" alt="packages" width="800"/>

Later we will add link for the Edit and Delete button like below.
<img src="./assets/S8/45.png" alt="packages" width="800"/>

  - But we would have to pass the `ID` of the product clicked.
  - And then retrieve the `ID` in the **route** that we are loading so that we know which product we need to fetch from the database.

Update the Delete button so as to initiate a POST request when clicked. 
<img src="./assets/S8/46.png" alt="packages" width="800"/>

Output - Admin Products
<img src="./assets/S8/47.png" alt="packages" width="800"/>

## Same Problem In Add To Cart
`shop/product-list.ejs` - Looks like this now
<img src="./assets/S8/48.png" alt="packages" width="800"/>

Lets convert this to a from which will POST a request to add the selected product into the cart.
 <img src="./assets/S8/49.png" alt="packages" width="800"/>
 - route should contain the info - which `ID` ? 
 - method should be - `POST`

# S8 | Adding Another Item
---
Adding the Orders - `order.ejs`
<img src="./assets/S8/50.png" alt="packages" width="800"/>

Add Orders to Navigation - `navigation.ejs`
<img src="./assets/S8/51.png" alt="packages" width="800"/>

Add Orders to Routes - `routes/shop.js`
<img src="./assets/S8/54.png" alt="packages" width="800"/>

Add new action in the Controller - `controller/shop.js`
<img src="./assets/S8/53.png" alt="packages" width="800"/>

<img src="./assets/S8/55.png" alt="packages" width="800"/>

## Lets Code the Above !! 
[YES] - Coded ? 