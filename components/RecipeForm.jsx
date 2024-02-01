import React from 'react';

const RecipeForm = (props) => {

  const { addRecipe, setRecipeForm, title, ingredients, instructions } = props;

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipeForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && ingredients && instructions) {
      // Create a new recipe object
      const newRecipe = {
        title: title, ingredients: ingredients, instructions: instructions,
      };
      // Call the addRecipe function to add the new recipe
      addRecipe(newRecipe);
      // Reset the form inputs after submission
      setRecipeForm({
        title: "",
        ingredients: "",
        instructions: "",
      });
    }
  };

  return (
    <div className='recipe-form'>
      {/* Recipe form */}
      <form name='form' className='form' onSubmit={handleSubmit}>
        {/* Input for recipe title */}
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder='Recipe title'
          required
        />
        {/* Textarea for ingredients */}
        <textarea
          name="ingredients"
          onChange={handleChange}
          value={ingredients}
          placeholder='Ingredients'
          required
        ></textarea>
        {/* Textarea for instructions */}
        <textarea
          name="instructions"
          onChange={handleChange}
          value={instructions}
          placeholder='Instructions'
          required
        ></textarea>
        {/* Submit button */}
        <button>Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
