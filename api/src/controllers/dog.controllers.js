const axios = require("axios");
const {Dog, Temperament} = require("../db");
const {
  API_KEY
} = process.env;



const getDogs = async () =>{
    try{
        const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key={${API_KEY}}`)
        let dogsApi = [];

        apiInfo.data.map((el)=> {

          if(el.temperament){

            dogsApi.push({
               id: el.id,
               name: el.name.toLowerCase(),
               height: el.height.metric,
               weight: el.weight.metric,
               life_span: el.life_span,
               image: el.image.url,
               temperament: (el.temperament.split(",")).map(el=>el.toLowerCase().trim())
           });
          }else{
            dogsApi.push({
              id: el.id,
              name: el.name.toLowerCase(),
              height: el.height.metric,
              weight: el.weight.metric,
              life_span: el.life_span,
              image: el.image.url,
              temperament: []
          });
          }
        });  

       const dbInfo = await Dog.findAll({include:{ model: Temperament}});
       let dogsDb = [];
       for(let i=0; i < dbInfo.length; i++){
          dogsDb.push({
            id: dbInfo[i].id,
            name: dbInfo[i].name,
            height: dbInfo[i].height,
            weight: dbInfo[i].weight,
            life_span: dbInfo[i].life_span,
            image: dbInfo[i].image,
            createInDb: dbInfo[i].createInDb,
            temperament: dbInfo[i].temperaments.map(el=>el.name)
          })
       }
       
       const allInfo = [...dogsApi, ...dogsDb];
        return allInfo;

    }catch(error){
     throw new Error(error.message);
    }
};

const createDog = async (name, height, weight, life_span, image, temperament)=>{
 try{
   if(!(name)||!(height)||!(weight)||!(image)){
      throw new Error("One of the arguments is not defined")
    }
    
    let newName = name.toLowerCase();
    const result = await Dog.findOne({where:{name: newName}});
    if(result) throw new Error("La raza ya fue creada");
    
    const newDog = await Dog.create({
      name: newName,
      height: height,
      weight: weight,
      life_span: life_span,
      image: image
    });
   
    let temperamentDogs = await Temperament.findAll({
      where:{
        name: temperament
      }
    }); 

    newDog.addTemperament(temperamentDogs);
    
    return newDog;
 }catch(error){
   throw new Error(error.message);
 }
};


const getDogsId = async (id)=>{
 try{
   const dogs = await getDogs();
   const result = dogs.find(el => el.id.toString() === id.toString());
   if(!(result)){
     throw new Error("Not found");
   }else{
     return result;
   }
 }catch(error){
  throw new Error(error.message);
 }
}

const getDogsName = async(name)=>{
  try{
    const dogs = await getDogs();
    const result = dogs.find(el=> el.name.toLowerCase() === name.toLowerCase());
    const arr = [];
    arr.push(result);
    if(!(result)){
      throw new Error("Not found");
    }else{
      return arr;
    }
  }catch(error){
    throw new Error(error.message);
  }
}



module.exports = {
    getDogs,
    createDog,
    getDogsId,
    getDogsName
}
