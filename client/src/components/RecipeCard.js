import { useDispatch } from 'react-redux';
import {showRecipeDetail} from '../actions/index';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export function RecipeCard(props) {

  
    const dispatch = useDispatch();

    function handleClick(e){
        dispatch(showRecipeDetail({id: props.id, localStorage: props.localStorage}))
    }

    let diets = [];
    if(props.diets) {
        diets = props.diets;
    }

    return (
        <div className="recipe-card">
            <h3 className="title">{props.title}</h3>
            <div className="ver-detalle">
                <Link to ={`/detail/${props.id}`}>
                    <button onClick={() => handleClick()}>Ver detalle</button>
                </Link>
            </div>
            <img src={props.image} alt="img"/>
            <ul className="recipe-diets">
            {
                diets.map((diet, index) => {
                    return(
                        <li className="recipe-diet" key={index}>
                            {diet}
                        </li>
                    )
                })
            }
            </ul>
        </div> 
    )
  };