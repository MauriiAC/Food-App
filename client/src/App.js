import './App.css';
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import {SearchBar} from './components/SearchBar'
import { RecipeDetail } from './components/RecipeDetail';
import { FormNewRecipe } from './components/FormNewRecipe';
import { NavBar } from './components/NavBar';
import { Welcome } from './components/Welcome';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component = {NavBar}/>
        <Route exact path="/" component = {Welcome}/>
        <Route path="/search" component = {SearchBar}/>
        <Route path="/detail/:id" render = {({match}) => <RecipeDetail match={match}/>}/>
        <Route path="/newrecipe" component = {FormNewRecipe}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
