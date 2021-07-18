import { useEffect, useState } from 'react';
import { RecipeCard } from './RecipeCard';
import './SearchBar.css';
import { useDispatch, useSelector } from 'react-redux';
import {searchRecipe, filterRecipe, orderRecipe} from './../actions'
import noImage from './../images/__no_image.jpg';


let noResult = "La búsqueda actual no arroja resultados, oprima buscar sin nada escrito para traer todas las recetas"

export function SearchBar() {

  
  let initial = "";
  let initialPage = 1;
  let maxPage;
  let showedRecipes=[];

  useEffect(() => (
    dispatch(searchRecipe(""))
  ), [])

  
  const [title, setTitle] = useState(initial);
  const [page, setPage] = useState(initialPage);
  
  const dispatch = useDispatch();
  
  const {foundRecipes, filteredRecipes} = useSelector(state => 
    {
      return {
        foundRecipes: state.foundRecipes,
        filteredRecipes: state.filteredRecipes
      };
    });
    
  
  maxPage = Math.ceil(filteredRecipes.length/9);

  

  function handleChange(e)
  {
    setTitle(e.target.value);
  }
  
  
  function handleNext(e)
  {
    if(page<maxPage){
      setPage(page + 1);
    }
  }
  
  function handlePrevious(e)
  {
    if(page>1){
      setPage(page - 1);
    }
  }
  
  function handleOrder(e)
  {
    dispatch(orderRecipe(e.target.value)); 

  }
  
  function handleSelect(e)
  {
    dispatch(filterRecipe(e.target.value));
    document.getElementById("order").value="-"
    setPage(1);
  }

  function handleSubmit(e)
  {
    e.preventDefault();
    dispatch(searchRecipe(title)); //Async
    document.getElementById("order").value="-"
  }
  
  //Importo todas las imagenes que tengo guardadas en la carpeta newRecipes y las guardo en un arreglo newRecipeImages
  function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const recipesImages = importAll(require.context('./../images/newRecipes', false, /\.(gif|jpe?g|svg)$/));
  
  
  
  showedRecipes = filteredRecipes.slice((page-1)*9,page*9);
  
  if(foundRecipes.length === 0) {
    noResult = "La búsqueda actual no arroja resultados, puede oprimir buscar sin nada escrito para traer todas las recetas";
  }
  else{
    noResult = "";
  }


  return (
    <>
      <h1 className="noResult">{noResult}</h1>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div className="searcher">
          <input
            type="text"
            id="title"
            autoComplete="off"
            value={title.title}
            onChange={(e) => handleChange(e)}
            />
          <button type="submit">BUSCAR</button>
        </div>
        <div className="filters">
          <div className="next-previous">
            <button type="button" onClick={(e) => handlePrevious(e)}> Anterior </button>
            <button type="button" onClick={(e) => handleNext(e)}> Siguiente </button>
            <p>{page} de {maxPage}</p>
          </div>
          <div className="orderBy">
            <label htmlFor="order">Orden </label>
            <select id="order" name="order" onChange={(e) => handleOrder(e)}>
              <option value="-">-</option> 
              <option value="asc">Ascendente</option> 
              <option value="des">Descendente</option> 
            </select>
          </div>
          <div className="filter-diet">
            <label htmlFor="diet-filter">Tipos de dieta</label>
            <select name="diet-filter" onChange={(e) => handleSelect(e)}>
              <option value="all diets">Todas</option> 
              <option value="dairy free">Dairy Free</option>
              <option value="fodmap friendly">Fodmap Friendly</option>  
              <option value="gluten free">Gluten Free</option> 
              {/* <option value="ketogenic">Ketogenic</option>  */}
              <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option> 
              {/* <option value="ovo-vegetarian">Ovo-Vegetarian</option>  */}
              <option value="vegan">Vegan</option> 
              <option value="pescatarian">Pescetarian</option> 
              <option value="paleolithic">Paleo</option> 
              <option value="primal">Primal</option> 
              <option value="whole 30">Whole 30</option> 
            </select>
          </div>
        </div>
      </form>
      <ul className="recipeList">
        {console.log(showedRecipes)}
        {
          showedRecipes.map((recipe, index) => 
            <li key = {index}>
              <RecipeCard 
                title={recipe.title}
                image={recipe.image || (recipesImages[recipe.urlImage] && recipesImages[recipe.urlImage].default)|| noImage} 
                id={recipe.id}
                diets={recipe.diets}
                localStorage={recipe.localStorage}
              />
            </li> 
          )
        }
      </ul>
    </>
  );
};