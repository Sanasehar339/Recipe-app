import React from 'react';

const RecipeList = (props) => {
  const { setRecipeList, recipeList, searchQuery, setSearchQuery } = props;

  // Function to copy recipe details to clipboard
  const copy = (index) => {
    let items = [`${recipeList[index].title}`, `Ingredients:\n${recipeList[index].ingredients}`, `Instructions:\n${recipeList[index].instructions}`];
    window.navigator.clipboard.writeText(items.join('\n\n'));
  }

  // Function to remove a recipe with confirmation
  const remove = (index) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this recipe?");
    if (isConfirmed) {
      setRecipeList((prevRecipes) => {
        // Create a copy of the recipes array
        const updatedRecipes = [...prevRecipes];
        // Remove the recipe at the specified index
        updatedRecipes.splice(index, 1);
        // Update localStorage after removing the recipe
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        return updatedRecipes;
      });
    }
  };

  return (
    <div className='recipe'>
      <input
        className='text'
        type="text"
        placeholder="Search recipes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {recipeList.length === 0 ? (
        <p className='grey'>No recipes found. Add a new recipe to get started!</p>
      ) : (
        recipeList.map((recipe, index) => (
          <div className='recipe-items' key={index}>
            <ul>
              <li className='color'>
                <h2>{recipe.title}</h2>
              </li>
              <li>
                <h4>Ingredients</h4>
                {recipe.ingredients}
              </li>
              <li>
                <h4>Instructions</h4>
                <p>{recipe.instructions}</p>
              </li>
            </ul>
            <div className='icons'>
              {/* Clickable icon to copy recipe details to clipboard */}
              <span onClick={() => copy(index)} className="material-symbols-outlined icon">
                copy_all
              </span>
              <span>-----</span>
              {/* Clickable icon to remove the recipe with confirmation */}
              <span onClick={() => remove(index)} className="material-symbols-outlined icon">
                delete
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
