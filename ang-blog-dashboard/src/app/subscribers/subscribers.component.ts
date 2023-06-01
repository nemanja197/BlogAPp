import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  subscribers:any[]=[];
  constructor(private subscribersService:SubscribersService){ }
  ngOnInit():void {
  this.getData();
  }
  getData(){
    this.subscribersService.getDate().subscribe(val=>{
      this.subscribers=val;
    })
  }

  onDelete(id:string){
    this.subscribersService.deleteData(id);
this.getData();  }
}
