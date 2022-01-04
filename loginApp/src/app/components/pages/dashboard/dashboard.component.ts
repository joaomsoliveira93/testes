import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ProductsService } from '../../../services/products.service';
import {Product} from '../../../models/Product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Product[]=[];

  loggedUser = {
    id: -1,
    username: "",
    name: "",
    email: "",
    userType: ""
  };

  constructor(private userService: UserService,private productsService:ProductsService, private router: Router) { 
    if (this.userService.loggedUser.id != -1) {
      this.loggedUser.id = this.userService.loggedUser.id!;
      this.loggedUser.username = this.userService.loggedUser.username;
      this.loggedUser.name = (this.userService.loggedUser.name).toString();
      this.loggedUser.email = this.userService.loggedUser.email;
      this.loggedUser.userType = this.userService.loggedUser.userType;

      this.productsService.getTodos().subscribe(products =>{
        this.products = products;
      })
    }else{
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {}

}
