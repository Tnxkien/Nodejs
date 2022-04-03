import { Component, OnInit } from '@angular/core';

// Để lấy được giá trị trên param thì phải gọi ActivatedRoute, ParamMap
import { ActivatedRoute, ParamMap } from '@angular/router';

// Gọi service
import { AppService } from '../app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: AppService) { }

  value_params:any = '';
  product_name:any;
  product_price:any;
  product_content:any;
  product_list=[];

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap)=>{
      // slug
      this.value_params = params.get('id');

      this.service.get_product_data_from_slug(this.value_params)
      .subscribe((kq:any)=>{
        this.product_name = kq['msg'][0].name;
        this.product_price = kq['msg'][0].price;
        this.product_content = kq['msg'][0].content;
      })
    })
  }

}
