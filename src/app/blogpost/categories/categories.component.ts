import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Category } from '../../models/category';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

    categories: Category;

    constructor(private blogpostService: BlogpostService) { }

    ngOnInit() {
        this.blogpostService.getCategories().subscribe(
            (data: Category) => this.categories = data
        );
    }

}
