import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoryService } from '../../services/category.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.sass']
})
export class CategoryFormComponent implements OnInit {

    pageTitle: string;
    error: string;
    uploadError: string;

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title
    ) { }

    categoryForm: FormGroup;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.pageTitle = 'Kategorie bearbeiten';
            this.categoryService.getCategory(+id).subscribe(
                res => {
                    this.categoryForm.patchValue({
                        category_name: res.category_name,
                        id: res.id
                    });
                }
            );
        } else {
            this.pageTitle = 'Kategorie erstellen';
        }

        this.categoryForm = this.fb.group({
            id: [''],
            category_name: ['', Validators.required]
        });

        this.titleService.setTitle(this.pageTitle + ' | ' + 'RICMS')
    }

    get category_name() { return this.categoryForm.get('category_name'); }

    onSubmit() {
        const formData = new FormData();
        formData.append('category_name', this.categoryForm.get('category_name').value);
        
        const id = this.categoryForm.get('id').value;

        if (id) {
            this.categoryService.updateCategory(formData, +id).subscribe(
                res => {
                    if (res.status === 'error') {
                        this.uploadError = res.message;
                    } else {
                        this.router.navigate(['/admin/categories']);
                    }
                },
                error => this.error = error
            );
        } else {
            this.categoryService.createCategory(formData).subscribe(
                res => {
                    if (res.status === 'error') {
                        this.uploadError = res.message;
                    } else {
                        this.router.navigate(['/admin/categories']);
                    }
                },
                error => this.error = error
            );
        }
    }

}
