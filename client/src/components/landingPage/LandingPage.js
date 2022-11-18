import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import img from "../../assest/dogsnew.png"
import img2 from "../../assest/patita.png"

const LandingPage = () =>{
    return(
        <div className="landingPage">
            <div className="landing-img">
              <img src={img}/>
            </div>
            <div className="landing-text">
             <img src={img2}/>
             <h1>Welcome</h1>
             <p>A house with dogs is a complete home.</p>
             <Link to="/home">
                <button>Lets go</button>
             </Link>
            </div>
        </div>
    )
};

export default LandingPage;

