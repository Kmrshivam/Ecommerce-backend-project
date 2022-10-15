const express = require('express');
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const Product = require("./db/Product")
const app = express();

// app.get("/api", (req, res) => {
//     res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
// })

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result)
})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.name) {
    let user = await User.findOne(req.body).select("-password");
    if(user)
    {
        res.send(user)
    }else{
        res.send({result:"No User found"})

    }
} else {
    res.send({result:"No User found"})
}
})

app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
});

app.get("/products", async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No Product found" })
    }
})

app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    res.send(result);
})


app.listen(5000, () => { console.log("server started on port 5000") })