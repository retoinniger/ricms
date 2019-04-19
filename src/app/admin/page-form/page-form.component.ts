import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { PageService } from '../../services/page.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-page-form',
    templateUrl: './page-form.component.html',
    styleUrls: ['./page-form.component.sass']
})
export class PageFormComponent implements OnInit {

    public Editor = ClassicEditor;
    public editorConfig = {
        
        toolbar: [
          'heading', '|', 'bulletedList', 'numberedList', 'link', 'blockQuote', '|', 'undo', 'redo'
        ],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
        }
    };

    pageTitle: string;
    error: string;
    uploadError: string;

    constructor(
        private fb: FormBuilder,
        private pageService: PageService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title
    ) { }

    pageForm: FormGroup;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.pageTitle = 'Seite erstellen';
            this.pageService.getPage(+id).subscribe(
                res => {
                    this.pageForm.patchValue({
                        title: res.title,
                        description: res.description,
                        slug: res.slug,
                        is_active: res.is_active,
                        id: res.id
                    });
                }
            );
        } else {
            this.pageTitle = 'Seite erstellen';
        }

        this.pageForm = this.fb.group({
            id: [''],
            title: ['', Validators.required],
            description: ['', Validators.required],
            slug: ['', Validators.required],
            is_active: ['1']
        });

        this.titleService.setTitle(this.pageTitle + ' | ' + 'RICMS');
    }

    get title() { return this.pageForm.get('title'); }
    get description() { return this.pageForm.get('description'); }
    get slug() { return this.pageForm.get('slug'); }
    get is_active() { return this.pageForm.get('is_active'); }

    onSubmit() {
        const formData = new FormData();
        formData.append('title', this.pageForm.get('title').value);
        formData.append('description', this.pageForm.get('description').value);
        formData.append('slug', this.pageForm.get('slug').value);
        formData.append('is_active', this.pageForm.get('is_active').value);
        
        console.log(formData);
        const id = this.pageForm.get('id').value;

        if (id) {
            this.pageService.updatePage(formData, +id).subscribe(
                res => {
                    if (res.status === 'error') {
                        this.uploadError = res.message;
                    } else {
                        this.router.navigate(['/admin/pages']);
                    }
                },
                error => this.error = error
            );
        } else {
            this.pageService.createPage(formData).subscribe(
                res => {
                    if (res.status === 'error') {
                        this.uploadError = res.message;
                    } else {
                        this.router.navigate(['/admin/pages']);
                    }
                },
                error => this.error = error
            );
        }
    }

}
