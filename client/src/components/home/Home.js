import React, { useCallback } from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs, filterDogsByAlphabet, filterDogsByCreatedMode, filterDogsByWeight, getTemperaments,filterDogsByTemperament } from "../../redux/actions/index.js";
import {Link} from "react-router-dom";
import DogCard from "../dogCard/DogCard.js";
import NavBar from "../navBar/NavBar";
import Pagination from "../paginado/Pagination.js";
import "./Home.css";
import SearchBar from "../searchBar/SearchBar";
import Error from "../error/Error.js";
import Loading from "../loading/Loading.js";


const Home = () =>{


    const dispatch = useDispatch(); //mapDispachToProps
    const dogs = useSelector((state)=> state.allDogs); //mapStateToProps
    const temperaments = useSelector((state)=>state.allTemperaments);
    const error = useSelector((state)=>state.error);
  //---------------------PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPage, setDogsPage] = useState(8);
  const indexOfLastDogs = currentPage * dogsPage;
  const indexOfFirstDogs = indexOfLastDogs - dogsPage;
  const currentDogs = dogs.slice(indexOfFirstDogs, indexOfLastDogs);
  
  const pagination = (pageNumber)=>{
    setCurrentPage(pageNumber);
  };

  //----------------------FILTRADO
  const [filter, setFilter] = useState("");

  const filterCreation = (e) =>{
    e.preventDefault();
    dispatch(filterDogsByCreatedMode(e.target.value));
    setCurrentPage(1);
  };
  
  const filterWeight = (e)=>{
    e.preventDefault();
    console.log(e.target.value)
    dispatch(filterDogsByWeight(e.target.value));
    setCurrentPage(1);
    setFilter(`FILTER_BY_WEIGHT ${e.target.value}`);
  }

  const filterTemperament = (e)=>{
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }
  
  const filterAlphabet  =(e)=>{
    e.preventDefault();
    console.log(e.target.value);
    dispatch(filterDogsByAlphabet(e.target.value));
    setCurrentPage(1);
    setFilter(`FILTER_BY_ALPHABET ${e.target.value}`);

  }
//--------------------------------------------
  const updateCurrentPage = () =>{
    setCurrentPage(1);
  }

  useEffect(()=>{//componentDidMount
       dispatch(getDogs())     
       dispatch(getTemperaments())     
    },[])

    const handleClick = (e) => {
       e.preventDefault();
       dispatch(getDogs());
    }
     let arr = []
    
     console.log(dogs)


    return(
        <div>
            {
              currentDogs.length === 0 ? <Loading/> :
              <div className="container-home">
               <NavBar/>
               <div className="container-btnCreate">
                <div className="create-info">
                    <h1>Create</h1>
                    <h1>your</h1>
                    <h1><b className="create-h1-dog">dog</b></h1>
                </div>
                <div className="btnCreate">
               <Link to="/create">
                  <button>Lets go</button>
               </Link>
               </div>
               </div>
             <div className="container-info">
                <div className="filtros">
               <SearchBar updateCurrentPage={updateCurrentPage}/>

                <select defaultValue="title" onChange={(e) => filterTemperament(e)}>
                   <option value="title">Filter by temperament</option>
                   <option value="All">All</option>
                   {
                     temperaments && temperaments.map((el)=>{
                       return (
                         <option value={el.name}>{el.name}</option>
                         )
                        })
                      }
                </select>


                <select defaultValue="title" onChange={e => filterAlphabet(e)}>
                    <option value="title">Order by Alphabet</option>
                    <option value="asce">A to Z</option>
                    <option value="desc">Z to A</option>
                </select>
                <select onChange={e => filterWeight(e)}>
                    <option value="title">Order by weigth</option>
                    <option value="Heavy">Heavy</option>
                    <option value="Lightweight">Lightweight</option>
                </select>
                <select onChange={e => filterCreation(e)}>
                    <option value="All">All</option>
                    <option value="Created">Created</option>
                    <option value="Existing">Existing</option>
                </select>
                
                </div>
                <div className="container-card">
                {
                  error ? <Error msg={error.error} /> :  currentDogs && currentDogs.map((el)=><Link to={`/home/${el.id}`}><DogCard key={el.id.toString()} name={el.name} image={el.image} weight={el.weight} temperament={Array.isArray(el.temperament) ? el.temperament.join(", ") : "" }/></Link>)
                }
               </div>
                <Pagination dogsPage={dogsPage} allDogs={dogs.length} pagination={pagination}/>
             </div> 
             </div>
            }

        </div>
    )
}

export default Home;