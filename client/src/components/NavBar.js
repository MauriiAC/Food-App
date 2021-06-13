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
            <button className='appTitle'><Link to='/'>Henry Food</Link></button>
            <nav className='navBar'>
                <button onClick={(e) => handleClick(e)}><Link to='/search'>Search Recipe</Link></button>
                <button><Link to='/newrecipe'>Create Recipe</Link></button>
            </nav>
        </header>
    )
};
