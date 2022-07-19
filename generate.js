const r=require("rand-token")
let ACCESS_TOKEN_SECRET=r.uid(17).concat("+",r.uid(24))
let REFRESH_TOKEN_SECRET=r.uid(17).concat("+",r.uid(24))
let JWT_KEY=r.uid(7).concat("+",r.uid(4))
let Client_Id=r.uid(20)
let Client_Secret=r.uid(40)
let AuthToken=r.uid(23)


//Store the client credentials and set it in the .env  file
//Then add require('dotenv').config() to the first line of index.js
//in exhange for the credentials generate a JWT key 
//Use math to validate the token

