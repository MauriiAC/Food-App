import { useDispatch } from 'react-redux';
import { searchRecipe } from './../actions'
import { Link } from 'react-router-dom';
import './NavBar.css';

export function NavBar(props) {

    const dispatch = useDispatch();

    function handleClick(e)
    {
        dispatch(searchRecipe("reset12345")) //código para avisarle al reducer que tiene que resetear el state.foundRecipe
    }    
    
    return (
        <header className="head">
            <button className='appTitle'><Link to='/'>App Food</Link></button>
            <nav className='navBar'>
                <button onClick={(e) => handleClick(e)}><Link to='/search'>Buscar Receta</Link></button>
                <button><Link to='/newrecipe'>Crear Receta</Link></button>
            </nav>
        </header>
    )
};
