import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userCreate = async (req,res)=>{
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            succeeded: true,
            user,
        });
    } catch(error){
        console.log("error", error)

        res.status(500).json({
            succeeded: false,
        });
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
            res.status(200).json({
                user,
                token: createToken(user._id),
            })
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


export { userCreate, loginUser};