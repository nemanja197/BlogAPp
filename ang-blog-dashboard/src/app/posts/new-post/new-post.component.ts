import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/_Interface/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  imgSrc: any =
    'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg  ';
  permalink: string = '';
  selectedImgage: any;
  categories: any[] = [];
  postForm!: FormGroup;
  bolean: boolean = true;
  post!: any;
  formStatus = 'Add New';
  docId!: any;
  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private angularStorage: PostService,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.route.queryParamMap.subscribe((queryParamMap: ParamMap) => {
      console.log(queryParamMap);
      const id = queryParamMap.get('id'); // Pristupamo ID-u koristeći get metodu
      this.docId = id;
      if (id) {
        this.angularStorage.loadOneData(id).subscribe((post) => {
          this.post = post;
          this.postForm = fb.group({
            title: [
              this.post.title,
              [Validators.required, Validators.minLength(10)],
            ],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [
              this.post.excerpt,
              [Validators.required, Validators.minLength(50)],
            ],
            category: [
              `${this.post.category.categoryId}-${this.post.category.category}`,
              Validators.required,
            ],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required],
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        });
      }
    });
  }
  ngOnInit() {
    this.categoryService.getDate().subscribe((val) => {
      this.categories = val;
    });
  }
  get fc() {
    return this.postForm.controls;
  }
  onTitleChanged(event: any) {
    const title = event.target.value;
    const permalinkControl = this.postForm.get('permalink');

    if (permalinkControl) {
      permalinkControl.setValue(title.replace(/\s/g, '-'));
    }
  }
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImgage = $event.target.files[0];
  }
  onSubmit() {
    let spilted = this.postForm.value.category.split('-');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value?.permalink,
      category: {
        categoryId: spilted[0],
        category: spilted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    console.log(postData);
    this.angularStorage.uploadImg(
      this.selectedImgage,
      postData,
      this.formStatus,
      this.docId
    );
    this.postForm.reset();
    this.imgSrc =
      'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg  ';
  }
}
