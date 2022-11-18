import React, { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {getDogId} from "../../redux/actions/index.js";
import "./DogDetail.css"


const DogDetail = (props)=>{

    const dispatch = useDispatch();
    const idDog = props.match.params.id;

    useEffect(()=>{
         dispatch(getDogId(idDog));
    },[])

    const dog = useSelector((state)=> state.dogDetail);

    return(
        <div className="contenedor-detail">
            <div className="detail-img">
            <img src={dog.image} alt="imgage not found"/>
            </div>
            <div className="detail-info">
             <h2>{dog.name}</h2>
             <h4>{dog.temperament && dog.temperament.join(",")}</h4>
             <h5>Height: {dog.height}</h5>
             <h5>Weight: {dog.weight}</h5>
             <h5>Life span: {dog.life_span}</h5>            
            </div>
        </div>
    )
}

export default DogDetail;