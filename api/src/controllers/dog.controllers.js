const axios = require("axios");
const {Dog, Temperament} = require("../db");
const {
  API_KEY
} = process.env;



const getDogs = async () =>{
    try{
        const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?limit=10&api_key={${API_KEY}}`)
        let dogsApi = [];
        apiInfo.data.map((el)=> {
             dogsApi.push({
                id: el.id,
                name: el.name,
                height: el.height.metric,
                weight: el.weight.metric,
                life_span: el.life_span,
                image: el.image.url,
                temperament: (el.temperament.split(",")).map(el=>el.trim())
            });
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
   if(!(name)||!(height)||!(weight)||!(life_span)||!(image)){
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
  return error.message;
 }
};


const getDogsId = async (id)=>{

  const dogs = await getDogs();
  const result = dogs.filter(el => el.id.toString() === id.toString());

  // if( id.length > 10){
  //   const dogDb = await Dog.findOne({
  //     where: {
  //       id: id
  //     },
  //     includes: Temperament
  //   });
  //   return dogDb;
  // }else{
  //   const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?limit=10&api_key={${API_KEY}}`)
  //   .then(res => res.data);
  // }
  
  if(result == []){
    throw new Error("Not found");
  }else{
    return result;
  }
   

}

// const getDogsName = async(name)=>{

//   let newName = name.toLowerCase();
//   const dogDb = await Dog.findOne({
//     where: {
//       name: newName
//     },
//     include: Temperament
//   });
   
//   if(dogDb){

//   }


// }



module.exports = {
    getDogs,
    createDog,
    getDogsId
}
