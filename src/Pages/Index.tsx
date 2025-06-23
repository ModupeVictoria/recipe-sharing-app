import React, { useState, useEffect } from 'react';
import { Heart, Clock, Users, Plus, Search, Star, ChefHat, X, Filter } from 'lucide-react';

// Type definitions
interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    cookTime: string;
    servings: string;
    category: RecipeCategory;
    difficulty: RecipeDifficulty;
    rating: number;
    likes: number;
    author: string;
    createdAt: string;
    tags: string[];
}

type RecipeCategory = 'main-dish' | 'dessert' | 'appetizer' | 'salad' | 'soup';

type RecipeDifficulty = 'easy' | 'medium' | 'hard';

type SearchBy = 'all' | 'ingredients' | 'tags';

type SuggestionType = 'recipe' | 'ingredient' | 'tag';

interface SearchSuggestion {
    type: SuggestionType;
    text: string;
    icon: string;
}

interface NewRecipe {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    cookTime: string;
    servings: string;
    category: RecipeCategory;
    difficulty: RecipeDifficulty;
    tags: string;
}

interface Category {
    id: string;
    name: string;
}

interface SearchOption {
    value: SearchBy;
    label: string;
    icon: string;
}

const AdvancedRecipeSearchApp: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [searchBy, setSearchBy] = useState<SearchBy>('all');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [newRecipe, setNewRecipe] = useState<NewRecipe>({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        cookTime: '',
        servings: '',
        category: 'main-dish',
        difficulty: 'easy',
        tags: ''
    });

    // Sample recipes with enhanced data
    useEffect(() => {
        const sampleRecipes: Recipe[] = [
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
                createdAt: "2 days ago",
                tags: ["italian", "pasta", "creamy", "traditional", "comfort food"]
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
                createdAt: "1 week ago",
                tags: ["sweet", "cookies", "chocolate", "baking", "easy", "dessert"]
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
                createdAt: "3 days ago",
                tags: ["healthy", "mediterranean", "vegetarian", "fresh", "quick", "gluten-free"]
            },
            {
                id: 4,
                title: "Spicy Thai Green Curry",
                description: "Aromatic Thai curry with coconut milk, vegetables, and fragrant herbs",
                ingredients: ["400ml coconut milk", "2 tbsp green curry paste", "1 eggplant", "100g green beans", "2 kaffir lime leaves", "Thai basil"],
                instructions: "Sauté curry paste. Add coconut milk. Add vegetables and simmer. Garnish with basil.",
                cookTime: "30 min",
                servings: "4",
                category: "main-dish",
                difficulty: "medium",
                rating: 4.7,
                likes: 73,
                author: "SpiceKing",
                createdAt: "5 days ago",
                tags: ["spicy", "thai", "curry", "vegetarian", "asian", "coconut"]
            },
            {
                id: 5,
                title: "Avocado Toast Supreme",
                description: "Elevated avocado toast with poached egg and everything seasoning",
                ingredients: ["2 slices sourdough bread", "1 ripe avocado", "2 eggs", "Everything bagel seasoning", "Lime juice", "Cherry tomatoes"],
                instructions: "Toast bread. Mash avocado with lime. Poach eggs. Assemble and season.",
                cookTime: "10 min",
                servings: "2",
                category: "appetizer",
                difficulty: "easy",
                rating: 4.4,
                likes: 92,
                author: "BrunchLover",
                createdAt: "1 day ago",
                tags: ["healthy", "quick", "brunch", "avocado", "eggs", "fresh"]
            }
        ];
        setRecipes(sampleRecipes);
    }, []);

    // Categories
    const categories: Category[] = [
        { id: 'all', name: 'All Recipes' },
        { id: 'main-dish', name: 'Main Dishes' },
        { id: 'dessert', name: 'Desserts' },
        { id: 'appetizer', name: 'Appetizers' },
        { id: 'salad', name: 'Salads' },
        { id: 'soup', name: 'Soups' }
    ];

    // All available tags for suggestions
    const availableTags: string[] = [
        'italian', 'pasta', 'creamy', 'traditional', 'sweet', 'cookies', 'chocolate',
        'baking', 'easy', 'healthy', 'mediterranean', 'vegetarian', 'fresh', 'quick',
        'spicy', 'comfort food', 'gluten-free', 'dairy-free', 'vegan', 'low-carb',
        'protein-rich', 'one-pot', 'grilled', 'roasted', 'asian', 'mexican', 'indian',
        'thai', 'curry', 'coconut', 'brunch', 'avocado', 'eggs', 'dessert'
    ];

    // Generate search suggestions based on current input
    const generateSuggestions = (input: string): SearchSuggestion[] => {
        if (!input || input.length < 2) return [];

        const suggestions: SearchSuggestion[] = [];
        const searchLower = input.toLowerCase();

        // Recipe title suggestions
        recipes.forEach((recipe) => {
            if (recipe.title.toLowerCase().includes(searchLower)) {
                suggestions.push({
                    type: 'recipe',
                    text: recipe.title,
                    icon: '🍽️'
                });
            }
        });

        // Ingredient suggestions
        const uniqueIngredients = new Set<string>();
        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (ingredient.toLowerCase().includes(searchLower) &&
                    !uniqueIngredients.has(ingredient.toLowerCase())) {
                    uniqueIngredients.add(ingredient.toLowerCase());
                    suggestions.push({
                        type: 'ingredient',
                        text: ingredient,
                        icon: '🥕'
                    });
                }
            });
        });

        // Tag suggestions
        availableTags.forEach(tag => {
            if (tag.toLowerCase().includes(searchLower)) {
                suggestions.push({
                    type: 'tag',
                    text: tag,
                    icon: '🏷️'
                });
            }
        });

        return suggestions.slice(0, 8); // Limit to 8 suggestions
    };

    // Handle search input changes
    const handleSearchChange = (value: string): void => {
        setSearchTerm(value);
        const suggestions = generateSuggestions(value);
        setSearchSuggestions(suggestions);
        setShowSuggestions(value.length > 0 && suggestions.length > 0);
    };

    // Handle suggestion selection
    const handleSuggestionSelect = (suggestion: SearchSuggestion): void => {
        setSearchTerm(suggestion.text);
        setShowSuggestions(false);

        if (suggestion.type === 'ingredient') {
            setSearchBy('ingredients');
        } else if (suggestion.type === 'tag') {
            setSearchBy('tags');
            if (!selectedTags.includes(suggestion.text)) {
                setSelectedTags([...selectedTags, suggestion.text]);
            }
        }
    };

    // Add tag to selected tags
    const addTag = (tag: string): void => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    // Remove tag from selected tags
    const removeTag = (tagToRemove: string): void => {
        setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    };

    // Clear all filters
    const clearAllFilters = (): void => {
        setSearchTerm('');
        setSelectedTags([]);
        setSelectedCategory('all');
        setSearchBy('all');
        setShowSuggestions(false);
    };

    // Highlight search terms in text
    const highlightText = (text: string, searchTerm: string): React.ReactNode => {
        if (!searchTerm) return text;

        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="bg-yellow-200 font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    // Filter recipes based on search criteria
    const filteredRecipes = recipes.filter(recipe => {
        // Search functionality
        let matchesSearch = true;

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();

            switch (searchBy) {
                case 'ingredients':
                    matchesSearch = recipe.ingredients.some(ingredient =>
                        ingredient.toLowerCase().includes(searchLower)
                    );
                    break;
                case 'tags':
                    matchesSearch = recipe.tags?.some(tag =>
                        tag.toLowerCase().includes(searchLower)
                    ) || false;
                    break;
                default:
                    matchesSearch =
                        recipe.title.toLowerCase().includes(searchLower) ||
                        recipe.description.toLowerCase().includes(searchLower) ||
                        recipe.ingredients.some(ingredient =>
                            ingredient.toLowerCase().includes(searchLower)
                        ) ||
                        (recipe.tags?.some(tag =>
                            tag.toLowerCase().includes(searchLower)
                        ) || false);
            }
        }

        // Tag filtering
        let matchesTags = true;
        if (selectedTags.length > 0) {
            matchesTags = selectedTags.every(selectedTag =>
                recipe.tags?.some(recipeTag =>
                    recipeTag.toLowerCase() === selectedTag.toLowerCase()
                ) || false
            );
        }

        // Category filtering
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;

        return matchesSearch && matchesTags && matchesCategory;
    });

    // Handle add recipe
    const handleAddRecipe = (): void => {
        if (!newRecipe.title || !newRecipe.description || !newRecipe.ingredients ||
            !newRecipe.instructions || !newRecipe.cookTime || !newRecipe.servings) {
            return;
        }

        const recipe: Recipe = {
            ...newRecipe,
            id: Date.now(),
            ingredients: newRecipe.ingredients.split('\n').filter(i => i.trim()),
            tags: newRecipe.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
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
            difficulty: 'easy',
            tags: ''
        });
        setShowAddForm(false);
    };

    // Toggle like
    const toggleLike = (id: number): void => {
        setRecipes(recipes.map(recipe =>
            recipe.id === id
                ? { ...recipe, likes: recipe.likes + 1 }
                : recipe
        ));
    };

    // Get difficulty color
    const getDifficultyColor = (difficulty: RecipeDifficulty): string => {
        switch (difficulty) {
            case 'easy': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'hard': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    // Popular tags for quick access
    const popularTags: string[] = ['healthy', 'quick', 'easy', 'vegetarian', 'italian', 'spicy', 'dessert', 'gluten-free'];

    // Search options
    const searchOptions: SearchOption[] = [
        { value: 'all', label: 'Everything', icon: '🔍' },
        { value: 'ingredients', label: 'Ingredients', icon: '🥕' },
        { value: 'tags', label: 'Tags', icon: '🏷️' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <ChefHat className="h-8 w-8 text-orange-500" />
                            <h1 className="text-2xl font-bold text-gray-900">RecipeSearch Pro</h1>
                            <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded">Advanced Search</span>
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
                {/* Advanced Search Interface */}
                <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border">
                    <div className="flex items-center space-x-2 mb-4">
                        <Search className="h-5 w-5 text-orange-500" />
                        <h2 className="text-lg font-semibold text-gray-900">Advanced Recipe Search</h2>
                    </div>

                    {/* Main Search Input with Suggestions */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search recipes, ingredients, or tags..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                        />

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                                {searchSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionSelect(suggestion)}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b last:border-b-0 transition-colors"
                                    >
                                        <span className="text-xl">{suggestion.icon}</span>
                                        <div className="flex-1">
                                            <span className="text-sm text-gray-500 capitalize block">{suggestion.type}</span>
                                            <span className="text-gray-900">{suggestion.text}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Type Selector */}
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-sm font-medium text-gray-700">Search in:</span>
                        <div className="flex space-x-2">
                            {searchOptions.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setSearchBy(option.value)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${searchBy === option.value
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <span>{option.icon}</span>
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Selected Tags Display */}
                    {selectedTags.length > 0 && (
                        <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                                <button
                                    onClick={() => setSelectedTags([])}
                                    className="text-sm text-orange-600 hover:text-orange-800"
                                >
                                    Clear tags
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedTags.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800 border border-orange-200"
                                    >
                                        #{tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="ml-2 text-orange-600 hover:text-orange-800"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Tag Suggestions */}
                    <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-gray-700">Popular tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {popularTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => addTag(tag)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors border ${selectedTags.includes(tag)
                                            ? 'bg-orange-100 text-orange-800 border-orange-200'
                                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-4">
                        <span className="text-sm font-medium text-gray-700 block mb-2">Categories:</span>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg transition-colors border ${selectedCategory === category.id
                                            ? 'bg-orange-500 text-white border-orange-500'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Results Summary */}
                    {(searchTerm || selectedTags.length > 0 || selectedCategory !== 'all') && (
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Filter className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-900">
                                        {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
                                        {searchTerm && (
                                            <span> for "<strong>{searchTerm}</strong>"</span>
                                        )}
                                    </span>
                                </div>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recipe Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map(recipe => (
                        <div key={recipe.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                                        {highlightText(recipe.title, searchTerm)}
                                    </h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                                        {recipe.difficulty}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                                    {highlightText(recipe.description, searchTerm)}
                                </p>

                                {/* Tags */}
                                {recipe.tags && recipe.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {recipe.tags.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full cursor-pointer hover:bg-orange-200 transition-colors"
                                                onClick={() => {
                                                    addTag(tag);
                                                    setSearchBy('tags');
                                                }}
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                        {recipe.tags.length > 3 && (
                                            <span className="text-xs text-gray-500">
                                                +{recipe.tags.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}

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

                {/* No Results Message */}
                {filteredRecipes.length === 0 && (
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || selectedTags.length > 0 || selectedCategory !== 'all'
                                    ? "Try adjusting your search criteria or clearing some filters."
                                    : "Add a new recipe to get started!"
                                }
                            </p>
                            {(searchTerm || selectedTags.length > 0 || selectedCategory !== 'all') && (
                                <button
                                    onClick={clearAllFilters}
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={newRecipe.tags}
                                        onChange={(e) => setNewRecipe({ ...newRecipe, tags: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="italian, pasta, quick, healthy"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Add tags to help others find your recipe</p>
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
                                            onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value as RecipeCategory })}
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
                                            onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value as RecipeDifficulty })}
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

export default AdvancedRecipeSearchApp;