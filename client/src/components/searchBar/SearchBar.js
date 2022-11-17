import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../redux/actions/index.js";


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
        <div>
            <input type="text" placeholder="..." onChange={(e)=>handleChange(e)}/>
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
};

export default SearchBar;