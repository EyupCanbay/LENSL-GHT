import express from "express";
import dotenv  from "dotenv";
import conn from "./db.js";
import cookieParser from "cookie-parser";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import { checkUser } from "./middlewares/authMiddleware.js";



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
app.use(cookieParser());
//routes
app.use("*", checkUser);    // it will check every get function when it works from checkUser
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);



app.listen(port, async ()=>{
    console.log(`${port} is listening`);
})