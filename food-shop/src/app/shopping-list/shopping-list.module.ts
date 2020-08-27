import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
];

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class ShoppingListModule { }
