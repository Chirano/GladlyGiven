import { Component } from '@angular/core';
import { Category } from 'src/app/classes/Category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent {

  category: Category = {
    id    :0,
    description  :""
  };

  categories: Category[]=[];

constructor(
  private categoryService : CategoryService){}

  registerNewCategory(id: number, description: string) : void {
    this.categoryService.registerNewCategory({
      id,
      description,
    } as Category)
    .subscribe({
      next: (registerNewCategory) => {
        console.log('Register created:', registerNewCategory);
        this.category = registerNewCategory;
      },
      error: (error) => {
        console.error('Failed to create Service Request', error);
        // Optionally, show an error message to the user
      }
    });
  }

}
