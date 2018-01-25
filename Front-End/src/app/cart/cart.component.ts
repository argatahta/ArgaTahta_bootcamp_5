import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: any[]
  bill:any
  visible = false

  constructor(private http: Http) { }

  

  ngOnInit() {
    this.loadCartList()
  }

  loadCartList(){
    let  data = localStorage.getItem('cart');
    if(data!=null){
      this.cartProducts = JSON.parse(data);
      this.bill = 0;
      console.log(this.cartProducts)
      for(let i in this.cartProducts){
        this.cartProducts[i]["qt"] = 1;
        this.bill = this.bill + this.cartProducts[i].price * this.cartProducts[i].qt;
      }
    }else{
      this.cartProducts = []
      this.visible = true
    }
  }

  removeItem(id) {
    this.cartProducts.splice(id, 1);
    if(this.cartProducts.length){
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    } else { 
      localStorage.setItem('cart', null);
    }
  }

  updateTotal() {
    this.bill = 0;
    for(let i in this.cartProducts){
      this.bill = this.bill + this.cartProducts[i].price * this.cartProducts[i].qt;
    }
  }

  checkout() {
    localStorage.removeItem("cart")
    this.loadCartList()
  }

}
