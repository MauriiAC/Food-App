
// ------- Funciones auxiliares --------
const filter = function(list, criterias)
{      
  // ------------------------------- Filtro por tipo de dieta ------------------------------
  if(criterias === "all diets")
  {
    return list
  }
  const f = list.filter( recipe => {
    return recipe.diets && recipe.diets.includes(criterias);
  })
  
  return f;
}

function order(list, criterias)
{
  let temp = JSON.parse(JSON.stringify(list))

  if(criterias === "asc")
  {
    temp.sort(function (a, b) {
      if (a.title > b.title) {
        return 1;
      }
      if (b.title> a.title) {
        return -1;
      }
      return 0;
    })
  }
  else if(criterias === "des")
  {
    temp.sort(function (a, b) {
      if (a.title > b.title) {
        return -1;
      }
      if (b.title> a.title) {
        return 1;
      }
      return 0;
    })
  }
  // else if(criterias === "ascScore")             // FALTA IMPLEMENTAR ORDENES POR OTROS CRITERIOS
  // {
  //   temp.sort(function (a, b) {
  //     if (a.healthScore > b.healthScore) {
  //         return -1;
  //       }
  //     if (b.healthScore> a.healthScore) {
  //         return 1;
  //       }
  //     return 0;
  //   })
  // }
            
  return temp;
}
          
function changeArr(arr, index, value)
{
  let temp;
  
  if(index === -1){
    return [];
  }
  else
  {
    temp = JSON.parse(JSON.stringify(arr));
    
    temp[index] = value;
    
    return temp;
  }
}
          
          
let initialState = {
    foundRecipes: [],
    filteredRecipes: [],
    recipeDetail: {},
    steps: [],
};
          

const reducer = (state = initialState, action) => {
    switch (action.type) 
    {
        case 'searchRecipe':
            return {
                ...state,
                foundRecipes: action.payload,
                filteredRecipes: action.payload
            }
        case 'filterRecipe':
            return {
                ...state,
                filteredRecipes: filter(state.foundRecipes, action.payload),
            }

        case 'orderRecipe':
            return {
                ...state,
                filteredRecipes: order(state.filteredRecipes, action.payload)
            }
        case 'changeStep':            
            return {
                ...state,
                steps: changeArr(state.steps, action.payload.step, action.payload.description)
            }
        case 'showRecipeDetail':
            return {
                ...state,
                recipeDetail: action.payload
            }

        default: return state;
    }
}

export default reducer;