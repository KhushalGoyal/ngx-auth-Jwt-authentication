import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.sass']
})
export class PagesComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }
  
  callApi(){
    let url = 'http://localhost:8000/home'
    this.commonService.get(url).subscribe(ele => {
      console.log(ele)
    })
  }
}
