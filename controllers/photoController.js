import Photo from "../models/photoModels.js";


const createPhoto = async (req,res)=>{
    try{
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
        })
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
        const photos = await Photo.find({})
        res.status(200).render('photos',{
            photos,
            link:'photos',
        });
    } catch{
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
}

const getAPhoto = async (req,res)=>{
    try{
        const photo = await Photo.findById({_id : req.params.id})
        res.status(200).render('photo',{
            photo,
            link:'photos',
        });
    } catch{
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
}

export { createPhoto, getAllPhotos, getAPhoto };