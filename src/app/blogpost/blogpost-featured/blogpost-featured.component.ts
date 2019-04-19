import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-blogpost-featured',
    templateUrl: './blogpost-featured.component.html',
    styleUrls: ['./blogpost-featured.component.sass']
})
export class BlogpostFeaturedComponent implements OnInit {

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
