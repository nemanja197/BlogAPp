import { Component ,OnInit } from '@angular/core';
import { Post } from 'src/app/_Interface/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  postArray:any[]=[];
  constructor(private postService:PostService){}
  ngOnInit(): void {
  this.getData();

  }
  getData(){
    this.postService.getDate().subscribe(val=>{
      console.log(val);
      this.postArray=val;
    });
  }
  onDelete(postImg:string,id:string){
    this.postService.deleteImage(postImg,id).subscribe(()=>{
      this.getData();
    });
   
  }

  onFetured(id:string,value:any){
   const featuredData={
    isFeatured:value
   }
   this.postService.markFeatured(id,value).subscribe();
   this.getData();

  }
}
