export const categorizeIngredients = (ingredients) => {
    if (!Array.isArray(ingredients)) {
        return {};
    }
    return ingredients.reduce((acc, ingredient) => {
        const {category} = ingredient;
        if (!acc[category.name]) {
            acc[category] = [];
        }
        acc[category].push(ingredient);
        return acc;
    }, {});
}