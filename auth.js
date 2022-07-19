require('dotenv').config()  //loads the env variables
const express=require("express")
const app=express()
const jwt=require("jsonwebtoken")


app.get("/",(req,res)=>{          //1. Request from client with credentials as queries   
    const ClientID=req.query.Client_Id
    const ClientSecret=req.query.Client_Secret
           
    //Authentication
    if (process.env.Client_Id == ClientID && process.env.Client_Secret == ClientSecret){    
         const user={
          ClientID: ClientID
        }      
        const token = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{        // Create token jwt.sign(Payload,secretkey,option for encryption and ttl of the token)
          algorithm: "HS256",
          expiresIn: 900
          })    //generates refresh token
        console.log("refresh token: ",token)
        let url="http://localhost:3000/callback"
        const rurl=new URL(url)
        rurl.searchParams.append("client id",ClientID)
        rurl.searchParams.append("token",token)
        res.redirect(rurl.toString())   //redirects to the client(localhost:3000/callback) to give the refresh token(jwtkey)
    }
   
 })



app.get("/auth/access",(req,res)=>{
  const authheader=req.get('Authorization') //it gives value of authorisation header as 'Bearer <token>'
  const token=authheader && authheader.split(' ')[1]  //checks whether there is authheader and split by space bcos of the space bw bearer and token and give <token>
  if (token==undefined){
    res.sendStatus(401)
  }
   
  jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err)=>{
    if(err) res.sendStatus(403)     //sends REFRESHtoken is no longer valid
  })
  const ACCESS_TOKEN = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{        // Create token jwt.sign(Payload,secretkey,option for encryption and ttl of the token)
    algorithm: "HS256",
    expiresIn: 300
    }) 
  res.send(ACCESS_TOKEN)
})
app.listen(3002)



