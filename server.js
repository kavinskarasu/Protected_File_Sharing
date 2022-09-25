const express=require('express');
const ejs=require('ejs');
const multer=require('multer')
const app=express();

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(4000,()=>{
console.log("server running on port 4000");
})