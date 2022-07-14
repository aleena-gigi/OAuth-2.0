const express=require("express")
const app=express()

//2.redirects to the url that call this funct for saving the refresh token and sending it to the authorisation server
app.get("/callback",(req,res)=>{        //localhost:3000/callback    redirected to this url after recieving the access token
    
        console.log("Sending request for the access token")
        url=req.query.redirect_uri
        token=req.query.token
        console.log("Refresh token: "+token)
        const uri=new URL(url)
        uri.searchParams.append("token",token)
        uri.searchParams.append("redirect_uri","http://localhost:3000")
        res.redirect(uri.toString())        //localhost:3002/auth/access?token=&redirect_uri
})



//Finally it gets redirected to the main client app with the accesstoken
app.get("/",(req,res)=>{            //redirected to the root to give the access token
    console.log("Access token: "+req.query.access_token)
})
app.listen(3000)