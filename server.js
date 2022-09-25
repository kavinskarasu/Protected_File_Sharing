const express=require('express');
const ejs=require('ejs');
const multer=require('multer')
const app=express();
const upload=multer({dest:"uploads"})
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
})
app.post("/upload",upload.single("file"),(req,res)=>{
    res.send("hi")
})

app.listen(4000,()=>{
console.log("server running on port 4000");
})