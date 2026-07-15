const express=require("express");
const  {Pool}=require('pg')
const app=express();
const jwt=require("jsonwebtoken")
const fs = require("fs/promises");
const bcrypt=require("bcrypt")
const multer=require("multer");
const {PDFParse}= require("pdf-parse")
require('dotenv').config()
const {GoogleGenAI}=require("@google/genai")
const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})
const cloudinary=require("cloudinary").v2
cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,

    api_key: process.env.API_KEY,

    api_secret: process.env.API_SECRET

});
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const upload = multer({ storage });
app.use(express.json())
const pool= new Pool({
    connectionString:""
})
app.get("/",(req,res)=>{
    res.send("server is working")
})
app.post("/signup",async (req,res)=>{
    const username= req.body.username;
    const password=req.body.password;
    const email=req.body.email;
    
    const userexists=await pool.query(`SELECT * FROM users WHERE username=$1 OR email=$2`,[username,email]);
    if(userexists.rows.length>0){
        res.status(405).json({
            message:"already user exists with this username or password"
        })

    }else{

        const hashedpassword=await bcrypt.hash(password,10)
        const response=await pool.query(`INSERT INTO users(username,email,password) VALUES ($1,$2,$3) RETURNING userid;`,[username,email,hashedpassword])
        console.log(response);
        res.json({
            message:"you have successfully signed up"
        })
    }
})


app.listen(3000,()=>{
    console.log("server started listening a port 3000")
})

app.post("/signin",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const userexists=await pool.query(`SELECT * FROM users WHERE username=$1`,[username]);
    if(userexists.rows.length>0){
        const grant=userexists.rows[0];
        const correctedpassword=await bcrypt.compare(password,grant.password)
        if(correctedpassword){
       const token= jwt.sign({
            username
        },"secretkey")
        res.json({
            token
        })}else{
            res.status(401).json({
                message:"password is incorrect"
            })
        }
    }else{
        res.status(401).json({
            message:"user does not exist"
        })
    }
})

app.post("/upload", upload.single("pdf"), async (req, res) => {
  let parser;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded (expected field name 'pdf')" });
    }

    const buffer = await fs.readFile(req.file.path);
    parser = new PDFParse({ data: buffer });
    const text = await parser.getText();

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text.text,
    });

    res.json({ message: geminiResponse.text });
  } catch (err) {
    console.error("upload route failed:", err);
    res.status(500).json({ message: "Failed to process PDF", error: err.message });
  } finally {
    if (parser) await parser.destroy();
  }
});
