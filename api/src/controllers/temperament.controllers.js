const axios = require("axios");
const { Temperament} = require("../db");
const {
    API_KEY
  } = process.env;
  

const getTemperaments = async () =>{
    try{
        const db = await Temperament.findAll();
        if(db.length > 0){
          return await Temperament.findAll();
        }else{
            const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key={${API_KEY}}`)
            .then(res => res.data);
        
            let temperaments = [];
        
            apiInfo.map((el)=>{
                if(el.temperament){
                   const tem = el.temperament.split(",");
                    tem.map((el)=>{
                      if(!(temperaments.includes(el.trim()))){
                         temperaments.push(el);
                      }
                    });
                }
            });
            
            temperaments.map( async (el)=>{

                await Temperament.findOrCreate({where:{ name: el.toLowerCase().trim()}});
            });
        }

            

    }catch(err){
        return err.message
    }
}



module.exports = {
    getTemperaments
}
