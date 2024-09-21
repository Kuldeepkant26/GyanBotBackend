const express = require('express');
const mongoose = require('mongoose');

const app = express();

const ExpressError = require('./Utils/ExpressError');

async function mian() {
    mongoose.connect('mongodb://127.0.0.1:27017/gbot');
}
mian().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})
require('dotenv').config();
const cors = require('cors');
const authRoute = require('./Routes/authRoute');
//1 Middle wares
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server is Listening on ${process.env.PORT}`)
})
app.get('/', (req, res) => {
    res.send("Routes are working");
})
app.use('/api/auth', authRoute);


app.use((err, req, res, next) => {
    let { statusCode, message } = err;
    // res.render('error.ejs', { statusCode, message });
    res.status(statusCode).json({
        message: message
    })
});