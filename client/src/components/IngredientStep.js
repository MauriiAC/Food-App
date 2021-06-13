
export function IngredientStep(props) {
  
    return (
        <div className="nameIngredient">
            <label htmlFor="name">Ingredient {props.num}</label>
            <input name="name" id="name"/>
        </div>
    )
  };