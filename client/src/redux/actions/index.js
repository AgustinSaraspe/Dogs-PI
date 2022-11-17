import axios from "axios";


export const getDogs = () =>{
  return async function(dispatch){
    const json = await axios.get("http://localhost:3001/dogs");
    return dispatch({ type: "GET_DOGS", payload: json.data });
  }
};

export const getTemperaments = () =>{
  return async function(dispatch){
    const json = await axios.get("http://localhost:3001/temperaments");
    return dispatch({type:"GET_TEMPERAMENT", payload: json.data});
  }
}

export const getDogId = (id) =>{
  return async function(dispatch){
    try{
      const json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({type:"GET_DOG_ID", payload: json.data});
    }catch(e){
      return dispatch({type:"ERROR", payload: {error: e.message}});
    }
  }
};


export const getDogName = (name) =>{
  return async function(dispatch){
    try{
      const json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({type:"GET_DOG_NAME", payload: json.data})
    }catch(e){
      return dispatch({type:"ERROR", payload:{error: e.message}});
    }
  }
}

export const filterDogsByCreatedMode = (payload)=>{
  return{
    type:"FILTER_BY_CREATE_MODE",
    payload
  }
}

export const filterDogsByAlphabet = (payload) =>{
  return{
    type:"FILTER_BY_ALPHABET",
    payload
  }
}

export const filterDogsByWeight = (payload) =>{
  return {
    type: "FILTER_BY_WEIGHT",
    payload
  }
};

export const filterDogsByTemperament = (payload) =>{
  return{
    type:"FILTER_BY_TEMPERAMENT",
    payload
  }
}

export const postDog = (newDog) => {
  return async function(dispatch){
    const dog = await axios.post("http://localhost:3001/dogs", newDog);
    return dog;
  }
}
