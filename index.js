const express = require('express');
require("./config");
const Product = require('./product');
const app = express();

app.use(express.json());
app.post("/create", async (req, resp) => {
    let data = new Product(req.body);
    const result = await data.save();
    resp.send(result);
});

app.get('/list', async(req, res)=>{
    let data = await Product.find({});
    res.send(data);
});

app.put('/update/:_id', async (req, res) => {
    let data = await Product.updateOne(
        req.params,
        {$set:req.body}
    );
    res.send(data);
});

app.delete('/delete/:_id', async (req, res)=>{
    let data = await Product.deleteOne(req.params)
    res.send(data);
});

//search
app.get('/search/:key', async (req, res)=>{
    let data = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            // {price:{$regex:req.params.key}},
            // {year:{$regex:req.params.key}}
        ]
    });
    res.send(data);
});

app.listen(5000,()=>{
    console.log('app is listning to port 5000.')
});