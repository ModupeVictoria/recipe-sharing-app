import React, { useState, useEffect } from 'react';
import { Heart, Clock, Users, Plus, Search, Star, ChefHat } from 'lucide-react';

const RecipeSharingApp = () => {
    const [recipes, setRecipes] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        cookTime: '',
        servings: '',
        category: 'main-dish',
        difficulty: 'easy'
    });

    // Sample recipes
    useEffect(() => {
        setRecipes([
            {
                id: 1,
                title: "Classic Spaghetti Carbonara",
                description: "Creamy Italian pasta dish with eggs, cheese, and pancetta",
                ingredients: ["400g spaghetti", "200g pancetta", "4 eggs", "100g Parmesan", "Black pepper", "Salt"],
                instructions: "Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all ingredients.",
                cookTime: "20 min",
                servings: "4",
                category: "main-dish",
                difficulty: "medium",
                rating: 4.8,
                likes: 127,
                author: "Mario_Chef",
                createdAt: "2 days ago"
            },
            {
                id: 2,
                title: "Chocolate Chip Cookies",
                description: "Soft and chewy homemade cookies perfect for any occasion",
                ingredients: ["2 cups flour", "1 cup butter", "3/4 cup brown sugar", "1/2 cup sugar", "2 eggs", "2 cups chocolate chips"],
                instructions: "Mix dry ingredients. Cream butter and sugars. Add eggs. Combine and bake at 375°F for 10 minutes.",
                cookTime: "25 min",
                servings: "24 cookies",
                category: "dessert",
                difficulty: "easy",
                rating: 4.9,
                likes: 89,
                author: "BakeQueen",
                createdAt: "1 week ago"
            },
            {
                id: 3,
                title: "Mediterranean Quinoa Salad",
                description: "Fresh and healthy salad with quinoa, vegetables, and feta cheese",
                ingredients: ["1 cup quinoa", "2 tomatoes", "1 cucumber", "1/2 red onion", "100g feta", "Olive oil", "Lemon juice"],
                instructions: "Cook quinoa. Chop vegetables. Mix everything with dressing. Chill before serving.",
                cookTime: "15 min",
                servings: "6",
                category: "salad",
                difficulty: "easy",
                rating: 4.6,
                likes: 56,
                author: "HealthyEats",
                createdAt: "3 days ago"
            }
        ]);
    }, []);

    const categories = [
        { id: 'all', name: 'All Recipes' },
        { id: 'main-dish', name: 'Main Dishes' },
        { id: 'dessert', name: 'Desserts' },
        { id: 'appetizer', name: 'Appetizers' },
        { id: 'salad', name: 'Salads' },
        { id: 'soup', name: 'Soups' }
    ];

    const filteredRecipes = recipes.filter((recipe:any) => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddRecipe = () => {
        if (!newRecipe.title || !newRecipe.description || !newRecipe.ingredients || !newRecipe.instructions || !newRecipe.cookTime || !newRecipe.servings) {
            return;
        }
        const recipe = {
            ...newRecipe,
            id: Date.now(),
            ingredients: newRecipe.ingredients.split('\n').filter(i => i.trim()),
            rating: 0,
            likes: 0,
            author: "You",
            createdAt: "Just now"
        };
        setRecipes([recipe, ...recipes]);
        setNewRecipe({
            title: '',
            description: '',
            ingredients: '',
            instructions: '',
            cookTime: '',
            servings: '',
            category: 'main-dish',
            difficulty: 'easy'
        });
        setShowAddForm(false);
    };

    const toggleLike = (id:any) => {
        setRecipes(recipes.map((recipe:any) =>
            recipe.id === id
                ? { ...recipe, likes: recipe.likes + 1 }
                : recipe
        ));
    };

    const getDifficultyColor = (difficulty:any) => {
        switch (difficulty) {
            case 'easy': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'hard': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <ChefHat className="h-8 w-8 text-orange-500" />
                            <h1 className="text-2xl font-bold text-gray-900">RecipeShare</h1>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Open Source</span>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add Recipe</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter */}
                <div className="mb-8 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recipe Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe:any) => (
                        <div key={recipe.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{recipe.title}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                                        {recipe.difficulty}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{recipe.description}</p>

                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{recipe.cookTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Users className="h-4 w-4" />
                                        <span>{recipe.servings}</span>
                                    </div>
                                    {recipe.rating > 0 && (
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                            <span>{recipe.rating}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            by <span className="font-medium text-gray-700">{recipe.author}</span> • {recipe.createdAt}
                                        </div>
                                        <button
                                            onClick={() => toggleLike(recipe.id)}
                                            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <Heart className="h-4 w-4" />
                                            <span className="text-sm">{recipe.likes}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredRecipes.length === 0 && (
                    <div className="text-center py-12">
                        <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
                        <p className="text-gray-500">Try adjusting your search or add a new recipe!</p>
                    </div>
                )}
            </div>

            {/* Add Recipe Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Add New Recipe</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={newRecipe.title}
                                        onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Enter recipe title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        required
                                        value={newRecipe.description}
                                        onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        rows={2}
                                        placeholder="Brief description of your recipe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (one per line)</label>
                                    <textarea
                                        required
                                        value={newRecipe.ingredients}
                                        onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        rows={4}
                                        placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                                    <textarea
                                        required
                                        value={newRecipe.instructions}
                                        onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        rows={3}
                                        placeholder="Step-by-step cooking instructions"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time</label>
                                        <input
                                            type="text"
                                            required
                                            value={newRecipe.cookTime}
                                            onChange={(e) => setNewRecipe({ ...newRecipe, cookTime: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="30 min"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                                        <input
                                            type="text"
                                            required
                                            value={newRecipe.servings}
                                            onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="4"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select
                                            value={newRecipe.category}
                                            onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        >
                                            <option value="main-dish">Main Dish</option>
                                            <option value="dessert">Dessert</option>
                                            <option value="appetizer">Appetizer</option>
                                            <option value="salad">Salad</option>
                                            <option value="soup">Soup</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                                        <select
                                            value={newRecipe.difficulty}
                                            onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleAddRecipe}
                                        className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        Add Recipe
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeSharingApp;