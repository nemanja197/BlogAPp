import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../_Interface/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryId!: string;
  category: any[] = [];
  formCategory!: string;
  formStatus: string = 'Add';
  constructor(
    private afs: Firestore,
    public categoriesService: CategoriesService
  ) {}
  ngOnInit(): void {
    this.getDate();
  }

  getDate() {
    this.categoriesService.getDate().subscribe((response) => {
      this.category = response;
    });
  }

  onSubmit(formData: any) {

    let categoryData: Category = {
      category: formData.value.category,
    };
    if (this.formStatus == 'Add') {
      this.categoriesService.saveDate(categoryData)
        this.getDate();
      ;
      formData.reset();
    }
    
    
    else if (this.formStatus == 'Edit') {
      this.categoriesService
        .updateData(this.categoryId, categoryData)
        .subscribe(() => {
          this.getDate();
          this.formStatus = 'Add';
          formData.reset();
        });
    }
  }
  onEdit(category: any, id: string) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }
  onDelete(id:string){
  this.categoriesService.deleteData(id).subscribe(()=>{
    this.getDate();
  });
  }
  
}

/* let subCategoryData = {
      subCategory: 'subCategory1',
    };

    const collectionInstance = collection(this.afs, 'categories');

    addDoc(collectionInstance, categoryData)
      .then((docRef) => {
        console.log('Category added successfully with ID:', docRef.id);

        const newCategoryRef = doc(collectionInstance, docRef.id);

        const subCollectionInstance = collection(
          newCategoryRef,
          'subcategories'
        );
        addDoc(subCollectionInstance, subCategoryData)
          .then(() => {
            console.log('Subcategory saved successfully');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }*/
