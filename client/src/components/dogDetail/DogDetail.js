import React, { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {getDogId} from "../../redux/actions/index.js";



const DogDetail = (props)=>{

    const dispatch = useDispatch();
    const idDog = props.match.params.id;

    useEffect((el)=>{
         dispatch(getDogId(idDog));
    },[])

    const dog = useSelector((state)=> state.dogDetail);

    return(
        <div>
            <img src={dog.image} alt="imgage not found" width="200px" height="250px"/>
             <h2>{dog.name}</h2>
             <h4>{dog.temperament && dog.temperament.join(" ")}</h4>
             <h5>{dog.height}</h5>
             <h5>{dog.weight}</h5>
             <h6>{dog.life_span}</h6>            
        </div>
    )
}

export default DogDetail;