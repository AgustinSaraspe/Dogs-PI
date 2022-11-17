const {Router} = require("express");
const {getDogs, createDog, getDogsId, getDogsName} = require("../controllers/dog.controllers.js");


const router = Router();

router.get("/", async (req, res)=>{
    const {name} = req.query;
    if(name){
      try{
        const dog = await getDogsName(name);
        if(dog){
         res.status(200).json(dog);   
        }else{
          res.status(404).send("Not found");
        }
      }catch(error){
         res.status(500).json({error: error.message});
      }
    }else{
     try{
        const dogs = await getDogs();
        res.status(200).send(dogs)
     }catch(error){
        res.status(500).json({error: error.message});
     }
    }
});

router.get("/:id",async(req,res)=>{
  try{
     const {id} = req.params;
     const result = await getDogsId(id);
     res.status(200).json(result);
  }catch(error){
      res.status(500).json({error:error.message});
  }
});


router.post("/", async (req,res)=>{
   try{
      const {name, height, weight, life_span, image, temperament} = req.body;
      const result = await createDog(name, height, weight, life_span, image,temperament);
      res.status(200).json(result);
   }catch(error){
      res.status(500).json({error: error.message});
   }
})

module.exports = router;