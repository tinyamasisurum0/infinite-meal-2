
import { Ingredient, CookingMethod } from './types';

export const INITIAL_INGREDIENTS: Ingredient[] = [
  { id: 'tomato', name: 'Tomato', emoji: '🍅', description: 'Plump and juicy red fruit.' },
  { id: 'onion', name: 'Onion', emoji: '🧅', description: 'Strong-smelling layered bulb.' },
  { id: 'cucumber', name: 'Cucumber', emoji: '🥒', description: 'Cool and crisp green vegetable.' },
  { id: 'lettuce', name: 'Lettuce', emoji: '🥬', description: 'Fresh, crunchy leaves.' },
  { id: 'egg', name: 'Egg', emoji: '🥚', description: 'A versatile protein source.' },
  { id: 'cheese', name: 'Cheese', emoji: '🧀', description: 'Rich, fermented dairy.' },
  { id: 'flour', name: 'Flour', emoji: '🌾', description: 'Finely ground grain.' },
  { id: 'water', name: 'Water', emoji: '💧', description: 'Pure, clear H2O.' },
  { id: 'meat', name: 'Meat', emoji: '🥩', description: 'Savory animal protein.' },
  { id: 'potato', name: 'Potato', emoji: '🥔', description: 'A starchy root vegetable.' },
  { id: 'salt', name: 'Salt', emoji: '🧂', description: 'The fundamental seasoning.' },
  { id: 'fruit', name: 'Fruit', emoji: '🍎', description: 'Sweet or tart botanical fruit.' },
  { id: 'rice', name: 'Rice', emoji: '🍚', description: 'Essential staple grain.' },
  { id: 'milk', name: 'Milk', emoji: '🥛', description: 'Creamy dairy liquid.' },
  { id: 'butter', name: 'Butter', emoji: '🧈', description: 'Churned cream fat.' },
  { id: 'sugar', name: 'Sugar', emoji: '🍬', description: 'Sweet crystalline goodness.' },
  { id: 'chicken', name: 'Chicken', emoji: '🍗', description: 'Versatile poultry meat.' },
  { id: 'fish', name: 'Fish', emoji: '🐟', description: 'Fresh from the waters.' },
  { id: 'herbs', name: 'Herbs', emoji: '🌿', description: 'Fragrant culinary leaves.' },
  { id: 'spices', name: 'Spices', emoji: '🌶️', description: 'Pungent or aromatic seasonings.' },
  { id: 'chocolate', name: 'Chocolate', emoji: '🍫', description: 'Rich cacao treat.' },
  { id: 'cream', name: 'Cream', emoji: '🥄', description: 'Thick dairy fat.' },
  { id: 'yogurt', name: 'Yogurt', emoji: '🥛', description: 'Tangy fermented milk.' },
  { id: 'lemon', name: 'Lemon', emoji: '🍋', description: 'Zesty citrus fruit.' },
  { id: 'ice', name: 'Ice', emoji: '🧊', description: 'Solidified water.' },
  { id: 'oil', name: 'Oil', emoji: '🫙', description: 'Liquid fat for cooking.' },
];

export const MAX_MIX_ITEMS = 2;

export const COOKING_METHODS_DATA = [
  { id: CookingMethod.CHOP, name: 'Chop', icon: 'fa-solid fa-knife-kitchen', color: 'text-slate-400' },
  { id: CookingMethod.BLEND, name: 'Blend', icon: 'fa-solid fa-blender', color: 'text-pink-400' },
  { id: CookingMethod.BOIL, name: 'Boil', icon: 'fa-solid fa-temperature-arrow-up', color: 'text-blue-400' },
  { id: CookingMethod.FRY, name: 'Fry', icon: 'fa-solid fa-fire-burner', color: 'text-orange-500' },
  { id: CookingMethod.BAKE, name: 'Bake', icon: 'fa-solid fa-bread-slice', color: 'text-amber-600' },
  { id: CookingMethod.GRIDDLE, name: 'Griddle', icon: 'fa-solid fa-window-minimize', color: 'text-yellow-500' },
  { id: CookingMethod.MIX, name: 'Mix', icon: 'fa-solid fa-spoon', color: 'text-teal-400' },
];

export const BASE_RECIPES = [
  // Transformations (Single Ingredient)
  { ingredients: ['potato'], method: CookingMethod.BOIL, result: { name: 'Boiled Potato', emoji: '🥔', description: 'Softened and ready for mashing.' } },
  { ingredients: ['egg'], method: CookingMethod.BOIL, result: { name: 'Boiled Egg', emoji: '🥚', description: 'Hardened and nutritious.' } },
  { ingredients: ['egg'], method: CookingMethod.FRY, result: { name: 'Fried Egg', emoji: '🍳', description: 'Crispy edges and a runny yolk.' } },
  { ingredients: ['potato'], method: CookingMethod.FRY, result: { name: 'French Fries', emoji: '🍟', description: 'Golden, crispy, and salty.' } },
  { ingredients: ['tomato'], method: CookingMethod.BLEND, result: { name: 'Tomato Puree', emoji: '🥫', description: 'Smooth, concentrated tomato base.' } },
  { ingredients: ['tomato'], method: CookingMethod.CHOP, result: { name: 'Diced Tomato', emoji: '🍅', description: 'Perfectly cubed for salads.' } },
  { ingredients: ['onion'], method: CookingMethod.CHOP, result: { name: 'Diced Onion', emoji: '🧅', description: 'The start of every great dish.' } },
  { ingredients: ['cucumber'], method: CookingMethod.BOIL, result: { name: 'Pickled Cucumber', emoji: '🥒', description: 'Tangy and preserved.' } },
  { ingredients: ['cucumber'], method: CookingMethod.CHOP, result: { name: 'Diced Cucumber', emoji: '🥒', description: 'Small cubes of fresh cucumber.' } },
  { ingredients: ['lettuce'], method: CookingMethod.CHOP, result: { name: 'Shredded Lettuce', emoji: '🥬', description: 'Perfectly sliced for wraps.' } },
  { ingredients: ['fruit'], method: CookingMethod.BLEND, result: { name: 'Fruit Smoothie', emoji: '🥤', description: 'A refreshing blended fruit drink.' } },

  // Combinations
  { ingredients: ['flour', 'water'], method: CookingMethod.MIX, result: { name: 'Dough', emoji: '🥟', description: 'Elastic and ready for shaping.' } },
  { ingredients: ['flour', 'egg'], method: CookingMethod.MIX, result: { name: 'Raw Pasta', emoji: '📏', description: 'Freshly kneaded pasta strands.' } },
  { ingredients: ['tomato', 'onion'], method: CookingMethod.MIX, result: { name: 'Tomato Sauce', emoji: '🥫', description: 'A savory red base.' } },
  { ingredients: ['diced_tomato', 'diced_onion'], method: CookingMethod.MIX, result: { name: 'Salad', emoji: '🥗', description: 'Mix diced vegetables for a simple salad.' } },
  { ingredients: ['cucumber', 'tomato'], method: CookingMethod.MIX, result: { name: 'Salad', emoji: '🥗', description: 'Slice cucumber and tomato for a refreshing salad.' } },
  { ingredients: ['bread', 'cucumber'], method: CookingMethod.MIX, result: { name: 'Cucumber Sandwich', emoji: '🥪', description: 'A light and refreshing snack.' } },
  { ingredients: ['flour', 'milk'], method: CookingMethod.MIX, result: { name: 'Pancakes', emoji: '🥞', description: 'Mix and cook for fluffy pancakes.' } },
  { ingredients: ['water', 'lemon'], method: CookingMethod.MIX, result: { name: 'Lemonade', emoji: '🍋', description: 'Sweet and sour refreshment.' } },
  { ingredients: ['milk', 'chocolate'], method: CookingMethod.MIX, result: { name: 'Hot Chocolate', emoji: '☕', description: 'Warm and comforting.' } },
  { ingredients: ['dough', 'tomato_sauce'], method: CookingMethod.MIX, result: { name: 'Pizza Base', emoji: '🫓', description: 'The foundation of a masterpiece.' } },
  { ingredients: ['pizza_base', 'cheese'], method: CookingMethod.BAKE, result: { name: 'Pizza', emoji: '🍕', description: 'The ultimate comfort food.' } },
  { ingredients: ['bread', 'cheese'], method: CookingMethod.MIX, result: { name: 'Sandwich', emoji: '🥪', description: 'Classic cheese between bread.' } },
  { ingredients: ['rice', 'egg'], method: CookingMethod.FRY, result: { name: 'Fried Rice', emoji: '🍚', description: 'Stir-fried rice with savory egg.' } },
  { ingredients: ['tortilla', 'meat'], method: CookingMethod.MIX, result: { name: 'Taco', emoji: '🌮', description: 'A flavorful handheld treat.' } },
  { ingredients: ['chocolate', 'cream'], method: CookingMethod.MIX, result: { name: 'Chocolate Fondue', emoji: '🍫', description: 'Rich, melted chocolate dip.' } },
];
