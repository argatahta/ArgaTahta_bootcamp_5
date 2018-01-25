import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {


  productList:any[]
  productCategory = ["All Category", "Drama", "Adventure", "Mystery", "Travel"].sort()
  productTotal = 0
  category
  cartProducts:any

  constructor(private http: Http, private route: Router, private actroute: ActivatedRoute) { 
    this.actroute.queryParams.subscribe(params => {
      this.category = params['category'];
      console.log(this.category); // Print the parameter to the console. 
      this.onChangeParam()
  });
  }

  ngOnInit() {
    this.loadProductList()  

  }

  loadProductList() {

    if(this.category != undefined){
      this.onChangeParam()
    }else{
      this.http.get("http://localhost:3000/api/product")
      .subscribe(
      result => {
        this.productList = result.json();
        this.productTotal= result.json().length
        console.log(this.productList);
      },
      error => {
        console.log("Get Productlist error");
      }
      )
    }
    
  };

  onChangeParam(){

    if(this.category == undefined){
      this.loadProductList()
    }else{
      this.http.get("http://localhost:3000/api/product?category="+this.category)
      .subscribe(
      result => {
        this.productList = result.json();
        this.productTotal= result.json().length
        console.log(this.productList);
      },
      error => {
        console.log("Get productList error");
      }
      )
    }
  }

  addToCart(index) {

    let product = this.productList[index]
    let cartData = []
    let data = localStorage.getItem("cart")
    console.log(data)
    if (data != null) {
      cartData = JSON.parse(data);
      
    }
    console.log(cartData)
    cartData.push(product);
    this.updateCartData(cartData)

    localStorage.setItem("cart", JSON.stringify(cartData))
    this.route.navigate(['/cart']);
  }

  updateCartData(cartData){
    this.cartProducts = cartData
  }

}
