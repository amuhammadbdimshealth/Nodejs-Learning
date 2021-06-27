const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');

const port = 9090;
const validators = [];

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // to allow all origin
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DETELE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const validatorMiddlewares = [
    body('username').isEmail().withMessage('must be a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long')
]
app.post('/arif-validator', validatorMiddlewares,
    (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(username, password)
            return res.status(400).json({ msg: 'Encountered validation errors', errors: errors.array() })
        }

        res.status(201).json({
            msg: 'SUCCESS',
            user: {
                username: username,
                password: password
            }
        })

    })
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})