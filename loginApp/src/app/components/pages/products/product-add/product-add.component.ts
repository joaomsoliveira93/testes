import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product: Product = new Product();
  id: number = -1;

  loggedUser = {
    id: -1,
    username: "",
    name: "",
    email: "",
    userType: ""
  };

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService,private productService:ProductsService) {
    this.route.params.subscribe(params => {
      this.id = +params['id']
    });

    if (this.userService.loggedUser.id != -1 && this.userService.loggedUser.userType=="admin") {
      this.loggedUser.id = this.userService.loggedUser.id!;
      this.loggedUser.username = this.userService.loggedUser.username;
      this.loggedUser.name = (this.userService.loggedUser.name).toString();
      this.loggedUser.email = this.userService.loggedUser.email;
      this.loggedUser.userType = this.userService.loggedUser.userType;

    } else {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {

  }

  saveProduct() {
    if (confirm('Tem a certeza que pretende guardar')) {
      let toSave: Product = new Product();

      toSave.id = this.id;
      toSave.name = this.product.name;
      toSave.manufacture = this.product.manufacture;
      toSave.description = this.product.description;
      toSave.boxQuantity = this.product.boxQuantity;
      toSave.unity=this.product.unity;
      toSave.price=this.product.price;
      toSave.stock=this.product.stock;

      this.productService.addProduct(toSave).subscribe();
    }

    this.router.navigate(['/productslist']);
  }

  discardProduct(){
    if (confirm('Tem a certeza que pretende cancelar? Todas as alterações serão descartadas!')) {
      this.router.navigate(['/productslist']);
    }
  }
}
