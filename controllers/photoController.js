import Photo from "../models/photoModels.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createPhoto = async (req,res)=>{
    
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'lenslight',
        }
    );

    try{
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            linkPhoto: result.secure_url,
        });
        fs.unlinkSync(req.files.image.tempFilePath);
        
        res.status(201).redirect('/users/dashboard');
    } catch {
        res.status(500).josn({
            succeeded: false,
            error,
        });
    }
};

const getAllPhotos = async (req,res)=>{
    try{
        const photos = res.locals.user  ? await Photo.find({user : {$ne: res.locals.user._id}})
        :await Photo.find({})
        res.status(200).render('photos',{
            photos,
            link:'photos',
        });
       
        res.status(200).render('photos',{
            photos,
            link:'photos',
        });




    } catch{
        res.status(500).json({
            succeeded: false,
            error: "You did not login",
            details: error.message,
        });
    }
}

const getAPhoto = async (req,res)=>{
    try{
        const photo = await Photo.findById({_id : req.params.id}).populate("user");
        res.status(200).render('photo',{
            photo,
            link:'photo',
        });
    } catch{
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
}

export { createPhoto, getAllPhotos, getAPhoto };