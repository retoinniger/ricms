import { Component, OnInit } from '@angular/core';

import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-manage-categories',
    templateUrl: './manage-categories.component.html',
    styleUrls: ['./manage-categories.component.sass']
})
export class ManageCategoriesComponent implements OnInit {

    title = 'Kategorien verwalten';
    categories: Category;
    error: string;

    constructor(private categoryService: CategoryService, private titleService: Title) { }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(
            (data: Category) => this.categories = data,
            error => this.error = error
        );

        this.titleService.setTitle(this.title + ' | ' + 'RICMS')
    }

    onDelete(id: number) {
        if (confirm('Are you sure want to delete id = ' + id)) {
            this.categoryService.deleteCategory(+id).subscribe(
                res => {
                    console.log(res);
                    this.ngOnInit();
                },
                error => this.error = error
            );
        }
    }

}
