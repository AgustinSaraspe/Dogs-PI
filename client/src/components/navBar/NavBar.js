import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import { getDogs } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";




const NavBar = ()=>{

    const dispatch = useDispatch();
    // const dogs = useSelector((state)=> state.allDogs);

    // useEffect(()=>{

    // },[]);

    const handleClick = (e)=>{
     dispatch(getDogs());
    }

    return(
        <div>
            <div>
                <img src=""/>
            </div>
           <div>
               <Link to="/create">
                  <button>Create</button>
               </Link>
               <button onClick={(e)=>handleClick(e)}>Reset</button>
               <Link to="/">Back</Link>
           </div>
        </div>
    )
}

export default NavBar;