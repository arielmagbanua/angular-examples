import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
    CommonModule
  ]
})
export class SharedModule { }
