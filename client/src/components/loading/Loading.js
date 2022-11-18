import React from "react";
import Loader from "./loader/Loader";
import "./Loading.css"

const Loading = () =>{
    return(
        <div className="loading">
            <Loader/>
        </div>
    )
}

export default Loading;