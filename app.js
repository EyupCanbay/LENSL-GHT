import express from "express";
import dotenv  from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";


dotenv.config();
const port = process.env.PORT;

//connect to db function

conn();

const app = express();

//ejs tamplate engine
app.set("view engine", "ejs");

//static files midilware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);



app.listen(port, async ()=>{
    console.log(`${port} is listening`);
})