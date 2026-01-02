
export enum CookingMethod {
  CHOP = 'CHOP',
  BLEND = 'BLEND',
  BOIL = 'BOIL',
  FRY = 'FRY',
  BAKE = 'BAKE',
  GRIDDLE = 'GRIDDLE',
  MIX = 'MIX'
}

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  description: string;
  discoveredAt?: number;
  sourceUrl?: string;
  sourceTitle?: string;
  isCustom?: boolean; // Flag for user-created recipes
}

export interface CustomRecipe {
  ingredients: string[]; // IDs of ingredients
  method: CookingMethod;
  result: Ingredient;
}

export interface RecipeDiscovery {
  ingredients: string[];
  method: CookingMethod;
  result: Ingredient;
  isNewDiscovery: boolean;
  isCustom?: boolean;
}

export interface GameState {
  discoveredIngredients: Ingredient[];
  history: RecipeDiscovery[];
  currentMixing: string[];
  customRecipes: CustomRecipe[];
}

export enum GameStatus {
  IDLE = 'IDLE',
  MIXING = 'MIXING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}
