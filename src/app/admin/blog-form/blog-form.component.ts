import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-blog-form',
    templateUrl: './blog-form.component.html',
    styleUrls: ['./blog-form.component.sass']
})
export class BlogFormComponent implements OnInit {

    pageTitle: string;
    error: string;
    uploadError: string;
    imagePath: string;

    blogForm: FormGroup;

    public Editor = ClassicEditor;
    public editorConfig = {
        toolbar: {
            items: [
                'source',
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'imageUpload',
                'blockQuote',
                'undo',
                'redo'
            ]
        },
        image: {
            toolbar: [
                'imageStyle:full',
                'imageStyle:side',
                '|',
                'imageTextAlternative'
            ]
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading 2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading 3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading 4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading 5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading 6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
        }
    };

    constructor(
        private fb: FormBuilder,
        private blogService: BlogService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.pageTitle = 'Blog bearbeiten';
            this.blogService.getBlog(+id).subscribe(
                res => {
                    this.blogForm.patchValue({
                        title: res.title,
                        description: res.description,
                        is_featured: res.is_featured,
                        is_active: res.is_active,
                        id: res.id,
                        image_alt: res.image_alt
                    });
                    this.imagePath = res.image;
                }
            );
        } else {
            this.pageTitle = 'Blog erstellen';
        }

        this.blogForm = this.fb.group({
            id: [''],
            title: ['', Validators.required],
            description: ['', Validators.required],
            is_featured: ['0'],
            is_active: ['1'],
            image: [''],
            image_alt: ['']
        });

        this.titleService.setTitle(this.pageTitle + ' | ' + 'RICMS');
    }

    onSelectedFile(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.blogForm.get('image').setValue(file);
        }
    }

    get title() { return this.blogForm.get('title'); }
    get description() { return this.blogForm.get('description'); }
    get image_alt() { return this.blogForm.get('image_alt'); }

    onSubmit() {
        const formData = new FormData();
        formData.append('title', this.blogForm.get('title').value);
        formData.append('description', this.blogForm.get('description').value);
        formData.append('is_featured', this.blogForm.get('is_featured').value);
        formData.append('is_active', this.blogForm.get('is_active').value);
        formData.append('image', this.blogForm.get('image').value);
        formData.append('image_alt', this.blogForm.get('image_alt').value);

        const id = this.blogForm.get('id').value;

        if (id) {
            this.blogService.updateBlog(formData, +id).subscribe(
                res => {
                    if (res.status === 'error') {
                        this.uploadError = res.message;
                    } else {
                        this.router.navigate(['/admin/blogs']);
                    }
                },
                error => this.error = error
            );
        } else {
            this.blogService.createBlog(formData).subscribe(
                res => {
                    if (res.status === 'error') {
                        this.uploadError = res.message;
                    } else {
                        this.router.navigate(['/admin/blogs']);
                    }
                },
                error => this.error = error
            );
        }
    }
}
