import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
  }

  storeRecipes(): void {
    const recipes = this.recipeService.recipeList;
    this.http.put(
      'https://udemy-training-af9d1.firebaseio.com/recipes.json',
      recipes
    ).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes(): Observable<{ imagePath: string; name: string; description: string; ingredients: Ingredient[] }[]> {
    return this.http.get<Recipe[]>(
      'https://udemy-training-af9d1.firebaseio.com/recipes.json',
    ).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
