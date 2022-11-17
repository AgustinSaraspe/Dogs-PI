import React from "react";
import "./Paginado.css";

const Pagination = ({dogsPage, allDogs, pagination})=>{
   
    const pageNumbers = [];
      
    for(let i=1; i <= Math.ceil(allDogs/dogsPage);i++){
        pageNumbers.push(i);
    };


    return(
       <nav> 
          <ul className="pagination">

            {
            pageNumbers && pageNumbers.map((num) =>(
            <li key={num} className="number"><a onClick={()=> pagination(num)}>{num}</a></li>))
            }
          </ul>
       </nav>
    )
};

export default Pagination;