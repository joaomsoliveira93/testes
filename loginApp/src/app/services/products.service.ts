import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from "../models/Product";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  productsUrl: string = "http://localhost:5000/products";

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + "/" + id);
  }

  editProduct(user:Product):Observable<any>{
    const url = this.productsUrl + "/" + user.id;
    return this.http.put(url,user,httpOptions);
  }

  deleteProduct(product:Product):Observable<any>{
    return this.http.delete<Product>(this.productsUrl+"/"+product.id,httpOptions);
  }

  addProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions);
  }

}
