const express=require('express');
const ejs=require('ejs');
const mongoose=require('mongoose');
const multer=require('multer')
const app=express();
const upload=multer({dest:"uploads"})
const bcrypt=require('bcrypt')
const fileCreate=require('./File')
const dotenv=require('dotenv');
const { removeListener } = require('./File');
dotenv.config();
app.use(express.json());
console.log(process.env.DB);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!")).catch((err)=>{
console.log(err)
});
app.set("view engine","ejs");

app.get("/",async(req,res)=>{
  console.log(await fileCreate.find())
    res.render("index");
   
})
app.post("/upload",upload.single("file"),async(req,res)=>{
    const fileData={
        path:req.file.path,
        originalName:req.file.originalname

    }
    if(req.body.password!=null&&req.body.password!=""){
        fileData.password= await bcrypt.hash(req.body.password,10)
    }
    const files=await fileCreate.create(fileData);
  res.render("index",{fileLink:`${req.headers.origin}/file/${files.id}`})
     
    
})

app.get("/file/:id",async(req,res)=>{
  const passfile=await fileCreate.findById(req.params.id);
  if(passfile.password!=null){
      if(req.password==null){
        res.render("password");
        return
      }
if(!await bcrypt.compare(req.body.password,passfile.password)){
  res.render("password",{error:true});
  return
}
    
  }
  file.downloadCount++;

  await file.save()
  res.download(file.path,file.originalName);
})

app.listen(process.env.PORT,()=>{
console.log(`server is running on port ${process.env.PORT}`);
})