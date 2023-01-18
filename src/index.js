const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const express = require('express');

const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(userRouter);

app.get('/', (req, res) => {
    res.json({
        hyup: 'it worked'
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})