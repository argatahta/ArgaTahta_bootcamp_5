import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductlistComponent,
    ProductdetailComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,HttpModule, FormsModule, RouterModule.forRoot([
      {path:"", component: ProductlistComponent},
      {path:"detail/:id", component: ProductdetailComponent},
      {path:"cart", component: CartComponent},
      //if path doesnt exist, redirect to home
      {path: '**', redirectTo: ''}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
