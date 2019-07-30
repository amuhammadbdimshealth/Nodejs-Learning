# S2 | Javascript - A quick refresher
---

## S2 | JavaScript in a Nutshel
---
### Lecture Snapshots
<img src="./assets/S2/1.png" alt="packages" width="800"/>  

## S2 | let & const
---
### Lecture Snapshots
<img src="./assets/S2/2.png" alt="packages" width="800"/>  
<img src="./assets/S2/3.png" alt="packages" width="400"/>  

The this keyword is different for Normal functions and Arrow functions.
<img src="./assets/S2/4.png" alt="packages" width="800"/>  
<img src="./assets/S2/5.png" alt="packages" width="800"/>  
<img src="./assets/S2/6.png" alt="packages" width="800"/>  


## S2 | Working with Objects, Properties & Methods
---
### Lecture Snapshots
Why the output is `Hi, I am undefined` ?
<img src="./assets/S2/7.png" alt="packages" width="800"/>

Because of the arrow function, the `this` keyword refers to the global scope and not the person object. To change this behaviour we have to remove the arrow function and use the old syntax of writing functions:
<img src="./assets/S2/8.png" alt="packages" width="800"/>
Or use greet like below : 
<img src="./assets/S2/9.png" alt="packages" width="800"/>

## S2 | Arrays & Array Methods
---
### Lecture Snapshots
 <img src="./assets/S2/10.png" alt="packages" width="800"/>
 
 `Array.map()`
<img src="./assets/S2/11.png" alt="packages" width="800"/>

## S2 | Arrays, Objects & Reference Types
---
### Lecture Snapshots
Editing a thing the const is pointing at
<img src="./assets/S2/12.png" alt="packages" width="800"/>

## S2 | Understanding Spread & Rest Operators
---
### Lecture Snapshots
Create a new array with all the existing value copied from the old array and also add some new property without editing the existing array.

copy with `slice()`
<img src="./assets/S2/13.png" alt="packages" width="800"/>

copy with the `spread` operator
<img src="./assets/S2/14.png" alt="packages" width="800"/>

the `REST` operator - used to merge elements
<img src="./assets/S2/15.png" alt="packages" width="800"/>
<img src="./assets/S2/16.png" alt="packages" width="800"/>

## S2 | Destructuring
---
### Lecture Snapshots
<img src="./assets/S2/17.png" alt="packages" width="800"/>
<img src="./assets/S2/18.png" alt="packages" width="800"/>
<img src="./assets/S2/19.png" alt="packages" width="800"/> 

## S2 | Async Code & Promises
---
### Lecture Snapshots
<img src="./assets/S2/20.png" alt="packages" width="800"/> 

Nested callback 
<img src="./assets/S2/21.png" alt="packages" width="800"/> 

Promises
<img src="./assets/S2/22.png" alt="packages" width="800"/> 

## S2 | Template literals 
---
### Lecture Snapshots
It's a different way of writing strings.
Instead of using double or single quotation marks:
'A String'
or
"Another string"

you can use backticks (`) . 
`Another way of writing strings`

Now why would we use that way of creating strings?
With that syntax, you can dynamically add data into a string like this:
<img src="./assets/S2/23.png" alt="packages" width="800"/> 