import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes(): void {
    const recipes = this.recipeService.recipeList;
    this.http.put(
      'https://udemy-training-af9d1.firebaseio.com/recipes.json',
      recipes
    ).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes(): void {
    this.http.get<Recipe[]>('https://udemy-training-af9d1.firebaseio.com/recipes.json')
      .subscribe((recipes) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}
