// import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeStep } from './../actions'
// import { IngredientStep } from './IngredientStep';
// import { EquipmentStep } from './EquipmentStep';

export function ProcedureStep(props) {
  
    // const initial = {
    //     description: '',
    //     numIngredients: [],
    //     numEquipments: [],
    // }
  
    // const [state, setState] = useState(initial)

    const dispatch = useDispatch();

    // function addIngredient(){
    //     setState({...state, numIngredients: state.numIngredients.concat([(state.numIngredients.length)+1])})
    // }

    // function addEquipment(){
    //     setState({...state, numEquipments: state.numEquipments.concat([(state.numEquipments.length)+1])})
    // }


    function handleChangeStep(e)
    {
        dispatch(changeStep({step: props.step-1, description: e.target.value}))
    }


    return (
        <div className="stepDescription">
            <label htmlFor="description">Step {props.step}</label>
            <textarea name="description" id="description" onChange = {(e) => handleChangeStep(e)}/>
            {/* <button type="button" onClick={() => addIngredient()}>+ Ingredient</button>
            {
                state.numIngredients.map((num, index) => {
                    return <IngredientStep key={index} num={num}/>
                })
            }
            <button type="button" onClick={() => addEquipment()}>+ Equipment</button>
            {
                state.numEquipments.map((num, index) => {
                    return <EquipmentStep key={index} num={num}/>
                })
            } */}

        </div>
    )
  };