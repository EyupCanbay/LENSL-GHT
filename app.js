import express from "express";
import dotenv  from "dotenv";
import conn from "./db.js";
import pageRoute from './routes/pageRoute.js';



dotenv.config();
const port = process.env.PORT;

//connect to db function

conn();

const app = express();

//ejs tamplate engine
app.set("view engine", "ejs");

//static files midilware
app.use(express.static('public'));

//routes
app.use("/", pageRoute)


app.listen(port, async ()=>{
    console.log(`${port} is listening`);
})