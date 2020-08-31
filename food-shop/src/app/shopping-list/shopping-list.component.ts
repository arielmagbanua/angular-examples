import {
  Component, OnDestroy,
  OnInit
} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  // private idChangedSub: Subscription;

  constructor(
    private slService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.slService.ingredientList;
    // this.idChangedSub = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
    //   console.log('ingredientsChanged');
    //   this.ingredients = ingredients;
    // });
  }

  onEditItem(index: number): void {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    // this.idChangedSub.unsubscribe();
  }
}
