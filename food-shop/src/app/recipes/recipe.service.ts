import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Lumpia',
      'Filipino Lumpia',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6244851.jpg',
      [
        new Ingredient('Lumpia Wrapper', 2),
        new Ingredient('Bamboo Shoot', 2),
        new Ingredient('Pork', 3)
      ]
    ),
    new Recipe(
      'Burger',
      'Minute Burger',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Beef', 3)
      ]
    ),
  ];

  get recipeList(): Recipe[] {
    return this.recipes.slice();
  }

  constructor() { }
}
