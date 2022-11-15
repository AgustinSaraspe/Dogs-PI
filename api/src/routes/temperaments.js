const {Router} = require("express");
const {getTemperaments} = require("../controllers/temperament.controllers.js");

const router = Router();

router.get("/", async (req, res)=>{
  try{
    const temperaments =  await getTemperaments();
    res.status(200).send(temperaments);
  } catch(err){
    res.status(500).json({err:err.message});
  }
});

module.exports = router;