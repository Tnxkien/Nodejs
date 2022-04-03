import { Component, OnInit } from '@angular/core';

// Gọi service
import { AppService } from '../app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private service: AppService) { }

  sidebar:any;

  ngOnInit(): void {
    this.service.get_sidebar()
    .subscribe((kq:any)=>{
      this.sidebar = kq['msg']
    })
  }

}
