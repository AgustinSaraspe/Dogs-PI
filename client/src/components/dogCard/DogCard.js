import React from "react";


const DogCard = ({name,temperament,image,weight}) =>{
    return(
        <div>
            <img src={image} alt="imgage not found" width="200px" height="250px"/>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <h6>{weight}</h6>
        </div>
    ) 
}

export default DogCard;