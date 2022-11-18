import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../redux/actions/index.js";
import "./CreateDog.css";
import img from "../../assest/dog.png"


export const validate = (input) => {
    let error = {};

    if(!input.name) error.name = "Name is required.";

    if(input.heightMin <= 0) error.height = "Height min is required."

    if(input.weightMin <= 0) error.weight = "Weight min is required."

    if(!input.image) error.image = "Image is required.";

    return error;
}


const CreateDog = ()=>{
    const dispatch = useDispatch();
    const temperamentsDogs = useSelector((state)=>state.allTemperaments);

    const [input, setInput] = useState({
        name: "",
        heightMin: 0,
        heightMax: 0,
        weightMin: 0,
        weightMax: 0,
        life_spanMin: 0,
        life_spanMax: 0,
        image:"",
        temperament: []
    });
    const [error, setError] = useState({});

    useEffect(()=>{
       dispatch(getTemperaments());
       setError(validate(input));
    },[dispatch])



    const handleSubmit = (e) =>{
        e.preventDefault(e);
        const dogCreated = {
            name: input.name,
            height: input.heightMax === 0 ? `${input.heightMin}`:`${input.heightMin} - ${input.heightMax}`,
            weight: input.weightMax === 0 ? `${input.weightMin}` : `${input.weightMin} - ${input.weightMax}`,
            life_span: input.life_spanMin === 0 ? "Undefined" : input.life_spanMax === 0 ? `${input.life_spanMin}`: `${input.life_spanMin} - ${input.life_spanMax} years`,
            image: input.image,
            temperament: [...input.temperament]
        } 
        dispatch(postDog(dogCreated));
        alert("It was created successfully!")
        setInput({
            name: "",
            heightMin: 0,
            heightMax: 0,
            weightMin: 0,
            weightMax: 0,
            life_spanMin: 0,
            life_spanMax: 0,
            image:"",
            temperament: []
        });
    };

    const handleChange = (e) =>{
         setInput({
            ...input,
            [e.target.name] : e.target.value
         });
  
    };

    const handleSelect = (e) =>{
       setInput({
        ...input,
        temperament:[...input.temperament, e.target.value]
       });
    };

    const handleDelete = (tem) =>{
        setInput({
            ...input,
            temperament: input.temperament.filter((el)=> el !== tem)
        });
    };

   const handleBlur = (e) =>{
     setError(validate({
        ...input,
        [e.target.value] : e.target.value
     }));
   }

    return(
        <div className="container-create">
            <div className="create-img">
                <img src={img}/>
            </div>
            <div className="create-form">
                <h1>Create your dog</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Name:</label><input name="name" type="text" value={input.name} placeholder="..." onChange={e => handleChange(e)} onBlur={e => handleBlur(e)}/>
                {error.name && (<p className="danger">{error.name}</p>)}
                <br/>
                <label>Height min:</label><input type="number" name="heightMin" value={input.heightMin} placeholder="..." onChange={e => handleChange(e)} onBlur={e => handleBlur(e)}/>
                <label>Height max:</label><input type="number" name="heightMax" value={input.heightMax} placeholder="..."
                onChange={e => handleChange(e)}/>
                {error.height && (<p className="danger">{error.height}</p>)}
                <br/>
                <label>Weight min:</label><input type="number" name="weightMin" value={input.weightMin} placeholder="..." onChange={e => handleChange(e)} onBlur={e => handleBlur(e)}/>
                <label>Weight max:</label><input type="number" name="weightMax" value={input.weightMax} placeholder="..." onChange={e => handleChange(e)}/>
                {error.weight && (<p className="danger">{error.weight}</p>)}
                <br/>
                <label>Life span min:</label><input type="number" name="life_spanMin" value={input.life_spanMin} placeholder="..." onChange={e => handleChange(e)}/>
                <label>Life span max:</label><input type="number" name="life_spanMax" value={input.life_spanMax} placeholder="..." onChange={e => handleChange(e)}/>
                <br/>
                <label>Image:</label><input type="text" name="image" placeholder="..." onChange={e => handleChange(e)} onBlur={e => handleBlur(e)}/>
                {error.image && (<p className="danger">{error.image}</p>)}
                <br/>
                <label>Temperaments</label>
                <select disabled={input.temperament.length > 2} onChange={e => handleSelect(e)} defaultValue="title">
                    <option value="title" disabled>Select your temperament</option>
                    {
                        temperamentsDogs && temperamentsDogs.map((el)=>{
                            return <option value={el.name} key={el.id}>{el.name}</option>
                        })
                    }
                </select>
                {
                    input.temperament && input.temperament.map((el, i)=>{
                      return  (<div>
                                <span>{el}</span>
                                <button onClick={()=> handleDelete(el)}>X</button>
                              </div>)
                    })
                }
              <button  disabled={Object.keys(error).length === 0 ? false : true}>Create Dog</button>  
            </form>
            </div>
        </div>
    )
}

export default CreateDog;