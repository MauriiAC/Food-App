import { useSelector } from 'react-redux';
import noImage from './../images/__no_image.jpg';
import './RecipeDetail.css';

export function RecipeDetail({match}) {
  
    const {recipeDetail} = useSelector(state => 
        {
            return {
                recipeDetail: state.recipeDetail
            };
        });  
  
    let diets = [];
    let steps = [];
    let ingredients = [];

    if(recipeDetail.diets) {
        diets = recipeDetail.diets;
    }

    if(recipeDetail.localStorage){
        steps = recipeDetail.steps;
    }else{
        if(recipeDetail.analyzedInstructions && recipeDetail.analyzedInstructions[0]) {
            steps = recipeDetail.analyzedInstructions[0].steps;
        }
        if(recipeDetail.extendedIngredients){
            ingredients = recipeDetail.extendedIngredients;
        }
    }

    //Importo todas las imagenes que tengo guardadas en la carpeta newRecipes y las guardo en un arreglo newRecipeImages
    function importAll(r) {
        let images = {};
        r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const recipesImages = importAll(require.context('./../images/newRecipes', false, /\.(gif|jpe?g|svg)$/));


    return (
        <div className="card-detail">
            <div className="div-title">
                <h3 className="titleDetail">{recipeDetail.title}</h3>
            </div>
            <div className="div-image">
                {console.log(recipeDetail)}
                <img className="imageDetail" src={recipeDetail.image || (recipesImages[recipeDetail.urlImage] && recipesImages[recipeDetail.urlImage].default)|| noImage} alt="img"/>
                <ul className="recipe-diets">
                {
                    diets.map((diet, index) => {
                        return(
                            <div key={index}>
                                <li>
                                    {diet}
                                </li>
                            </div>
                        )
                    })
                }
                </ul>
            </div>
            <div className="summary" dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}></div>
            <div className="scores">
                <h3>Score: {recipeDetail.spoonacularScore}</h3>
                <h3>Health Score: {recipeDetail.healthScore}</h3>
            </div>

            <div className="ingredients">
                <h3>Ingredients</h3>
            </div>
            <ol>
            {
                ingredients.map((ingredient, index) => {
                    return(
                        <div key={index}>
                            <li className="steps">
                                {ingredient.original}
                                {ingredient.name}       {/* ver como le llamé en la BBDD local */}
                            </li>
                        </div>
                    )
                })
            }
            </ol>

            <div className="procedure">
                <h3>Procedure</h3>
            </div>
            <ol>
            {
                steps.map((step, index) => {
                    return(
                        <div key={index}>
                            <li className="steps">
                                {step.step}
                                {step.description}
                            </li>
                        </div>
                    )
                })
            }
            </ol>
        </div>  
    )
  };