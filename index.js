const express= require('express');
const app = express();
const mongoose = require('mongoose');
const connection = require('./connection');
const UnlockFit = require('./schema');
const cors = require('cors');
app.use(cors());
connection();

mongoose.connection.on("connected",()=>{
    console.log("connected to mongoDb")
})
mongoose.connection.on("error",()=>{
    console.log("failed to connect to mongoDb");
})

app.use(express.json());
const port = 8081

app.post('/postData',(req,res)=>{
    const {weight,unit} = req.body;
    if(!weight || !unit){
        return res.status(402).json({
            error: "please fill all the fields"
        })
    }

    const post = new UnlockFit({
        weight,unit
    })
    post.save().then((result)=>{
        return res.status(201).json({
            message:"data post sucessfully",
            post:result
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error: `Failed to save the data`})
    })
})

app.get('/getWeight',async(req,res)=>{
    try{
        const posts = await UnlockFit.find();
        res.json(posts);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: "Error retrieving posts from database"
        })
    }
});

app.listen(port,()=>(console.log(`server is up at port ${port}`)));