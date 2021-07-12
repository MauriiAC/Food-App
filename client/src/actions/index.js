import axios from 'axios';

// Quizás hace falta esta variable para hacer la paginación
// let page = 1


export const searchRecipe = function(payload)
{
    if(payload === "reset12345")
    {
        return(
        {
            type: "searchRecipe",
            payload: []
        });
    }

    return function(dispatch)
    {
        axios.get(`http://127.0.0.1:3001/recipes?name=${payload}`)
        .then((res, err) => {
            dispatch({
                type: "searchRecipe",
                payload: res.data
            })
        })
    }
}

export const filterRecipe = function(payload)
{
    return(
    {
        type: "filterRecipe",
        payload
    });
}

export const orderRecipe = function(payload)
{
    return(
    {
        type: "orderRecipe",
        payload
     
    });
}

export const changeStep = function(payload)
{
    return(
    {
        type: "changeStep",
        payload
     
    });
}

export const showRecipeDetail = function(payload){

    return function(dispatch)
    {
        axios.get(`http://127.0.0.1:3001/recipes/${payload.id}/information?localStorage=${payload.localStorage}`)
        .then((res, err) => {
            dispatch({
                type: "showRecipeDetail",
                payload: res.data
            })
        })
    }
}
