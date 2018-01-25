import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  productList:any[]
  productTotal = 0
  obj = <any>{};
  category
  productCategory = ["All Category", "Drama", "Adventure", "Mystery", "Travel"].sort()

  //for cart
  cartProducts: any;

  constructor(private http: Http, private actroute: ActivatedRoute, private route:Router) { 
    this.actroute.queryParams.subscribe(params => {
      this.category = params['category'];
      console.log(this.category); // Print the parameter to the console. 
  });
  }

  ngOnInit() {
    this.actroute.params.subscribe(params => {
      this.loadProductDetail(params['id'])
    })

  }

  loadProductDetail(id) {

    this.http.get("http://localhost:3000/api/product/"+id)
      .subscribe(
      result => {
        this.obj = result.json();
        console.log(this.obj)
      },
      error => {
        console.log("error")
      }
      )
  }

  // addToCart(id){
    
  //   localStorage.setItem("dataCart", id)
  //   this.route.navigate(['/cart']);
  // }

  addToCart() {

    let product = this.obj
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
