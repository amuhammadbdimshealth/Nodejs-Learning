const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.use('/users', (req, res, next) => {    
    // console.log(path.join(__dirname, 'views', 'users.html'));
    res.sendFile(path.join(__dirname, 'views', 'users.html'))
})

app.use((req, res, next) => {    
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'))
})


app.listen(3000);

