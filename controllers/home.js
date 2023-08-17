const cloudinary = require("../middleware/cloudinary")
const Bollos = require('../models/Bollos')

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getFlavors: async (req, res) => {
        try {
            let bollos = await Bollos.find();
            res.render("flavors.ejs", { "bollos": bollos })
        } catch (err) {
            console.log(err)
        }
    },
    getAddFlavor: (req, res) => {
        res.render("addFlavor.ejs")
    },
    addFlavor: async (req, res) => {
        try {
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                let imageUrl = result.secure_url;
                let cloudinaryId = result.public_id;

                await Bollos.create({
                        flavor: req.body.flavor,
                        imageUrl: imageUrl, 
                        cloudinaryId: cloudinaryId, 
                        ingredients: req.body.ingredients, 
                        price: req.body.price
                    }
                );
            } else {
                await Bollos.create({
                    flavor: req.body.flavor, 
                    ingredients: req.body.ingredients, 
                    price: req.body.price
                })
            }

            console.log('A flavor has been added!')
            res.redirect('/flavors')
        } catch (err) {
            console.log(err)
        }
    },
    deleteFlavor: async (req, res) => {
        try {
            let bollo = await Bollos.findById({ _id: req.params.id });
            await cloudinary.uploader.destroy(bollo.cloudinaryId);
            await Bollos.deleteOne({ _id: req.params.id });
            console.log("Sabor eliminado");
            res.redirect("/flavors");
        } catch (err) {
            console.log(err);
        }
    },
    getEditFlavor: async (req, res) => {
        let bollo = await Bollos.findById({ _id: req.params.id })
        res.render("editFlavor", { "bollo": bollo });
    },
    editFlavor: async (req, res) => {
        try {
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                let imageUrl = result.secure_url;
                let cloudinaryId = result.public_id;

                await Bollos.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        flavor: req.body.flavor,
                        imageUrl: imageUrl, 
                        cloudinaryId: cloudinaryId, 
                        ingredients: req.body.ingredients, 
                        price: req.body.price
                    }
                );
            } else {
                await Bollos.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        flavor: req.body.flavor, 
                        ingredients: req.body.ingredients, 
                        price: req.body.price
                    }
                );
            }

            console.log("Bollo editado");
            res.redirect("/flavors");
        } catch (err) {
            console.log(err);
        }
    }
}