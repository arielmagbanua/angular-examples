import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ReversePipe } from './reverse.pipe';
import { SortServersPipe } from './sort-servers.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    SortServersPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
