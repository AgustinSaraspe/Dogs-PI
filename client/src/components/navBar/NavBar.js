import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import { getDogs } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assest/patitaDe.png"
import "./NavBar.css"


const NavBar = ()=>{

    const dispatch = useDispatch();
 

    const handleClick = (e)=>{
     dispatch(getDogs());
    }

    return(
        <div className="nav">
            <div>
                <img src={img}/>
            </div>
           <div className="info">
               <button className="btn" onClick={(e)=>handleClick(e)}>Reset</button>
               <Link to="/"><button className="btn">Back</button></Link>
           </div>
        </div>
    )
}

export default NavBar;