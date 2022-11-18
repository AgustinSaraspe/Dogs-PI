import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../redux/actions/index.js";
import "./SearchBar.css";
import lupa from  "../../assest/lupa.png"


const SearchBar = ({updateCurrentPage}) =>{
   const dispatch = useDispatch();
   const [dogName, setDogName] = useState();

    const handleChange = (e) =>{
       e.preventDefault();
       setDogName(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getDogName(dogName));
        updateCurrentPage();
    }

    return(
        <div className="search">
            <input className="inputSearch" type="text" placeholder="..." onChange={(e)=>handleChange(e)}/>
           <img onClick={(e)=>handleSubmit(e)} className="lupa" src={lupa}/>
        </div>
    )
};

export default SearchBar;