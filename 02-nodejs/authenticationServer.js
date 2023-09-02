/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

  //additional task print this array


const express = require("express")
const PORT = 3000;
const app = express();
const {v4: uuidv4} = require('uuid')


//database should be the array
const users = []
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

app.use(express.json());

app.post("/signup", (req, res)=> {
  const user = {username, password, firstname, lastname} = req.body;

  const existingUser = users.find(u=> u.username === user.username);

  if(existingUser){
    //user already exists
    return res.status(400).json({msg: "User already exists!"})
  }
  const newUser = {
    id: uuidv4(),
    username, 
    password,
    firstname, 
    lastname
  }
  //otherwise push the new user to the array 
  users.push(newUser);
  
  res.status(201).send(newUser);
})


//login route
app.post("/login", (req, res)=> {
  const {username, password} = req.body;

  const isValid = users.find(u => u.username === username && u.password === password);
 
  if(!isValid){
    return res.status(401).json({mesg: "Invalid Credentials!"})
  }  
  
  const userDetails = {
    id: users.id,
    firstname: users.firstname,
    lastname: users.lastname
  }

  res.send(userDetails)
})

//api for getting the data of the users from the array 
app.get("/data", (req, res)=> {
   
  //make an empty list of the users data where all the users will be showed
  const usersData = []
   const data = users.forEach((user)=>{
      let userDetails = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      }
      //push this object to the usersData
      usersData.push(userDetails)
   })
   res.send({usersData})
})

app.listen((PORT)=>{
   console.log(`The app is running on the port: ${PORT}`)
})





module.exports = app;
