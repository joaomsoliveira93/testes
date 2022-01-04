import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product= new Product();
  id:number=-1;

  loggedUser = {
    id: -1,
    username: "",
    name: "",
    email: "",
    userType: ""
  };

  constructor(private router:Router, private route: ActivatedRoute, private userService:UserService, private productsService:ProductsService) { 
    this.route.params.subscribe(params => {
      this.id = +params['id']
    });

    if (this.userService.loggedUser.id != -1 && this.userService.loggedUser.userType=="admin") {
      this.loggedUser.id = this.userService.loggedUser.id!;
      this.loggedUser.username = this.userService.loggedUser.username;
      this.loggedUser.name = (this.userService.loggedUser.name).toString();
      this.loggedUser.email = this.userService.loggedUser.email;
      this.loggedUser.userType = this.userService.loggedUser.userType;

      this.productsService.getProduct(this.id).subscribe(product =>{this.product = product})
    }else{
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {}

  deleteProduct(){
    if(confirm('Tem a certeza que pretende eliminar este produto?')){
      this.productsService.deleteProduct(this.product).subscribe();
      this.router.navigate(['/productslist']);
    }    
  }



}
