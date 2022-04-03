import { Component, OnInit } from '@angular/core';

// Để lấy được giá trị trên param thì phải gọi ActivatedRoute, ParamMap
import { ActivatedRoute, ParamMap } from '@angular/router';

// Gọi Service để sử dụng api
import { AppService } from '../app.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: AppService) { }

  value_params:any = '';
  id_category:any;
  product_list:any;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap)=>{
      // lấy ra slug
      this.value_params = params.get('id');
      // lấy thông tin của danh mục
      this.service.get_category_info(this.value_params)
      .subscribe((kq:any)=>{
        // lấy id danh mục
        this.id_category = kq['msg'][0]._id;
        // lấy danh sách sản phẩm
        this.service.get_product_list_from_idCategory(this.id_category)
        .subscribe((kq:any)=>{
          this.product_list=kq['msg']
        })
      })
    })
    // this.service.get_category_list().subscribe((kq:any)=>{
    //   console.log(kq);
    // })
  }

}
