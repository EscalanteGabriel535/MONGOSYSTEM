import { Router } from "express";
import Celulares from "../models/Celular";


const router = Router();

router.get("/", async (req,res) => {
    const celulares = await Celulares.find().lean();
    

    res.render("index", {celulares: celulares});
});


router.post("/celular/agregar", async (req,res) =>{
    try {
        const celulares = Celulares(req.body);
        await celulares.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

router.get("/updateCelulares/:id", async(req,res) => {
    try{
        const celulares = await Celulares.findById(req.params.id).lean();
        res.render("editarCelularr", {celulares});
    }catch(error){
        console.log(error.message);
    }
});



router.post("/updateCelulares/:id", async(req,res) => {
    const {id} = req.params;
    await Celulares.findByIdAndUpdate(id, req.body);
    res.redirect("/");
});





router.get("/deleteCelulares/:id", async(req,res) => {
    const {id} = req.params;
    await Celulares.findByIdAndDelete(id, req.body);
    res.redirect("/");
});

export default router;