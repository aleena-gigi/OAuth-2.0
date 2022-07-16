
const r=require("rand-token")
let JWT_KEY=r.uid(7).concat("+",r.uid(4))
let Client_Id=r.uid(20)
let Client_Secret=r.uid(40)
let AuthToken=r.uid(23)
console.log(i)
//Store the client credentials and set it in the .env  file
//Then add require('dotenv').config() to the first line of index.js
//in exhange for the credentials generate a JWT key 
//Use math to validate the token


/*Generating Client Id and Client Secret using urid
Inorder to run this make sure to add { "type":"module"} in the package.json file
import  urid  from 'urid'
const Client_Id=urid(20,"alphanum")
const  Client_Secret=urid(40,"alphanum")
const AuthToken=urid(23,"alphanum")
console.log(Client_Id)
console.log(Client_Secret)
console.log(AuthToken) */