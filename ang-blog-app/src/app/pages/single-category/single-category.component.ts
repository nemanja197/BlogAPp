import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit{
  categoryObj!:any;
  postArray:any[]=[]
  constructor(private router:ActivatedRoute, private postService:PostsService){}
  ngOnInit(): void {
    this.router.params.subscribe(val=>{
      this.categoryObj=val;
      this.postService.loadCategoryPosts(val['id']).subscribe(post=>{
        this.postArray=post;
      });
    })

  }

}

