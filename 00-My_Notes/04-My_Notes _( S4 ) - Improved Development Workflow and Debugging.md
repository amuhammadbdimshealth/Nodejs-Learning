# S4 | Improved Development Workflow and Debugging
---

# S4 | Module Introduction
---
## Objective
## Lecture Snapshots
<img src="./assets/S4/0.png" alt="packages" width="800"/>

# S4 | Understanding NPM Scripts
---
## Objective
## Lecture Snapshots

### npm init
<img src="./assets/S4/1.png" alt="packages" width="800"/>

### you get `package.json` file 
<img src="./assets/S4/2.png" alt="packages" width="800"/>

### scripts section
<img src="./assets/S4/3.png" alt="packages" width="800"/>

### add a new script command 
This is a good practice. Whenever you share the project the **entry point** need not be known. The user just has to type `npm start` to run the project.
<img src="./assets/S4/4.png" alt="packages" width="800"/>
<img src="./assets/S4/5.png" alt="packages" width="800"/>

For normal script command like `start-server` you have to run `npm run start-server` unlike `npm start`.
<img src="./assets/S4/6.png" alt="packages" width="800"/>

# S4 | Installing 3rd Party Packages
---
## Objective
## Lecture Snapshots
<img src="./assets/S4/7.png" alt="packages" width="800"/>

### live reload on server code update 
* i.e auto refresh without manually quitting server and restarting after changing code
* package Installation - `npm install` 
* package name : nodemon
<img src="./assets/S4/8.png" alt="packages" width="800"/>

### define how you want to install
#### install as production dependancy
<img src="./assets/S4/9.png" alt="packages" width="800"/>

#### install as development dependancy
<img src="./assets/S4/10.png" alt="packages" width="800"/>

#### install globally on machine
<img src="./assets/S4/11.png" alt="packages" width="800"/>

### installing
<img src="./assets/S4/12.png" alt="packages" width="800"/>
<img src="./assets/S4/13.png" alt="packages" width="800"/>

### free up space and npm install to re-install all dependeccies
`npm install`

# S4 | Using Nodemon for Autorestarts
---
## Objective
## Lecture Snapshots

### change the script start command 
<img src="./assets/S4/14.png" alt="packages" width="800"/>
<img src="./assets/S4/15.png" alt="packages" width="800"/>

### npm start
starts the server and nodemon watches the file for any changes and auto restarts server when code changes and the files are saved.
<img src="./assets/S4/16.png" alt="packages" width="800"/>

### Global & Local npm Packages
<img src="./assets/S4/17.png" alt="packages" width="800"/>

# S4 | Understanding different Error Types
---
## Objective
## Lecture Snapshots
<img src="./assets/S4/18.png" alt="packages" width="800"/> 

# S4 | Syntax Error
# S4 | RunTime Error
# S4 | Logical Errors
---
## Objectives
## Lecture Snapshots

### stop the node server and then start debugging as below

### debugger
<img src="./assets/S4/19.png" alt="packages" width="800"/>
<img src="./assets/S4/20.png" alt="packages" width="800"/>
<img src="./assets/S4/21.png" alt="packages" width="800"/>
<img src="./assets/S4/22.png" alt="packages" width="800"/> 
<img src="./assets/S4/23.png" alt="packages" width="800"/> 
<img src="./assets/S4/24.png" alt="packages" width="800"/> 
<img src="./assets/S4/25.png" alt="packages" width="800"/> 
<img src="./assets/S4/26.png" alt="packages" width="800"/> 
<img src="./assets/S4/27.png" alt="packages" width="800"/> 
<img src="./assets/S4/28.png" alt="packages" width="800"/> 
<img src="./assets/S4/29.png" alt="packages" width="800"/> 

### view - debug
<img src="./assets/S4/30.png" alt="packages" width="800"/> 
<img src="./assets/S4/31.png" alt="packages" width="800"/> 
<img src="./assets/S4/32.png" alt="packages" width="800"/> 
<img src="./assets/S4/33.png" alt="packages" width="800"/> 
<img src="./assets/S4/34.png" alt="packages" width="800"/> 
<img src="./assets/S4/35.png" alt="packages" width="800"/> 

# S4 | Using The Debugger
---
## Objectives
## Lecture Snapshots

### debug configuration
set the source as the starting point of debug
<img src="./assets/S4/37.png" alt="packages" width="800"/>
<img src="./assets/S4/38.png" alt="packages" width="800"/>
 
### run code in debug console to view the stored value in variable.
<img src="./assets/S4/36.png" alt="packages" width="800"/>

# S4 | Restarting the Debugger Automatically After Editing our App
---
## Objectives
After editing our code we want the debugger to start automatically.

## Lecture Snapshots
### Add configuration
<img src="./assets/S4/39.png" alt="packages" width="800"/>
<img src="./assets/S4/40.png" alt="packages" width="800"/>

### restart=true
<img src="./assets/S4/41.png" alt="packages" width="800"/>

### make sure nodemon is used - so that the debugging is auto restarted when code changes.
<img src="./assets/S4/42.png" alt="packages" width="800"/>

### you can changed the terminal where things are logged.
<img src="./assets/S4/43.png" alt="packages" width="800"/>

### debugger looks nodemon globally installed
<img src="./assets/S4/44.png" alt="packages" width="800"/>

### If you are using the nodemon process then you should use the integrated terminal.
This is useful when you stop debugger and then have to quit the nodemon separately using Ctrl + c which would not have been possible with the **debug console**
<img src="./assets/S4/43.png" alt="packages" width="800"/>

## Debugging Node.js in Visual Studio Code
Want to dive super-deep into the latest debugging capabilities Visual Studio Code gives you (for Node.js apps)?

[This article will be very helpful](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

<img src="./assets/S4/45.png" alt="packages" width="800"/>

# S4 | Changing Variables in the Debug Console
---
## Objectives
## Lecture Snapshots
<img src="./assets/S4/46.png" alt="packages" width="800"/>
This will affect the runtime.

# S4 | Wrap Up
---
## Objectives
## Lecture Snapshots
<img src="./assets/S4/47.png" alt="packages" width="800"/>