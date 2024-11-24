const express = require("express");

app = express();
const port = 3000;

app.get("/", (req,res)=>{
    
})

app.listen(port, ()=>{
    console.log(`${port} is listening`);
})