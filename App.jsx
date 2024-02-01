import React, { useEffect, useState } from 'react';
import './App.css';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';


const App = () => {
  // State for the recipe form inputs
  const [recipeForm, setRecipeForm] = useState({
    title: "",
    ingredients: "",
    instructions: ""
  });

  const [searchQuery, setSearchQuery] = useState("");
  // State for the list of recipes
  const [recipeList, setRecipeList] = useState([]);

  // State to track which component to render ('recipeForm' or 'recipeList')
  const [activeComponent, setActiveComponent] = useState('recipeList');

  // useEffect to load stored recipes from local storage when the component mounts
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"));
    if (storedRecipes) {
      setRecipeList(storedRecipes);
    }
  }, []);

  // Function to add a new recipe to the list and update local storage
  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipeList, { ...newRecipe, isStarred: false }];
    setRecipeList(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const filteredRecipes = recipeList.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to clear all recipes from local storage and reset the recipe list
  const clearAll = () => {
    let confirm = window.confirm("Do you want to Delete all of the recipes?")
    if (confirm) {
      localStorage.clear("recipes");
      setRecipeList([]);
    }
  }

  // Function to dynamically render the active component based on state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'recipeForm':
        return (
          <RecipeForm
            addRecipe={addRecipe}
            setRecipeForm={setRecipeForm}
            title={recipeForm.title}
            ingredients={recipeForm.ingredients}
            instructions={recipeForm.instructions}
          />
        );
      case 'recipeList':
        // default:
        return (
          <RecipeList
            recipeList={filteredRecipes}
            setRecipeList={setRecipeList}
            addRecipe={addRecipe}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      default:
        console.error(`Unexpected activeComponent value: ${activeComponent}`);
    }
  };

  return (
    <div className='main-div'>
      {/* Navigation menu */}
      <ul className='main-ul'>
        <li>
          <a href="#" onClick={() => setActiveComponent('recipeForm')}>
            Add Recipe
          </a>
        </li>
        <li>
          <a href="#" onClick={() => setActiveComponent('recipeList')}>
            Recipes
          </a>
        </li>
        {/* Button to clear all recipes */}
        <button onClick={clearAll} className='clearall'>
          <span className="material-symbols-outlined">
            clear_all
          </span>
        </button>
      </ul>
      {/* Render the active component */}
      {renderComponent()}
    </div>
  );
};

export default App;