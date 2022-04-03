import { Injectable } from '@angular/core';

// Gọi thư viện để tương tác với nodejs
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/api/';

  get_category_list(){
    return this.http.get( this.url + 'category/list' );
  }

  get_product_list(){
    return this.http.get( this.url + 'product/list' );
  }

  get_product_data_from_slug(slug:any){
    return this.http.get( this.url + 'product/data/' + slug );
  }

  get_sidebar(){
    return this.http.get( this.url + 'category/sidebar' );
  }

  get_category_info(slug:any){
    return this.http.get( this.url + 'category/info/' + slug );
  }

  get_product_list_from_idCategory(id_category:any){
    return this.http.get( this.url + 'category/productList/' + id_category );
  }
}
