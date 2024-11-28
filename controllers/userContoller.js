import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Photo from "../models/photoModels.js";



const userCreate = async (req,res)=>{
    try{
        const user = await User.create(req.body);
        res.status(201).json( {user: user._id } );   
        
    } catch(error){
        
        let errors2 = {}

        if(error.name === "ValidationError"){
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            })
        }
        
        
        
        if(error.code === 11000){
            errors2.email = "The email is already registered."
        }
        
        
        
        
        

        res.status(400).json(errors2);
    }
};

const loginUser = async (req,res) => {
    try {
        const {nameSurname, password} = req.body;
        
        const user = await User.findOne({nameSurname: nameSurname})
       
        let same = false;
        
        if(user){
            same = await bcrypt.compare(password, user.password)
        }else {
            return res.status(401).json({
                suuceeded: false,
                error: 'There is no such user'
            })
        }

        if(same){
            const token =  createToken(user._id);
            res.cookie("jsonwebtoken", token, {
                httpOnly:true,
                maxAge: 1000*60*60*24,
            })

            res.redirect("/users/dashboard");
            
        } else{
             res.status(401).json({
                succeeded: false,
                error: 'Password are not matched',
            });
        }
    } catch {
        res.status(500).json({
            suuceeded: false,
            error,
        });
    }
}

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:'1d',
    });
}

const getDashboardPage = async(req,res)=>{
    const photos = await Photo.find({ user: res.locals.user._id })
    res.render("dashboard",{
        link : 'dashborad',
        photos
    });
}

export { userCreate, loginUser, getDashboardPage };