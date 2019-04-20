import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-blogpost-home',
    templateUrl: './blogpost-home.component.html',
    styleUrls: ['./blogpost-home.component.sass']
})
export class BlogpostHomeComponent implements OnInit {

    blogs: Blogpost;
    error: {};

    constructor(
        private blogpostService: BlogpostService,
        private titleService: Title
    ) { }

    ngOnInit() {
        this.blogpostService.getFeaturedBlogs().subscribe(
            (data: Blogpost) => this.blogs = data,
            error => this.error = error
        );
    }

    setPageTitle(title: string) {
        this.titleService.setTitle(title);
    }

}
