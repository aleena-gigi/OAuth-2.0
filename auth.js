require('dotenv').config()  //loads the env variables
const express=require("express")
const app=express()
const jwt=require("jsonwebtoken")

//1. Request fromm client with credentials as queries
app.get("/",(req,res)=>{
    
    const ClientID=req.query.Client_Id
    const ClientSecret=req.query.Client_Secret
    const url=req.query.redirect_uri
   
    if (process.env.Client_Id == ClientID && process.env.Client_Secret == ClientSecret){    //Authorisation
        // Create token jwt.sign(Payload,jwttoken,option for encryption and ttl of the token)
        const token = jwt.sign({ ClientID },process.env.TOKEN_KEY,{
          algorithm: "HS256",
          expiresIn: 3600
          })
        const rurl=new URL(url)
        rurl.searchParams.append("client id",ClientID)
        rurl.searchParams.append("token",token)
        rurl.searchParams.append("redirect_uri","http://localhost:3002/auth/access")  //the url to which the client redirects to get the access token
        res.redirect(rurl.toString())   //redirects to the client(localhost:3000/callback) to give the refresh token(jwtkey)
    }
   
 })

 //3. Client gets redirected to this call to acquire the access token
app.get("/auth/access",(req,res)=>{
  console.log("Access token")
  url=new URL(req.query.redirect_uri)
  url.searchParams.append("access_token",process.env.ACCESS_TOKEN)
  res.redirect(url.toString())
  // res.send()
   
 })
 app.listen(3002)



