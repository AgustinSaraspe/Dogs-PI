


const initialState = {
    allDogs: [],
    dogDetail: [],
    dogs: [],
    allTemperaments:[],
    error: null
}


const rootReducer = (state = initialState, action) => {
  switch(action.type){
     case "GET_DOGS":
      return{
            ...state,
           allDogs: action.payload,
           dogs: action.payload
      };
     case "GET_DOG_ID":
      return{
              ...state,
              dogDetail: action.payload
      };
     case "GET_DOG_NAME":
      return{
         ...state,
         allDogs: action.payload
      };   
      case "GET_TEMPERAMENT":
         return{
            ...state,
            allTemperaments: action.payload
      };
      case "POST_DOG":
         return{
            ...state
      };
     case "FILTER_BY_WEIGHT":
         const allDogsFilterW = state.allDogs;
         const filterByWeight = action.payload === "Heavy" ? 
         allDogsFilterW.sort((a,b)=>{
            let newA = a.weight.split(" - ");
            let newB = b.weight.split(" - ");
            if(parseInt(newA[0]) < parseInt(newB[0])){
               return 1
            }
            if(parseInt(newA[0]) > parseInt(newB[0])){
               return -1
            }else{
               return 0;
            }
         })
         :  allDogsFilterW.sort((a,b)=>{
            let newA = a.weight.split("-");
            let newB = b.weight.split("-");
            if(parseInt(newA[0]) > parseInt(newB[0])){
               return 1
            }
            if(parseInt(newA[0]) < parseInt(newB[0])){
               return -1
            }else{
               return 0;
            }
         });
       return{
            ...state,
            allDogs: filterByWeight
      };  
    case "FILTER_BY_ALPHABET":
        const allDogsFilterA = state.allDogs;
        const filterByAlphabet = action.payload === "asce" ?
        allDogsFilterA.sort((a,b)=>{
        if(a.name > b.name){
           return 1;
         }
       if(a.name < b.name){
          return -1;
        }else{
          return 0;
         }
      })
     :allDogsFilterA.sort((a,b)=>{
      if(a.name > b.name){
         return -1;
      }  
      if(a.name < b.name){
         return 1;
      }else{
         return 0;
      }
    });
   return{
    ...state,
    allDogs: filterByAlphabet
   };
   case "FILTER_BY_CREATE_MODE":
      const allDogsFilterCM = state.dogs;
      const filterByCreateMode = action.payload === "All"
      ? state.dogs : action.payload === "Created" ? allDogsFilterCM.filter(el =>(el.hasOwnProperty("createInDb") === true))
      : allDogsFilterCM.filter(el => (el.hasOwnProperty("createInDb") === false))
   return{
    ...state,
    allDogs: filterByCreateMode
   };
   case "FILTER_BY_TEMPERAMENT":
    const allDogsFilterT = state.dogs;
    const filterByTemperament = action.payload === "All" ? state.dogs 
    : allDogsFilterT.filter((el)=> el.temperament.map(el=>el).includes(action.payload))
      return{
       ...state,
       allDogs: filterByTemperament
      }
   case "ERROR":
      return{
         ...state,
         error: action.payload
      }   
   default: return state
   }
};

export default rootReducer;