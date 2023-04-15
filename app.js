const express = require('express')
var cors = require('cors');
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');
app.use(express.json())

app.options("*", cors());

app.use(cors());

app.post('/register', (req, res) => {
    // Save operations
    res.send('Saved Successfully')
})

app.post('/login', (req, res) => {
    // add control from db
    if (req.body.username == 'datateam' && req.body.password == "123456") {
        let data = {
            time: Date(),
            username: req.body.username,
        }
        const secretKey = "datateam";
        const token = jwt.sign(data, secretKey);
        res.send(token)
    } else {
        res.send(false)
    }
})

app.get('/getData', (req, res) => {
    try {
        const token = req.headers.authorization;
        const secretKey = "datateam";
        const verified = jwt.verify(token, secretKey);
        if (verified) {

            // write get data function
            res.send('Successfull!')
        } else {
            res.send('Invalid Token!')
        }
    } catch (e) {
        return res.send('Invalid Token!');
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})