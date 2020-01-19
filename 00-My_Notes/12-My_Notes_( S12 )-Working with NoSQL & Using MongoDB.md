# S12 | Working with NoSQL & Using MongoDB
---

# S12 | Module Introduction
---
Introduction
`file`
<img src="./assets/S12/1.png" alt="packages" width="800"/>
<img src="./assets/S12/2.png" alt="packages" width="800"/>

# S12 | What is MongoDB?
---
<img src="./assets/S12/4.png" alt="packages" width="800"/>
<img src="./assets/S12/5.png" alt="packages" width="800"/>
<img src="./assets/S12/6.png" alt="packages" width="800"/>


# S12 | Relations in NoSQL
---
Duplicate Data
<img src="./assets/S12/7.png" alt="packages" width="800"/>

Relation Options
<img src="./assets/S12/8.png" alt="packages" width="800"/>

NoSQL Charactersitics
<img src="./assets/S12/9.png" alt="packages" width="800"/>

# S12 | Setting Up MongoDB
---
<img src="./assets/S12/10.png" alt="packages" width="800"/>

Adding locally 
<img src="./assets/S12/11.png" alt="packages" width="800"/>
- We wont go in this approach 
- We will go for the cloud setup

Cloud Solution 
<img src="./assets/S12/12.png" alt="packages" width="800"/>
- Atlas 

<img src="./assets/S12/13.png" alt="packages" width="800"/>
<img src="./assets/S12/14.png" alt="packages" width="800"/>
<img src="./assets/S12/15.png" alt="packages" width="800"/>
<img src="./assets/S12/16.png" alt="packages" width="800"/>

Give a name to the cluster
<img src="./assets/S12/17.png" alt="packages" width="800"/>

Check the security option
<img src="./assets/S12/18.png" alt="packages" width="800"/>
- Give a user read and write access to any database


<img src="./assets/S12/19.png" alt="packages" width="800"/>

Create a user/ edit a user
<img src="./assets/S12/20.png" alt="packages" width="800"/>

IP Whitelist
<img src="./assets/S12/21.png" alt="packages" width="800"/>
<img src="./assets/S12/22.png" alt="packages" width="800"/>
<img src="./assets/S12/23.png" alt="packages" width="800"/>

Add Current Local IP to white list so that your node app can access the database
<img src="./assets/S12/24.png" alt="packages" width="800"/>
<img src="./assets/S12/25.png" alt="packages" width="800"/>

Connect
<img src="./assets/S12/26.png" alt="packages" width="800"/>
<img src="./assets/S12/27.png" alt="packages" width="800"/>
<img src="./assets/S12/28.png" alt="packages" width="800"/>
<img src="./assets/S12/29.png" alt="packages" width="800"/>

Connect to your application
<img src="./assets/S12/30.png" alt="packages" width="800"/>
<img src="./assets/S12/31.png" alt="packages" width="800"/>
- we get this url which we will need soon
- but first we need to install the mongodb driver 
- we need the driver for nodejs

Lets install the mongodb driver in our project

# S12 | Installing the MongoDB Driver
---
The `Mongodb Driver` is a package which we can use to connect to Mongodb.
Install MongoDB
<img src="./assets/S12/32.png" alt="packages" width="800"/>
- Now we can use it in the app.js file

Lets start from scratch regarding usage of database
`app.js`
<img src="./assets/S12/33.png" alt="packages" width="800"/>
- lets get rid of everything we did for mysql 
- get rid of the associations 

Get rid of the model and sequelize imports 
<img src="./assets/S12/34.png" alt="packages" width="800"/>

Comment the dummy user created
<img src="./assets/S12/35.png" alt="packages" width="800"/>

`database.js` - Current Code
<img src="./assets/S12/36.png" alt="packages" width="800"/>
- uses sequelize 
- remove the code used here

Clean up 
`database.js`
<img src="./assets/S12/37.png" alt="packages" width="800"/>
- lets setup code that let us connect to mongodb

Import package and client 
`database.js`
<img src="./assets/S12/38.png" alt="packages" width="800"/>

Connect
`database.js`
<img src="./assets/S12/39.png" alt="packages" width="800"/>

Use this url
`database.js`
<img src="./assets/S12/40.png" alt="packages" width="800"/>

Copy the url and paste inside `connect`
`database.js`
<img src="./assets/S12/41.png" alt="packages" width="800"/>

Make sure you are using the right user
<img src="./assets/S12/43.png" alt="packages" width="800"/>

Also the right password
<img src="./assets/S12/44.png" alt="packages" width="800"/>
<img src="./assets/S12/45.png" alt="packages" width="800"/>
<img src="./assets/S12/46.png" alt="packages" width="800"/>

Now we want to connect to my database.
<img src="./assets/S12/47.png" alt="packages" width="800"/>
- The `client` gives us access to the database.

Export the mongoConnect function
<img src="./assets/S12/48.png" alt="packages" width="800"/>

Import mongoConnect in App.js
`app.js`
<img src="./assets/S12/49.png" alt="packages" width="800"/>

Pass a Callback to mongoConnect which will be called once we are connected to mongoDB
`app.js`
<img src="./assets/S12/50.png" alt="packages" width="800"/>

Callback
`app.js`
<img src="./assets/S12/51.png" alt="packages" width="800"/>
- Lets see what we get as the client which will be used to do database operations in future.
- we can start listening to the port once we are connected

npm start - error 
`app.js`
<img src="./assets/S12/52.png" alt="packages" width="800"/>

Remove all code which refers to sequelize
<img src="./assets/S12/53.png" alt="packages" width="800"/>

<img src="./assets/S12/54.png" alt="packages" width="800"/>

npm start - no we are Connected ! 
<img src="./assets/S12/55.png" alt="packages" width="800"/>

# S12 | Creating the Database Connection
---
`app.js`
<img src="./assets/S12/56.png" alt="packages" width="800"/>

`controller/admin.js`
<img src="./assets/S12/57.png" alt="packages" width="800"/>

`product.js`
<img src="./assets/S12/58.png" alt="packages" width="800"/>

`product.js`
<img src="./assets/S12/59.png" alt="packages" width="800"/>

`product.js`
<img src="./assets/S12/60.png" alt="packages" width="800"/>

`product.js`
<img src="./assets/S12/61.png" alt="packages" width="800"/>

## [x] Lets Code - DONE

# S12 | Finishing the Database Connection
--- 
Current code
<img src="./assets/S12/62.png" alt="packages" width="800"/>

Modified
`database.js`
<img src="./assets/S12/63.png" alt="packages" width="800"/>
- we will not pass the client to the callback - `line 13`
- mongoDb will create the shop database if that does not exist yet.
- here we store the connection to the database with the `_db` variable


Define another method to get the database connection
`database.js`
<img src="./assets/S12/64.png" alt="packages" width="800"/>
- export both functions
- `mongoConnect` - will connect and storing the connection to the database. So this will kepp on running.
- `getDb` - method where I return access to that connected database if it exists.
- mongodb behind the scenes will even manage this very elegantly with something called **connection pooling** 
- where mongodb will make sure it provides sufficient connections for multiple simultaneous interactions with the database,
- so this is really a good pattern we should follow.
 
Method-1
<img src="./assets/S12/65.png" alt="packages" width="800"/>

Method-2 
<img src="./assets/S12/66.png" alt="packages" width="800"/>
- in mongoDB we will use connection pooling that will let us do multiple interations with the database simultaneously

We need to adjust on thing in app.js
`app.js`
<img src="./assets/S12/67.png" alt="packages" width="800"/>

We will not have the client anymore
`app.js`
<img src="./assets/S12/68.png" alt="packages" width="800"/>
- This `mongoConnect` methid causes the connection to be made once and then parts of the application uses `getDb` function to get access to the database. (see the `database.js` file for referencee)

`product.js`
<img src="./assets/S12/69.png" alt="packages" width="800"/>

getDb
`product.js`
<img src="./assets/S12/70.png" alt="packages" width="800"/>
- we can call this getDB function to get access to the database
- and interact with the database 

## [x] Lets Code - DONE

# S12 | Using the Database Connection
---
Getting the connection
`product.js`
<img src="./assets/S12/71.png" alt="packages" width="800"/>
- we can get access to the database connection 
- that we set when starting the server like this

Recall what the getDB returns ? 
`database.js`
<img src="./assets/S12/72.png" alt="packages" width="800"/>
- it returns the database instance we connected to

Collection
`product.js`
<img src="./assets/S12/73.png" alt="packages" width="800"/>
- mention which collection we want to work with
- if it does not exist it will be created on the fly 
- just like a db will be created if it does not exists.

Collection
`product.js`
<img src="./assets/S12/74.png" alt="packages" width="800"/>
- connecting to `products` collection
- we can execute a list of mongoDB operations on the collection.

Collection
`product.js`
<img src="./assets/S12/75.png" alt="packages" width="800"/>

Collection
`product.js`
<img src="./assets/S12/76.png" alt="packages" width="800"/>

Collection
`product.js`
<img src="./assets/S12/77.png" alt="packages" width="800"/>

insertOne
`product.js`
<img src="./assets/S12/78.png" alt="packages" width="800"/>
- mongodb crud function for nodejs driver


We can try to insert `this` object which refers to the Product in the product class
`product.js`
<img src="./assets/S12/79.png" alt="packages" width="800"/>

returns a Promise
So then().catch()
`product.js`
<img src="./assets/S12/80.png" alt="packages" width="800"/>

Export the Product class
`product.js`
<img src="./assets/S12/81.png" alt="packages" width="800"/>

Current code 
`controllers/admin.js`
<img src="./assets/S12/82.png" alt="packages" width="800"/>
- these wont work since they are using sequelize 
- which we are not using now

For now we will strore the product without storing user information.
Comment out the codes that wont work
Disable all routes that wont work anymore in the `routes/admin.js`
<img src="./assets/S12/83.png" alt="packages" width="800"/>

import mongo connnect
`app.js`
<img src="./assets/S12/84.png" alt="packages" width="800"/>

We should be able to insert a new product already
But first we need `next()` in the `app.js` file
<img src="./assets/S12/85.png" alt="packages" width="800"/>

Output
<img src="./assets/S12/86.png" alt="packages" width="800"/>
<img src="./assets/S12/87.png" alt="packages" width="800"/>
<img src="./assets/S12/88.png" alt="packages" width="800"/>
<img src="./assets/S12/89.png" alt="packages" width="800"/>
- This wont work as its using sequelize
- We need to use mongo instead

# S12 | Creating Products
---
Lets make add product work again

postAddProduct
<img src="./assets/S12/90.png" alt="packages" width="800"/>

return the promise 
<img src="./assets/S12/91.png" alt="packages" width="800"/>

Output
<img src="./assets/S12/92.png" alt="packages" width="800"/>
<img src="./assets/S12/93.png" alt="packages" width="800"/>
- we commented out the redirection to a valid page

Insert was successful
<img src="./assets/S12/94.png" alt="packages" width="800"/>
<img src="./assets/S12/95.png" alt="packages" width="800"/>

# S12 | Understanding the MongoDB Compass
---
Install Mongo DB Compass
<img src="./assets/S12/96.png" alt="packages" width="800"/>
- Gives you a graphical interface

<img src="./assets/S12/97.png" alt="packages" width="800"/>
<img src="./assets/S12/98.png" alt="packages" width="800"/>
<img src="./assets/S12/99.png" alt="packages" width="800"/>
<img src="./assets/S12/100.png" alt="packages" width="800"/>

Now one cool thing is if you now quickly close compass again and you restart it after you copied that url, it should tell you that it detected a connection string and if you click yes, it will insert the most important pieces here for you.
<img src="./assets/S12/101.png" alt="packages" width="800"/>

<img src="./assets/S12/102.png" alt="packages" width="800"/>
<img src="./assets/S12/103.png" alt="packages" width="800"/>
<img src="./assets/S12/104.png" alt="packages" width="800"/>
<img src="./assets/S12/105.png" alt="packages" width="800"/>
<img src="./assets/S12/106.png" alt="packages" width="800"/>

# S12 | Fetching All Products
---

<img src="./assets/S12/107.png" alt="packages" width="800"/>
<img src="./assets/S12/108.png" alt="packages" width="800"/>
<img src="./assets/S12/109.png" alt="packages" width="800"/>

- So I want to find all products which I can do by just calling find like this. 

**Cursor** 
- Now the important thing about find is find does not immediately return a promise, 
- instead it returns a so-called cursor. 
- **A cursor** is an object provided by mongodb which allows us to go through our elements, our documents step by step 
- because theoretically in a collection, find could of course return millions of documents 
- and you don't want to transfer them over the wire all at once. 
- So instead `find` gives you a ***handle*** which you can use to tell mongodb ok give me the next document, ok give me the next document and so on.

**toArray**
- There is a toArray method you can execute to tell mongodb to get all documents and turn them into a javascript array 
- but you should only use that if you know that we're talking about let's say a couple of dozens or maybe one hundred documents. Otherwise its better to do pagination which we will do later.
<img src="./assets/S12/110.png" alt="packages" width="800"/>

Promise
<img src="./assets/S12/111.png" alt="packages" width="800"/> 

Get access to database
<img src="./assets/S12/112.png" alt="packages" width="800"/>

<img src="./assets/S12/113.png" alt="packages" width="800"/>
<img src="./assets/S12/114.png" alt="packages" width="800"/>
<img src="./assets/S12/115.png" alt="packages" width="800"/>
<img src="./assets/S12/116.png" alt="packages" width="800"/>


Output
<img src="./assets/S12/117.png" alt="packages" width="800"/>

## [x] Lets Code - DONE

# S12 | Fetching a Single Product
---
## Code before
getProduct 
<img src="./assets/S12/118.png" alt="packages" width="800"/>

find the matching Product using the Product model
<img src="./assets/S12/119.png" alt="packages" width="800"/>
- We need to work on the model

## Getting single product 
`find()` 
<img src="./assets/S12/120.png" alt="packages" width="800"/>

`next()`
<img src="./assets/S12/121.png" alt="packages" width="800"/>

Controller
<img src="./assets/S12/122.png" alt="packages" width="800"/>

Routes
<img src="./assets/S12/123.png" alt="packages" width="800"/>
<img src="./assets/S12/124.png" alt="packages" width="800"/>
<img src="./assets/S12/125.png" alt="packages" width="800"/>
<img src="./assets/S12/126.png" alt="packages" width="800"/>
<img src="./assets/S12/127.png" alt="packages" width="800"/>
<img src="./assets/S12/128.png" alt="packages" width="800"/>
<img src="./assets/S12/129.png" alt="packages" width="800"/>
<img src="./assets/S12/130.png" alt="packages" width="800"/>
<img src="./assets/S12/131.png" alt="packages" width="800"/>
<img src="./assets/S12/132.png" alt="packages" width="800"/>

<img src="./assets/S12/133.png" alt="packages" width="800"/>
- The reason for that is that is that the ID in mongodb is actually stored a bit differently and we can see this in compass, the ID is actually such an object id thing.Now I did mention that mongodb stores data in bson format and this binary format of json is not just used because it's a bit faster to work with, it is but also because mongodb can store some special types of data in there and object id is such a type.

<img src="./assets/S12/134.png" alt="packages" width="800"/>

To fix this 
<img src="./assets/S12/135.png" alt="packages" width="800"/>
<img src="./assets/S12/136.png" alt="packages" width="800"/>
<img src="./assets/S12/137.png" alt="packages" width="800"/>


# S12 | Making the "Edit" & "Delete" Buttons Work Again
---
We need to work on the admin side again
Make the admin products page where we list all products work again.
<img src="./assets/S12/138.png" alt="packages" width="800"/>
<img src="./assets/S12/139.png" alt="packages" width="800"/>
<img src="./assets/S12/140.png" alt="packages" width="800"/>

Edit and Delete 
<img src="./assets/S12/141.png" alt="packages" width="800"/>

# S12 | Working on the Product Model to Edit our Product
---
We need to make these two work again in the `controllers/admin.js` file:
getEditProduct and postEditProduct

## See the product in Edit Mode
<img src="./assets/S12/142.png" alt="packages" width="800"/>
<img src="./assets/S12/143.png" alt="packages" width="800"/>
<img src="./assets/S12/144.png" alt="packages" width="800"/>
<img src="./assets/S12/145.png" alt="packages" width="800"/>

## Update the Product using the Edit product Page
<img src="./assets/S12/146.png" alt="packages" width="800"/>
<img src="./assets/S12/147.png" alt="packages" width="800"/>
<img src="./assets/S12/148.png" alt="packages" width="800"/>
<img src="./assets/S12/149.png" alt="packages" width="800"/>
`$set`
<img src="./assets/S12/150.png" alt="packages" width="800"/>
- We have to describe the operation and we do this by using a special property name which is understood by mongodb, kind of a reserved name you could say, $set.
- This again takes an object as a value and here we describe the changes we want to make to the existing document which we found with this filter.

`$set: this`
<img src="./assets/S12/151.png" alt="packages" width="800"/>
And here you could actually say this and you would instruct mongodb to simply set these key value fields which you have in your object here to the document it found in the database and therefore since these are only key value pairs which exist in the document in the database, it will update the values of the document in the database with your new values.

You can also explicitly mention the changes
<img src="./assets/S12/152.png" alt="packages" width="800"/>
- but since we want to replace all fields
- we can just mention `this` here
- the id wont be overriten. dont worry

Next
<img src="./assets/S12/153.png" alt="packages" width="800"/>

# S12 | Finishing the "Update Product" Code
---
<img src="./assets/S12/154.png" alt="packages" width="800"/>
<img src="./assets/S12/155.png" alt="packages" width="800"/>
<img src="./assets/S12/156.png" alt="packages" width="800"/>

Output
<img src="./assets/S12/157.png" alt="packages" width="800"/>
<img src="./assets/S12/158.png" alt="packages" width="800"/>
<img src="./assets/S12/159.png" alt="packages" width="800"/>
- But I also did not get any error
- Whats wrong here ?? 
<img src="./assets/S12/160.png" alt="packages" width="800"/>
<img src="./assets/S12/161.png" alt="packages" width="800"/>
<img src="./assets/S12/162.png" alt="packages" width="800"/>
<img src="./assets/S12/163.png" alt="packages" width="800"/>
<img src="./assets/S12/164.png" alt="packages" width="800"/>
<img src="./assets/S12/165.png" alt="packages" width="800"/>

# S12 | One Note About Updating Products
---
<img src="./assets/S12/166.png" alt="packages" width="800"/>
<img src="./assets/S12/167.png" alt="packages" width="800"/>
<img src="./assets/S12/168.png" alt="packages" width="800"/>
Now if we go to the product model and we have a look at the save method, there I am actually looking for the right object but I'll have a problem with updating it because thereI'll try to set my object ID to a different object id to a string because here I'm just referring to this which will hold the unmodified objectid. So what I should do is I should automatically convert the objectid, the ID here which is a string to an object and the object in the constructor so that I can remove it down there because _id will now always be an object id field, no matter if I'm using it in a filter or if I'm using it for updating.
<img src="./assets/S12/169.png" alt="packages" width="800"/>
- Now this works again.
- This is a better approach 

# S12 | Deleting Products
---
<img src="./assets/S12/170.png" alt="packages" width="800"/>
<img src="./assets/S12/171.png" alt="packages" width="800"/>
<img src="./assets/S12/172.png" alt="packages" width="800"/>
<img src="./assets/S12/173.png" alt="packages" width="800"/>
<img src="./assets/S12/174.png" alt="packages" width="800"/>
<img src="./assets/S12/175.png" alt="packages" width="800"/>
<img src="./assets/S12/176.png" alt="packages" width="800"/>
<img src="./assets/S12/177.png" alt="packages" width="800"/>
<img src="./assets/S12/178.png" alt="packages" width="800"/>
<img src="./assets/S12/179.png" alt="packages" width="800"/>
<img src="./assets/S12/180.png" alt="packages" width="800"/>

What was the problem when we tried to add a product ? 
Lets see next

# S12 | Fixing the "Add Product" Functionality
---
<img src="./assets/S12/181.png" alt="packages" width="800"/>
<img src="./assets/S12/182.png" alt="packages" width="800"/>
<img src="./assets/S12/183.png" alt="packages" width="800"/>
So that _id is the problem and that makes sense because I actually do initialize _id here at the beginning by creating a new mongodb object id. So even if we pass no ID and this therefore is undefined, this will create an object and store it in _id, so _id down there will always be defined and if it's just such an empty or automatically generated object id object, this should be the issue here.  

<img src="./assets/S12/184.png" alt="packages" width="800"/>
<img src="./assets/S12/185.png" alt="packages" width="800"/>
<img src="./assets/S12/186.png" alt="packages" width="800"/>

## [x] Lets Code - DONE

# S12 | Creating New Users
---
<img src="./assets/S12/187.png" alt="packages" width="800"/>
<img src="./assets/S12/188.png" alt="packages" width="800"/>
<img src="./assets/S12/189.png" alt="packages" width="800"/>
<img src="./assets/S12/190.png" alt="packages" width="800"/>
<img src="./assets/S12/191.png" alt="packages" width="800"/>
<img src="./assets/S12/192.png" alt="packages" width="800"/>
<img src="./assets/S12/193.png" alt="packages" width="800"/>
<img src="./assets/S12/194.png" alt="packages" width="800"/>
<img src="./assets/S12/195.png" alt="packages" width="800"/>
<img src="./assets/S12/196.png" alt="packages" width="800"/>

# S12 | Storing the User in our Database
---
We can store the user information inside the product in 2 ways: 
1. Embed the whole user object or partially store some user properties which wont change much.
2. Only store the user reference inside the product.

<img src="./assets/S12/197.png" alt="packages" width="800"/>
<img src="./assets/S12/198.png" alt="packages" width="800"/>
<img src="./assets/S12/199.png" alt="packages" width="800"/>
<img src="./assets/S12/200.png" alt="packages" width="800"/>
<img src="./assets/S12/201.png" alt="packages" width="800"/>

# S12 | Working on Cart Items & Orders
---
<img src="./assets/S12/202.png" alt="packages" width="800"/>
<img src="./assets/S12/203.png" alt="packages" width="800"/>
<img src="./assets/S12/204.png" alt="packages" width="800"/>
<img src="./assets/S12/205.png" alt="packages" width="800"/>
<img src="./assets/S12/206.png" alt="packages" width="800"/>

# S12 | Adding the "Add to Cart" Functionality 
---

<img src="./assets/S12/207.png" alt="packages" width="800"/>
<img src="./assets/S12/208.png" alt="packages" width="800"/>
<img src="./assets/S12/209.png" alt="packages" width="800"/>
<img src="./assets/S12/210.png" alt="packages" width="800"/>
<img src="./assets/S12/211.png" alt="packages" width="800"/>
<img src="./assets/S12/212.png" alt="packages" width="800"/>
<img src="./assets/S12/213.png" alt="packages" width="800"/>
<img src="./assets/S12/214.png" alt="packages" width="800"/>
<img src="./assets/S12/215.png" alt="packages" width="800"/>
<img src="./assets/S12/216.png" alt="packages" width="800"/>
<img src="./assets/S12/217.png" alt="packages" width="800"/>
<img src="./assets/S12/218.png" alt="packages" width="800"/>
<img src="./assets/S12/219.png" alt="packages" width="800"/>

# S12 | Storing Multiple Products in the Cart
---
<img src="./assets/S12/220.png" alt="packages" width="800"/>
<img src="./assets/S12/221.png" alt="packages" width="800"/>
<img src="./assets/S12/222.png" alt="packages" width="800"/>
<img src="./assets/S12/223.png" alt="packages" width="800"/>
<img src="./assets/S12/224.png" alt="packages" width="800"/>
<img src="./assets/S12/225.png" alt="packages" width="800"/>
<img src="./assets/S12/226.png" alt="packages" width="800"/>
<img src="./assets/S12/227.png" alt="packages" width="800"/>
<img src="./assets/S12/228.png" alt="packages" width="800"/>

# S12 | Displaying the Cart Items
---
<img src="./assets/S12/229.png" alt="packages" width="800"/>
<img src="./assets/S12/230.png" alt="packages" width="800"/>
<img src="./assets/S12/231.png" alt="packages" width="800"/>
<img src="./assets/S12/232.png" alt="packages" width="800"/>
<img src="./assets/S12/233.png" alt="packages" width="800"/>
<img src="./assets/S12/234.png" alt="packages" width="800"/>
<img src="./assets/S12/235.png" alt="packages" width="800"/>
<img src="./assets/S12/236.png" alt="packages" width="800"/>
<img src="./assets/S12/237.png" alt="packages" width="800"/>

# S12 | Fixing a Bug
---
<img src="./assets/S12/238.png" alt="packages" width="800"/>
<img src="./assets/S12/239.png" alt="packages" width="800"/>
<img src="./assets/S12/240.png" alt="packages" width="800"/>
<img src="./assets/S12/241.png" alt="packages" width="800"/>


# S12 | Deleting Cart Items
---

## [x] Lets Code - DONE