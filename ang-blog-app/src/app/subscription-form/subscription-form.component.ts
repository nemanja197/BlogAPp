import { Component, OnInit } from '@angular/core';
import { Sub } from '../_interface/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit{
  isEmailError:boolean=false;
  isSubscribe:boolean=false;
  constructor(private subscribeService:SubscribersService){}
  ngOnInit(): void {
  }


  onSubmit(formVal:Sub){
    
    const subData={
      name:formVal.name,
      email:formVal.email
    }
    //this.subscribeService.addSubs(formVal);
    
    this.subscribeService.checkSubs(subData.email).subscribe(val=>{
      if(val.empty){
        this.subscribeService.addSubs(formVal);
        this.isSubscribe=true;
    
      }
      else{
        this.isEmailError=true;
      }
    })
  }
}
