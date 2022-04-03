import { Component, OnInit } from '@angular/core';

// Gọi service
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: AppService) { }

  title = 'hello';

  array = [1,2,3,4,5];

  black = 'black';

  // list product
  product_list:any;

  ngOnInit(): void {
    this.service
    .get_product_list()
    .subscribe((kq:any)=>{
      this.product_list = kq['msg']
    })
  }

}
