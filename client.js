const express=require("express")
const app=express()
const axios=require("axios")
//2.redirects to the url that call this funct for saving the refresh token and sending it to the authorisation server
app.get("/callback",(req,res)=>{        //localhost:3000/callback    redirected to this url after recieving the access token
    
        console.log("Sending request for the access token")
        // url=req.query.redirect_uri
        token=req.query.token
        console.log("Refresh token: "+token)
        //axios.create()
        let config={
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        axios.get("http://localhost:3002/auth/access",config).
        then(function(response){
            console.log("Access token: "+response.data)})
        .catch(function(err){console.log(err)})
   
})

app.listen(3000)