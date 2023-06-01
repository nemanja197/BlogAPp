import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latesPostArray:any[]=[];
  featuredPostArray:any[]=[];
  constructor(private postService:PostsService){
    this.postService.loadFeatured().subscribe(val=>{
      this.featuredPostArray=val;
    })
    this.postService.loadLates().subscribe(val=>{
      this.latesPostArray=val;
    })
  }
  
  ngOnInit(): void {
  }


}
