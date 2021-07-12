import { useState } from 'react';
import { ProcedureStep } from './ProcedureStep'
import axios from 'axios';
import './FormNewRecipe.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep } from './../actions'


export function FormNewRecipe(props) {

    const initial = {
        name: '',
        summary: '',
        score: 50,
        healthScore: 50,
        selectedFile: null,
        image: null,
        steps: [],                  //indice de los steps
    }
  
    const dispatch = useDispatch();

    const [state, setState] = useState(initial)


    const {steps} = useSelector(state => 
        {
            return {
              steps: state.steps,
            };
        });

    function addStep(){
        setState({...state, steps: state.steps.concat([(state.steps.length)+1])})
    }

    function handleChange(e){
        setState({...state, [e.target.name]: e.target.value});
    }

    function handleChargeImage(e){
        console.log(e.target.files[0]);
        setState({...state, image: e.target.files[0]});
    }


    function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', state.image);
        formData.append('body', JSON.stringify({
            title: state.name,
            summary: state.summary,
            score: state.score,
            healthScore: state.healthScore,
            procedure: state.procedure,
            // image: state.image,
            steps: steps
        }));
 
        axios.post('http://127.0.0.1:3001/recipe/add', formData)

        .then( response => {
            console.log(response)

            dispatch(changeStep({step: -1}))
            // alert('Carga')
        })
        .catch( err => {
            console.log(err)
            console.log("Se produjo un error")
        })

        setState(initial);
    }

    return (

        <div className="global">
        <div></div>
        <form className="form-new-recipe" encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <h1>+</h1>
                <h1>Nueva Receta</h1>
            </div>
            <div className="nameRecipe">
                <label htmlFor="name">Nombre</label>
                <input autoComplete="off" type="text" name="name" id="name" value={state.name} onChange = {(e) => handleChange(e)}/>
            </div>
            <div className="summaryRecipe">
                <label htmlFor="summary">Summary</label>
                <textarea name="summary" id="summary" value={state.summary} onChange = {(e) => handleChange(e)}/>
            </div>
            <div className="scoreRecipe">
                <label htmlFor="score">Score</label>
                <input 
                    name="score" 
                    id="score" 
                    type="number"
                    min="0" 
                    max="100" 
                    step="1" 
                    size="6"
                    value={state.score} onChange = {(e) => handleChange(e)}
                />
            </div>
            <div className="healthScoreRecipe">
                <label htmlFor="healthScore">Health Score</label>
                <input 
                    name="healthScore" 
                    id="healthScore" 
                    type="number" 
                    min="0" 
                    max="100" 
                    step="1" 
                    size="6"
                    value={state.healthScore} 
                    onChange = {(e) => handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="image">Image </label>
                <input 
                    name="image" 
                    id="image" 
                    type="file" 
                    className='form-control'
                    onChange = {(e) => handleChargeImage(e)}
                />
            </div>
            <div className="procedureRecipe">
                <p>Procedure</p>
                <button type="button" onClick={() => addStep()}>Add Step</button>

                {/* {
                    state.steps.map((step, index) => {
                        return (
                            <Fragment id="steps" key={index}>
                                <span>Step {index + 1}</span>
                                <textarea id={"step" + index}></textarea>
                            </Fragment>
                        )
                    })
                } */}

                {
                    state.steps.map((step, index) => {
                        return <ProcedureStep key={index} step={step}/>
                    })
                }


            </div>
            <div>
                <span></span>
                <button className="button-submit" type="submit">Submit Recipe</button>
            </div>
        </form>
        <div></div>
        </div>
    )
  };