import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{
  postData:any;
  similarPostArray:object[]=[];
  constructor(private postService:PostsService,private router:ActivatedRoute){}
  ngOnInit(): void {
    this.router.params.subscribe(val=>{
      this.postService.countView(val['id']);
      this.postService.loadOnePost(val['id']).subscribe(val=>{
        this.postData=val;
        this.loadSimularPost(this.postData.category.categoryId);
      })
    })
  }
  loadSimularPost(categoryId:string){
    this.postService.loadSimilar(categoryId).subscribe(val=>{
      this.similarPostArray=val;
    });
  }
}
