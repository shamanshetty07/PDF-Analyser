const express=require("express");
const  {Pool}=require('pg')
const app=express();
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
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